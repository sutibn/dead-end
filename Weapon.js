class Weapon {
    constructor(scene, camera, controls, ammo) {
        this.scene = scene
        this.camera = camera
        this.controls = controls

        this.ammo = ammo
        this.bullets = []

        this.score = 0

        this.create()
    }

    create() {
        var weapon = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 1),
            new THREE.MeshStandardMaterial({
                color: 0x222222
            }))
        weapon.position.set(0.5, -1, -1.5)
        weapon.castShadow = true
        weapon.receiveShadow = true
        this.camera.add(weapon)
    }

    shoot() {
        if (this.ammo > 0) {
            var bullet = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 5, 5),
                new THREE.MeshStandardMaterial({ color: 0x121212 })
            )

            bullet.position.copy(this.controls.getObject().position)
            bullet.position.y -= 1

            var direction = new THREE.Vector3()
            this.camera.getWorldDirection(direction)
            bullet.userData.velocity = direction.multiplyScalar(200)
            bullet.castShadow = true
            bullet.receiveShadow = true
            this.scene.add(bullet)
            this.bullets.push(bullet)
            this.ammo -= 1
        }
    }

    remove(arr, ele, idx) {
        this.scene.remove(ele)
        arr.splice(idx, 1)
    }

    update(delta, enemies) {
        for (var i = 0; i < this.bullets.length; i++) {
            var bullet = this.bullets[i]
            var bulletBB = new THREE.Box3().setFromObject(bullet)
            bullet.position.add(bullet
                .userData.velocity.clone()
                .multiplyScalar(delta))
    
            for (var j = 0; j < enemies.length; j++) {
                var enemy = enemies[j].ref
                var enemyBB = new THREE.Box3().setFromObject(enemy)
                if (bulletBB.intersectsBox(enemyBB)) {
                    this.remove(this.bullets, bullet, i)
                    enemy.userData.health -= 1
                    if (enemy.userData.health <= 0) {
                        this.score += 1
                        this.remove(enemies, enemy, j)
                    }
                }
            }
    
            if (bullet.position.length() > 1000)
                this.remove(this.bullets, bullet, i)
        }
    }
}

export { 
    Weapon
}