/// <reference path="../views/obsticlesView.ts" />
/// <reference path="../models/gameSettings.ts" />
/// <reference path="../uiComponents/pipesObsticle.ts" />

module FlappyBird {
    export class ObsticlesController extends PIXI.Container {
        private pipeObsticles: Array<PipeObsticle>
        private view: ObsticlesView;
        private gameSettings: GameSettings = GameSettings.getInstance();

        private isRunning: boolean;

        constructor(view: ObsticlesView) {
            super()
            this.view = view;
            this.pipeObsticles = new Array<PipeObsticle>();

            for (let i = 0; i < 3; i++) {
                let pipeObsticle: PipeObsticle = new PipeObsticle();
                pipeObsticle.x = this.gameSettings.gameWidth + (i + 1) * this.gameSettings.obsticlesDistance;
                view.addChild(pipeObsticle);

                this.pipeObsticles.push(pipeObsticle);
            }

            this.isRunning = true;
            this.startMoving();
        }

        get PipeObsticles(): Array<PipeObsticle> { return this.pipeObsticles }

        stopMoving(): void {
            this.isRunning = false;
        }

        startMoving(): void {
            this.isRunning = true;
            requestAnimationFrame(() => {
                if (this.isRunning)
                    this.startMoving()
            })

            this.movePipes()
        }

        resetObsticles(): void {
            this.resetPipesPossition();
        }

        private resetPipesPossition(): void {
            for (let i = 0; i < this.pipeObsticles.length; i++) {
                this.pipeObsticles[i].x = this.gameSettings.gameWidth + (i + 1) * this.gameSettings.obsticlesDistance;
            }
        }

        private movePipes(): void {
            for (let i = 0; i < this.pipeObsticles.length; i += 1) {
                if (this.pipeObsticles[i].x < -this.pipeObsticles[i].UpperPipe.width) {
                    this.pipeObsticles[i].updateObsticle();
                    this.pipeObsticles[i].x = this.gameSettings.gameWidth + this.gameSettings.obsticlesDistance;
                }

                this.pipeObsticles[i].x -= this.gameSettings.obsticlesSpeed;
            }
        }
    }
}