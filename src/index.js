/*
 * TODO
 * Add card generator
 * Split sprints, have some sort of planning phase
 * Drop cards on developers, so they are "in progress", and able to drag them back to the board
 */
import loadState from "./states/load";
import menuState from "./states/menu";

const PIXI = window.PIXI;
const p2 = window.p2;
const Phaser = window.Phaser;

let game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add("load", loadState(game));
game.state.add("menu", menuState(game));
game.state.start("load");

game.state.add("play", { create: create, update: update });

let office = [];
let developers = [];
let cards = [];
let skills = [
  {
    name: 'Skill 1',
    color: 0xff0000
  },
  {
    name: 'Skill 2',
    color: 0x00ff00
  },
  {
    name: 'Skill 3',
    color: 0x0000ff
  }
];

function create() {
  let wall = game.add.tileSprite(0, 408, 800, 192, 'wall');
  wall.tileScale.x = 2;
  wall.tileScale.y = 2;

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
  developers.push(game.add.sprite(276, 520, 'office-guy'));
  office.push(developers[developers.length - 1]);
  office.push(game.add.sprite(250, 504, 'desk'));

  office.push(game.add.sprite(380, 504, 'chair'));
  developers.push(game.add.sprite(376, 520, 'office-guy'));
  office.push(developers[developers.length - 1]);
  office.push(game.add.sprite(350, 504, 'desk'));

  office.push(game.add.sprite(480, 504, 'chair'));
  developers.push(game.add.sprite(476, 520, 'office-guy'));
  office.push(game.add.sprite(450, 504, 'desk'));
  office.push(developers[developers.length - 1]);

  office.forEach(office => {
    office.scale.x = 2;
    office.scale.y = 2;
  });

  let cardTmp = game.add.graphics(0, 0);
  cardTmp.beginFill(0xffffff, 1);
  cardTmp.lineStyle(3, 0x909090, 1);
  cardTmp.drawRect(0, 0, 80, 50);
  cardTmp.endFill();
  cardTmp.moveTo(10, 10);

  this.card = game.add.sprite(50, 50, cardTmp.generateTexture());
  cardTmp.destroy();
  this.text = game.add.text(10, 16, '5', 'Courier New');
  this.card.progress = game.add.graphics(10, 10);
  this.card.progress.value = 100;
  this.card.progress.draw = function() {
    this.clear();

    let x = 0;

    this.requiredSkills.forEach((skill, index) => {
      let val = 0.6 * skill.currentValue;

      this.moveTo(x, 0);
      this.lineStyle(6, skill.skill.color, 1);
      this.lineTo(x + val, 0);
      x += val;
    });
  };

  this.card.addChild(this.text);
  this.card.addChild(this.card.progress);

  cards.push(this.card);

  cards.forEach(card => {
    card.inputEnabled = true;
    card.input.enableDrag(true);
    card.events.onDragStop.add(onCardDragStop(card), this);
    card.events.onDragStart.add(onCardDragStart(card), this);
    card.events.onDragUpdate.add(onDragUpdate(card), this);
    card.progress.requiredSkills = createSkill(100);
    card.progress.draw();
  });

  developers.forEach(dev => {
    dev.skillset = game.add.graphics(-10, -10);
    dev.skillset.skills = createSkill(100);
    dev.addChild(dev.skillset);

    dev.skillset.draw = function() {
      this.clear();
      let x = 0;

      this.skills.forEach((skill, index) => {
        let val = 0.4 * skill.value;

        this.moveTo(x, 0);
        this.lineStyle(4, skill.skill.color, 1);
        this.lineTo(x + val, 0);
        x += val;
      });
    };

    dev.skillset.draw();
  });
}

function createSkill(total = 100) {
  return skills.map((skill, index) => {
    let value = Math.random() * 100;

    value = Math.min(value, total);

    if (index + 1 === skills.length) {
      value = total;
    }

    total -= value;

    return {
      skill,
      value,
      currentValue: value
    };
  });
}

function update() {
  cards.forEach(card => {
    if (card.allocated) {
      let remaining = 0;

      card.progress.requiredSkills.forEach(skill => {
        if (skill.currentValue > 0) {
          const devSkill = card.target.skillset.skills.find(sk => sk.skill.name === skill.skill.name);

          console.log(devSkill);

          skill.currentValue -= devSkill.value / 100 * 0.5;

          if (skill.currentValue < 0) {
            skill.currentValue = 0;
          }

          remaining += skill.currentValue;
        }
      });

      if(remaining === 0) {
          card.tint = 0x00FF00;
      }

      this.card.progress.draw();
    }
  });

  // ¯ \_(ツ)_/¯
  // "surprise me"
}

function onDragUpdate(card) {
  return function() {
    card.target = null;

    developers.forEach(dev => {
      let boundsA = card.getBounds();
      let boundsB = dev.getBounds();

      if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
        dev.tint = 0xaaffaa;
        card.target = dev;
      } else {
        dev.tint = 0xffffff;
      }
    });
  };
}

function onCardDragStart(card) {
  return function() {
    card.allocated = false;
    card.scale.setTo(1, 1);
  };
}

function onCardDragStop(card) {
  return function() {
    if (card.target) {
      card.allocated = true;
      card.scale.setTo(0.5, 0.5);
      card.position.setTo(card.target.x - 30, card.target.y - 10);
    }
  };
}
