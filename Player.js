class Player {
    constructor(controls) {
        this.controls = controls

        this.stamina = 100.0

        this.speed = 0.0
        this.walkSpeed = 200.0
        this.runSpeed = 1000.0

        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()
    }

    update(delta, input) {
        if (input.forward || input.backward || input.left || input.right)
            this.moved = true

        var velocity = this.velocity
        velocity.x -= velocity.x * 10.0 * delta
        velocity.z -= velocity.z * 10.0 * delta
        velocity.y -= 9.8 * 50.0 * delta
        
        var direction = this.direction
        direction.z = Number(input.forward) - Number(input.backward)
        direction.x = Number(input.right) - Number(input.left)
        direction.normalize()

        if (input.sprint && this.stamina > 0.0) {
            this.speed = this.runSpeed
            this.stamina -= 40.0 * delta
            if (this.stamina < 0.0) {
                this.stamina = 0.0
                input.sprint = false
                this.speed = this.walkSpeed
            }
        } else {
            this.speed = this.walkSpeed
            this.stamina += 20.0 * delta
            if (this.stamina > 100.0)
                this.stamina = 100.0
        }

        if (input.forward || input.backward)
            velocity.z -= direction.z * this.speed * delta
        if (input.left || input.right)
            velocity.x -= direction.x * this.speed * delta
        if (input.jumped) {
            velocity.y += 150.0
            input.jumped = false
        }

        var controls = this.controls
        controls.moveRight(-velocity.x * delta)
        controls.moveForward(-velocity.z * delta)
        var position = controls.getObject().position
        position.y += velocity.y * delta
        if (position.y < 10) {
            position.y = 10
            velocity.y = 0
            input.jump = true
        }
    }
}
    
export {
    Player
}