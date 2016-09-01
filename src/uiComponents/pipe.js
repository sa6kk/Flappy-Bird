class Pipe extends PIXI.Sprite {
    constructor(pipeUp = true) {
        super();

        let gameSettings = GameSettings.getInstance();

        this.texture = new PIXI.Texture.fromImage(pipeUp ? "pipeUp.png" : "pipeDown.png");

        if (!pipeUp) {
            this.y = gameSettings.groundYPos - this.texture.height;
        }   
    }
};