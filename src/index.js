/*
 * TODO
 * Add card generator
 * Split sprints, have some sort of planning phase
 * Drop cards on developers, so they are "in progress", and able to drag them back to the board
 *
 *
 *
 */

const PIXI = window.PIXI;
const p2 = window.p2;
const Phaser = window.Phaser;

let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    // Objects in office
    game.load.image('chair','./assets/images/chair.png');
    game.load.image('office-guy','./assets/images/office-guy.png');
    game.load.image('desk','./assets/images/desk.png');
    game.load.image('watercooler','./assets/images/watercooler.png');
    game.load.image('lamp','./assets/images/lamp.png');
    game.load.image('trashcan','./assets/images/trashcan.png');

    // Backgrounds
    game.load.image('wall','./assets/images/wall.png');
    game.load.image('wall-left','./assets/images/wall-left.png');
    game.load.image('wall-right','./assets/images/wall-right.png');
    game.load.image('stairs-left','./assets/images/stairs-left.png');
    game.load.image('stairs-right','./assets/images/stairs-right.png');
    game.load.image('door-open','./assets/images/door-open.png');
    game.load.image('door-half-open','./assets/images/door-half-open.png');
    game.load.image('door-closed','./assets/images/door-closed.png');
    game.load.image('painting','./assets/images/painting.png');
    game.load.image('plant','./assets/images/plant.png');
    game.load.image('drawer','./assets/images/drawer.png');
    game.load.image('drawer-with-plant','./assets/images/drawer-with-plant.png');
    game.load.image('window','./assets/images/window.png');
    game.load.image('window-tiled','./assets/images/window-tiled.png');
}

function create() {
    let wall = game.add.tileSprite(0, 408, 800, 192, 'wall');
    wall.tileScale.x = 2;
    wall.tileScale.y = 2;

    let office = [];
    office.push(game.add.sprite(48, 504, 'door-closed'));
    office.push(game.add.sprite(0, 504, 'wall-left'));
    office.push(game.add.sprite(0, 408, 'wall-left'));
    office.push(game.add.sprite(784, 504, 'wall-right'));
    office.push(game.add.sprite(784, 408, 'wall-right'));
    office.push(game.add.sprite(672, 504, 'stairs-right'));

    office.push(game.add.sprite(600, 504, 'watercooler'));
    office.push(game.add.sprite(16, 504, 'plant'));
    office.push(game.add.sprite(116, 504, 'drawer'));

    office.push(game.add.sprite(150, 504, 'drawer'));

    office.push(game.add.sprite(300, 504, 'window-tiled'));
    office.push(game.add.sprite(420, 504, 'window-tiled'));

    // Overlaying furniture

    office.push(game.add.sprite(280, 504, 'chair'));
    this.officeGuyOne = game.add.sprite(276, 520, 'office-guy');
    office.push(this.officeGuyOne);
    office.push(game.add.sprite(250, 504, 'desk'));

    office.push(game.add.sprite(380, 504, 'chair'));
    this.officeGuyTwo = game.add.sprite(376, 520, 'office-guy');
    office.push(this.officeGuyTwo);
    office.push(game.add.sprite(350, 504, 'desk'));

    office.push(game.add.sprite(480, 504, 'chair'));
    this.officeGuyThree = game.add.sprite(476, 520, 'office-guy');
    office.push(this.officeGuyThree);
    office.push(game.add.sprite(450, 504, 'desk'));

    office.forEach((office) => {
        office.scale.x = 2;
        office.scale.y = 2;
    });

    let cardTmp = game.add.graphics(0,0);
    cardTmp.beginFill(0xffffff, 1);
    cardTmp.lineStyle(3, 0x909090, 1);
    cardTmp.drawRect(0,0, 80, 50);
    cardTmp.endFill();
    cardTmp.moveTo(10,10);
    cardTmp.lineStyle(6, 0x00ff00, 1);
    cardTmp.lineTo(70,10);

    this.card = game.add.sprite(50,50, cardTmp.generateTexture());
    this.text = game.add.text(10,16,"5", "Courier New");

    this.card.addChild(this.text);
    cardTmp.destroy();
    this.card.inputEnabled = true;
    this.card.input.enableDrag(true);
    this.card.events.onDragStop.add(onCardDragStop, this);
    this.card.events.onDragStart.add(onCardDragStart, this);
}

function update() {
    let boundsA = this.card.getBounds();
    let boundsB = this.officeGuyOne.getBounds();
    if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
        this.officeGuyOne.tint = 0xaaffaa;
        this.card.target = this.officeGuyOne;
    } else {
        this.officeGuyOne.tint = 0xffffff;
        this.card.target = null;
    }

    // ¯ \_(ツ)_/¯
    // "surprise me"
}

function onCardDragStart() {
    this.card.scale.setTo(1,1);
}
function onCardDragStop() {
    if (this.card.target){
        this.card.scale.setTo(0.5, 0.5);
        this.card.position.setTo(this.card.target.x - 30, this.card.target.y - 10);
        console.log("DROPPED ON SOMETHING");
    }
}