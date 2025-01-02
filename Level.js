class Level {
    constructor(scene) {
        this.scene = scene
    }

    create(size, grid) {
        var x0 = -size * Math.floor(grid / 2)
        var z0 = -size * Math.floor(grid / 2)
        for (var i = 0; i < grid; i++) {
            for (var j = 0; j < grid; j++) {
                var x1 = x0 + i * size
                var z1 = z0 + j * size
                this.floor(x1, z1, size)
            }
        }
    }

    floor(x, z, size) {
        var floor = new THREE.Mesh(
            new THREE.PlaneGeometry(size, size), 
            new THREE.MeshStandardMaterial({ 
                color: 0x808080 
            }))
        floor.rotation.x = -Math.PI / 2
        floor.position.set(x, 0, z)
        floor.receiveShadow = true
        this.scene.add(floor)
    }
}

export {
    Level
}