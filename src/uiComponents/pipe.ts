module FlappyBird {
    export class Pipe extends PIXI.Sprite {
        constructor(pipeUp: boolean = true) {
            super();

            let gameSettings: GameSettings = GameSettings.getInstance();

            this.texture = PIXI.Texture.fromImage(pipeUp ? "pipeUp.png" : "pipeDown.png");

            if (!pipeUp) {
                this.y = gameSettings.groundYPos - this.texture.height;
            }
        }
    };
}