const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
const platformImgSrc = './img/platform.png';
const backgroundImgSrc = './img/background.png'
const hillsImgSrc = './img/hills.png'

canvas.width = 1024;
canvas.height = 524;

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
        }        
    }
}

function createImage(imgSrc) {
    const image = new Image();
    image.src = imgSrc;
    return image;
}

const platformImage = createImage(platformImgSrc);
const backgroundImage = createImage(backgroundImgSrc);
const hillsImage = createImage(hillsImgSrc);

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
    player = new Player();
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

    let scrollOffset = 0; 
}

let player = new Player();
let platforms = [new Platfrom({
    x: -1, y: 430, image: platformImage
}), new Platfrom({
    x: platformImage.width -3, y: 430, image: platformImage
}), new Platfrom({
    x: platformImage.width * 2 + 100, y: 430, image: platformImage
})
];
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let genericObjects = [
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
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= 3;
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += 3;
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
    }

    //Lose condition
    if(player.position.y > canvas.height) {
        init()
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