/// <reference path="../../typings/pixi-filters.d.ts" />
/// <reference path="./pipe.ts" />
/// <reference path="../models/gameSettings.ts" />

module FlappyBird {
    export class PipeObsticle extends PIXI.Sprite {
        private upperPipe: Pipe;
        private bottomPipe: Pipe;

        constructor() {
            super();

            this.upperPipe = new Pipe(true);
            this.bottomPipe = new Pipe(false);
            
            this.updateObsticle();

            this.addChild(this.upperPipe);
            this.addChild(this.bottomPipe);
        }

        get UpperPipe(): Pipe { return this.upperPipe; }
        get BottomPipe(): Pipe { return this.bottomPipe; }

        updateObsticle(): void {
            let upperOffset: number = Math.floor((Math.random() * 100) + 1)
            this.upperPipe.y = -upperOffset;
            this.bottomPipe.y = this.UpperPipe.y + this.UpperPipe.height + GameSettings.getInstance().pipeObsticlesGap;
        }
    }
}