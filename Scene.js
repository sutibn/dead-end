class Scene {
    constructor() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x71797E)
        this.scene.fog = new THREE.Fog(0x71797E, 0, 100)
        this.scene.add(new THREE.AmbientLight(0x000000, 0.5))
    }

    add(name) {
        this.scene.add(name)
    }

    remove(name) {
        this.scene.remove(name)
    }
}

export {
    Scene
}