/// <reference path="../models/gameSettings.ts" />
/// <reference path="../../typings/pixi-filters.d.ts" />

module FlappyBird {
    export class Pipe extends PIXI.Sprite {
        constructor(upperPipe: boolean = true) {
            super();

            let gameSettings: GameSettings = GameSettings.getInstance();

            this.texture = PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png");

            if (!upperPipe) {
                this.y = gameSettings.groundYPos - this.texture.height;
            }
        }
    }
}