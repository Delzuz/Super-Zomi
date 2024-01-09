const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
const platformImgSrc = './img/platform.png';
const backgroundImgSrc = './img/background.png'
const hillsImgSrc = './img/hills.png'
const playerImgSrc = './img/zomi7.png'
const playerspegelImgSrc = './img/zomispegel.png'
const playerSitImgSrc = './img/zomisit1.png'
const playerSitSpegelImgSrc = './img/zomisit1Spegel.png'
const platfromSmallTallImgSrc = './img/platformSmallTall.png'
const platfromSmallImgSrc = './img/platformSmall.png'
const monsterImgSrc = './img/monster.png'
const iceSpikeImgSrc = './img/istapp.png'
const iceSpikesLongImgSrc = './img/spritesheet.png'
const gravity = 1.5;

canvas.width = 1024;
canvas.height = 524;


function createImage(imgSrc) {
    const image = new Image();
    image.src = imgSrc;
    return image;
}
const playerNormalImage = createImage(playerImgSrc);
const playerSpegelImage = createImage(playerspegelImgSrc);
const playerSitImage = createImage(playerSitImgSrc);
const playerSitSpegelImage = createImage(playerSitSpegelImgSrc);
const platformImage = createImage(platformImgSrc);
const backgroundImage = createImage(backgroundImgSrc);
const hillsImage = createImage(hillsImgSrc);
const platformSmallTall = createImage(platfromSmallTallImgSrc);
const platformSmall = createImage(platfromSmallImgSrc);
const monsterImage = createImage(monsterImgSrc);
const iceSpikeImage = createImage(iceSpikeImgSrc);
const iceSpikesLongImage = createImage(iceSpikesLongImgSrc);

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
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
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
    constructor({x, y, image, walkable}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
        this.walkable = walkable
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

class Monster {
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
    player = new Player(playerSitImage);
    platforms = [ new Platfrom({
        x: platformImage.width * 4 + 9, y: 300, image: platformSmallTall, walkable: true
    }), new Platfrom({
        x: -1, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width -3, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 2 + 100, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 3 + 300, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 4 + 550, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 5 + 550 -3, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 5 + 400, y: 300, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 5 + 600, y: 200, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 5 + 200, y: 100, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 6 + 600, y: 330, image: platformSmall, walkable: true
    }) //här slutar trappan 
    , new Platfrom({
        x: platformImage.width * 6 + 930 + platformSmallTall.width * 4 - 25, y: 330, image: platformSmallTall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 6 + 930 + platformSmallTall.width * 3 - 20, y: 230, image: platformSmallTall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 6 + 930 + platformSmallTall.width * 2 - 10, y: 230, image: platformSmallTall, walkable: false
    }), new Platfrom({
        x: platformImage.width * 6 + 930 + platformSmallTall.width * 2 - 10, y: 130, image: platformSmallTall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 6 + 930 + platformSmallTall.width - 5, y: 230, image: platformSmallTall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 6 + 930, y: 330, image: platformSmallTall, walkable: true
    }) // här börjar trappan
    , new Platfrom({
        x: platformImage.width * 6 + 900, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 7 + 900 -3, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 8 + 900 -5, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 9 + 900 -10, y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 10 + 1050, y: 330, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 10 + platformSmall.width + 1200 , y: 200, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 10 + platformSmall.width * 2 + 1350 , y: 70, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 10 + platformSmall.width * 3 + 1700 , y: 400, image: platformSmall, walkable: true
    }), new Platfrom({
        x: platformImage.width * 10 + platformSmall.width * 4 + 1950 , y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 11 + platformSmall.width * 4 + 1950 -4  , y: 430, image: platformImage, walkable: true
    }), new Platfrom({
        x: platformImage.width * 12 + platformSmall.width * 4 + 1950 -6  , y: 430, image: platformImage, walkable: true
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

    ];

    iceSpikes = [
        new GenericObject({
            x: platformImage.width * 2 - 50,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 3 + 50,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 3 + 150,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 4 + 250,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 4 + 350,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 4 + 400,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 6 + 500,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 6 + 620,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 6 + 720,
            y: 430,
            image: iceSpikeImage
        }),
        new GenericObject({
            x: platformImage.width * 9 + platformSmall.width + 1200 ,
            y: 430,
            image: iceSpikesLongImage
        }),
        new GenericObject({
            x: platformImage.width * 10 + platformSmall.width + 1200,
            y: 430,
            image: iceSpikesLongImage
        }),
        new GenericObject({
            x: platformImage.width * 10 + platformSmall.width + 1700,
            y: 430,
            image: iceSpikesLongImage
        })
    ]

    monster = new Monster({
        x: platformImage.width * 6 + 930 + platformSmallTall.width * 2 + 65 - 20, y: 360,
        image: monsterImage
    });

    scrollOffset = 0; 
}

let player = "";
let platforms = [];
let genericObjects = [];
let iceSpikes = [];
let monster = "";

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
    iceSpikes.forEach(spike => {
        spike.draw();
    })
    platforms.forEach(platform => {
        platform.draw();
    })
    monster.draw();
    player.update();
    
    console.log(scrollOffset);
    // Här blir höger eller vänster tryck bearbeteade
    if(keys.right.pressed 
        && player.position.x < 400) {
        player.velocity.x = player.speed;
        player.image = playerNormalImage;
    } else if ((keys.left.pressed
        && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
        player.image = playerSpegelImage;
    } else {
        player.velocity.x = 0;
        if(keys.right.pressed) {
            scrollOffset += 5;
            player.image = playerNormalImage;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * .66;
            })
            iceSpikes.forEach(spiket => {
                spiket.position.x -= player.speed;
            })
            monster.position.x -= player.speed;
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5;
            player.image = playerSpegelImage;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * .66;
            })
            iceSpikes.forEach(spiket => {
                spiket.position.x += player.speed;
            })
            monster.position.x += player.speed;
        }
    }

    //Stanna uppe på plattfromen 
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width
            && platform.walkable == true) {
            player.velocity.y = 0;
        }
    })

    // Starta om spelet när hon går på bilen.
    if(player.position.x < monster.position.x + monster.width - 20 &&
        player.position.x + player.width - 20 > monster.position.x &&
        player.position.y  < monster.position.y + monster.height &&
        player.position.y + player.height - 40 > monster.position.y
      ) {
        alert("You lose!")
        init()
    }

    // win condition
    if(scrollOffset > 20000) {
        console.log("YOU WIN")
    }

    //Lose condition
    if(player.position.y > canvas.height) {
        init()
    }
}
init();
animate();
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 37: keys.left.pressed = true; break;//Left key
        case 38: player.velocity.y -= 20; break;//Up key
        case 39: keys.right.pressed = true; break;//Right key
    }
})
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 37: keys.left.pressed = false; player.image = playerSitSpegelImage; console.log(keys.left.pressed); break;//Left key
        case 38: player.velocity.y = 0; break;//Up key
        case 39: keys.right.pressed = false; player.image = playerSitImage; console.log(keys.right.pressed); break;//Right key
    }
})