module.exports = (game) => {
    return {
        preload: () => {},
        create: () => {
            game.add.text(100, 100, "YOU WON!!! \nYou can now call yourself scrum guru", {font: "30px Courier New", fill: "#ffffff"});
            let restart = game.add.text(100, 260, "RESTART", {font: "30px Courier New", fill: "#ffffff"});
            restart.inputEnabled = true;
            restart.events.onInputDown.add(() => {
                game.state.start("menu");
            });
        }
    };
};