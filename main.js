var tick = performance.now()

var camera
var scene
var renderer
var controls

function start() {
    // Camera
    camera = new THREE.PerspectiveCamera(
        90, window.innerWidth / window.innerHeight, 0.1, 2000)

    // Controls
    controls = new THREE.PointerLockControls(camera, document.body)

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)
}

start()