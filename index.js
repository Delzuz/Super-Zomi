const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
const platformImgSrc = './img/platform.png';
const backgroundImgSrc = './img/background.png'
const hillsImgSrc = './img/hills.png'
const playerImgSrc = './img/zomi7.png'
const gravity = 1.5;

canvas.width = 1024;
canvas.height = 524;


function createImage(imgSrc) {
    const image = new Image();
    image.src = imgSrc;
    return image;
}

const platformImage = createImage(platformImgSrc);
const backgroundImage = createImage(backgroundImgSrc);
const hillsImage = createImage(hillsImgSrc);
const playerImage = createImage(playerImgSrc);

class Player {
    constructor(image) {
        this.speed = 8;
        this.position ={
            x: 100,
            y: 100,
            image: image
        };
        this.velocity = {
            x: 0,
            y: 1
        }
        // this.width = 30;
        // this.height = 30;
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)

        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if((this.position.y + this.height + this.velocity.y) < canvas.height) {
            this.velocity.y += gravity;
        }        
    }
}

class Platfrom {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function init() {
    player = new Player(playerImage);
    platforms = [new Platfrom({
        x: -1, y: 430, image: platformImage
    }), new Platfrom({
        x: platformImage.width -3, y: 430, image: platformImage
    }), new Platfrom({
        x: platformImage.width * 2 + 100, y: 430, image: platformImage
    })
    ];
    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image: backgroundImage
        }),
        new GenericObject({
            x: 0,
            y: 0,
            image: hillsImage
        })

    ]

    scrollOffset = 0; 
}

let player = "";
let platforms = [];
let genericObjects = [];

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
    c.fillStyle ='white'
    c.fillRect(0, 0, canvas.width, canvas.height);
    genericObjects.forEach(platform => {
        platform.draw();
    })
    platforms.forEach(platform => {
        platform.draw();
    })
    player.update();
    
    // Här blir höger eller vänster tryck bearbeteade
    if(keys.right.pressed 
        && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed
        && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed    
    } else {
        player.velocity.x = 0;
        if(keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * .66;
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * .66;
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

    // win condition
    if(scrollOffset > 2000) {
        console.log("YOU WIN")
        alert("YOU WIN!")
    }

    //Lose condition
    if(player.position.y > canvas.height) {
        init()
        alert("You lose!")
    }
}
init();
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