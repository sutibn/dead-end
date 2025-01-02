import { Scene } from './Scene.js'
import { Level } from './level.js'

import { Weapon } from './Weapon.js'
import { Torch } from './Torch.js'
import { Item } from './Item.js'

import { Player } from './Player.js'
import { Enemy } from './Enemy.js'

var tick = performance.now()

var gameStart = false
var gameOver = false

var camera
var scene
var renderer
var controls

var player
var torch
var gun

function start() {
    // Camera
    camera = new THREE.PerspectiveCamera(90, 
        window.innerWidth / window.innerHeight, 0.1, 2000)

    // Controls
    controls = new THREE.PointerLockControls(camera, document.body)

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)

    scene = new Scene()
    var level = new Level(scene)
    level.create(500, 5)

    // Main menu
    var start = document.getElementById('start')
    start.addEventListener('click', function() { 
        controls.lock()
    }, false)

    var menu = document.getElementById('menu')
    controls.addEventListener('lock', function() {
        menu.style.display = 'none'
    })

    controls.addEventListener('unlock', function() {
        menu.style.display = 'none' 
    })

    scene.add(controls.getObject())
    controls.getObject().position.y = 5 // Player height

    // Objects
    player = new Player(controls)
    torch = new Torch(camera)
    gun = new Weapon(scene, camera, controls, 50)
    
    // Listeners
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onMouseClick, false)
    window.addEventListener('resize', onWindowResize, false)
}

var input = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    jumped: false,
    sprint: false
}

function onKeyDown(e) {
    switch (e.code) {
        case 'KeyW':
            input.forward = true
            break
        case 'KeyA':
            input.left = true
            break
        case 'KeyS':
            input.backward = true
            break
        case 'KeyD':
            input.right = true
            break
        case 'Space':
            if (input.jump)
                input.jumped = true
            input.jump = false
            break
        case 'ShiftLeft':
            input.sprint = true
            break
    }
}

function onKeyUp(e) {
    switch (e.code) {
        case 'KeyW':
            input.forward = false
            break
        case 'KeyA':
            input.left = false
            break
        case 'KeyS':
            input.backward = false
            break
        case 'KeyD':
            input.right = false
            break
        case 'ShiftLeft':
            input.sprint = false
            break
    }
}

function onMouseClick() {
    if (controls.isLocked === true && !gameOver) {
        gun.shoot()
        document.getElementById('ammoDisplay').textContent = gun.ammo
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

var items = []
var enemies = []

function render() {
    requestAnimationFrame(render)
    var time = performance.now()
    var delta = (time - tick) / 1000
    if (controls.isLocked === true && !gameOver) {
        spawn()
        update(delta)
        tick = time
    }

    renderer.render(scene.scene, camera)
}

function spawn() {
    if (gameStart)
        if (enemies.length < 10)
            enemies.push(new Enemy(scene, controls))
    if (items.length < 10)
        items.push(new Item(scene, controls))
}

function update(delta) {
    player.update(delta, input)
    if (player.moved) {
        setTimeout(function() {
            gameStart = true
        }, 3600)
    }

    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i]
        enemy.update(delta)
        if (enemy.touch) {
            gameOver = true
            controls.unlock()
            break
        }
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        item.update(delta)
        if (item.touch) {
            items.splice(i, 1)
            gun.ammo += 10
        }
    }

    var staminaBar = document.getElementById('staminaBar')
    staminaBar.style.width = player.stamina + '%'
    staminaBar.style.backgroundColor = '#ff0000cc'

    gun.update(delta, enemies)
    document.getElementById('scoreDisplay').textContent = gun.score
    document.getElementById('ammoDisplay').textContent = gun.ammo

    if (gameOver) {
        document.getElementById('gameOver').style.display = 'block'
        input.forward = input.backward = input.left = input.right = false
        player.velocity.set(0, 0, 0)
    }
}

start()
render()