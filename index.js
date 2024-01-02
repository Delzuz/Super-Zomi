const canvas = document.querySelector('canvas');

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1.5;

class Player {
    constructor() {
        this.position ={
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if((this.position.y + this.height + this.velocity.y) < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0
        } 
            
    }

}

const player = new Player();
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    
    if(keys.right.pressed) {
        player.velocity.x = 5;
    } else if (keys.left.pressed) {
        player.velocity.x = -5    
    } else player.velocity.x = 0;
}

animate();
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 37: keys.left.pressed = true; console.log(keys.left.pressed); break;//Left key
        case 38: player.velocity.y -= 20; break;//Up key
        case 39: keys.right.pressed = true; console.log(keys.right.pressed); break;//Right key
    }
})
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 37: keys.left.pressed = false; console.log(keys.left.pressed); break;//Left key
        case 38: player.velocity.y = 0; break;//Up key
        case 39: keys.right.pressed = false; console.log(keys.right.pressed); break;//Right key
    }
})