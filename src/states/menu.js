module.exports = (game) => {
    return {
        preload: () => {},
        create: () => {
            game.add.text(100, 100, "MENU...", {font: "30px Courier New", fill: "#ffffff"});
            let newGame = game.add.text(100, 200, "NEW GAME", {font: "30px Courier New", fill: "#ffffff"});
            newGame.inputEnabled = true;
            newGame.events.onInputDown.add(() => {
                game.state.start("play");
            });
        }
    };
};