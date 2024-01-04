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

class Platfrom {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const player = new Player();
const platforms = [new Platfrom({
    x: 200, y:100
}), new Platfrom({
    x: 500, y: 200
})];
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0; 

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw();
    })
    
    // Här blir höger eller vänster tryck bearbeteade
    if(keys.right.pressed 
        && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed
        && player.position.x > 100) {
        player.velocity.x = -5    
    } else {
        player.velocity.x = 0;
        if(keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;
            })
            
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            })
        }
    }

    //Stanna uppe på plattfromen 
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    })

    if(scrollOffset > 2000) {
        console.log("YOU WIN")
    }
}

animate();
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 37: keys.left.pressed = true; console.log(keys.left.pressed); break;//Left key
        case 38: player.velocity.y -= 30; break;//Up key
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