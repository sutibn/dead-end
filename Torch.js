class Torch {
    constructor(camera) {
        this.camera = camera
        this.create()
    }

    create() {
        var torch = new THREE.SpotLight(
            0xffffff, 1.5, 200, Math.PI / 4.5, 0.5, 2)
        torch.position.set(0, 0, 0)
        torch.castShadow = true
        torch.shadow.mapSize.width = 1024
        torch.shadow.mapSize.height = 1024
        torch.shadow.camera.near = 0.1
        torch.shadow.camera.far = 1000
        torch.shadow.camera.fov = 90
        torch.target.position.set(0, 0, -1)

        var camera = this.camera
        camera.add(torch)
        camera.add(torch.target)
    }
}

export {
    Torch
}