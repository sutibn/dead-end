import { newPos } from './helper.js'

class Item {
    constructor(scene, controls) {
        this.scene = scene
        this.controls = controls

        this.ref = null
        this.touch = false
        
        this.spawn()
    }

    spawn() {
        var model = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 2), 
            new THREE.MeshStandardMaterial({ color: 0xFF0000 }))
        var pos = newPos(100, 5)

        model.position.set(pos[0], 2, pos[1])
        model.castShadow = true
        model.receiveShadow = true
    
        this.ref = model
        this.scene.add(model)
    }  

    update() {
        var ammo = this.ref
        var player = this.controls.getObject()

        var ammoBB = new THREE.Box3().setFromObject(ammo)
        var playerBB = new THREE.Box3().setFromCenterAndSize(
            player.position.clone().setY(2),
            new THREE.Vector3(5, 5, 5)
        )

        if (ammoBB.intersectsBox(playerBB)) {
            this.scene.remove(ammo)
            this.touch = true
        }
    }
}

export {
    Item
}