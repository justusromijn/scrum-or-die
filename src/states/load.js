module.exports = (game) => {
    return {
        preload: () => {
            game.add.text(100, 100, "loading...", {font: "30px Courier New", fill: "#ffffff"});
            game.load.image("chair", "./assets/images/chair.png");
            game.load.image("office-guy", "./assets/images/office-guy.png");
            game.load.image("desk", "./assets/images/desk.png");
            game.load.image("watercooler", "./assets/images/watercooler.png");
            game.load.image("lamp", "./assets/images/lamp.png");
            game.load.image("trashcan", "./assets/images/trashcan.png");

            // Backgrounds
            game.load.image("wall", "./assets/images/wall.png");
            game.load.image("wall-left", "./assets/images/wall-left.png");
            game.load.image("wall-right", "./assets/images/wall-right.png");
            game.load.image("stairs-left", "./assets/images/stairs-left.png");
            game.load.image("stairs-right", "./assets/images/stairs-right.png");
            game.load.image("door-open", "./assets/images/door-open.png");
            game.load.image("door-half-open", "./assets/images/door-half-open.png");
            game.load.image("door-closed", "./assets/images/door-closed.png");
            game.load.image("painting", "./assets/images/painting.png");
            game.load.image("plant", "./assets/images/plant.png");
            game.load.image("drawer", "./assets/images/drawer.png");
            game.load.image("drawer-with-plant", "./assets/images/drawer-with-plant.png");
            game.load.image("window", "./assets/images/window.png");
            game.load.image("window-tiled", "./assets/images/window-tiled.png");
        },
        create: () => {
            game.state.start("menu");
        }
    };
};