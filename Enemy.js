import { newPos } from './helper.js'

class Enemy {
    constructor(scene, controls) {
        this.scene = scene
        this.controls = controls

        this.ref = null
        this.touch = false
        
        this.spawn()
    }

    spawn() {
        var head = new THREE.Mesh(
            new THREE.BoxGeometry(20, 30, 20), 
            new THREE.MeshStandardMaterial({
                color: 0x3B3B3B
            }))
        head.position.set(0, 10, 0)
        head.castShadow = true
        head.receiveShadow = true
        
        var model = new THREE.Group()
        var pos = newPos(200, 5)
        model.add(head)
        model.position.set(pos[0], 0, pos[1])
        model.userData.health = 5
        model.castShadow = true
        model.receiveShadow = true

        this.ref = model
        this.scene.add(model)
    }

    update(delta) {
        var dir2Player = this.controls
            .getObject().position.clone()
            .sub(this.ref.position)
        dir2Player.y = 0
        dir2Player.normalize()

        this.ref.position
            .add(dir2Player.multiplyScalar(20 * delta))
        this.ref.rotation
            .y = Math.atan2(dir2Player.x, dir2Player.z)

        var playerPos = this.controls.getObject().position.clone()
        playerPos.y -= 1
        var playerBB = new THREE.Box3()
            .setFromCenterAndSize(
                playerPos, new THREE.Vector3(1, 1, 1))

        var enemyBB = new THREE.Box3()
            .setFromObject(this.ref)
        if (enemyBB.intersectsBox(playerBB))
            this.touch = true
    }
}

export {
    Enemy
}