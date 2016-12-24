/// <reference path="../../typings/pixi.js.d.ts" />

namespace FlappyBird {
    export class BirdView extends PIXI.Container {
        private birdTextures: Array<PIXI.Texture>;
        private birdPhase: number;

        private birdContainer: PIXI.Sprite;
        private cigaretteContainer: PIXI.Sprite;

        private then: number;
        private interval: number;
        private delta: number;

        private birdFlappying: boolean;

        constructor(birdX:number, birdY:number) {
            super();

            let fps = 60;
            this.then = Date.now();
            this.interval = 3000 / fps;
            this.delta;

            this.birdPhase = 0;
            this.birdTextures = [
                PIXI.Texture.fromImage("birdDown.png"),
                PIXI.Texture.fromImage("birdMiddle.png"),
                PIXI.Texture.fromImage("birdUp.png")
            ];

            this.birdContainer = new PIXI.Sprite(this.birdTextures[0]);
            this.birdContainer.anchor.x = this.birdContainer.anchor.y = 0.5;
            this.birdContainer.x = birdX;
            this.birdContainer.y = birdY;
            this.addChild(this.birdContainer);

            this.startBirdFlapping();
        }

        get Bird(): PIXI.Sprite { return this.birdContainer }

        stopBirdFlapping(): void {
            this.birdFlappying = false;
        }

        startBirdFlapping(): void {
            this.birdFlappying = true;
            requestAnimationFrame(() => {
                if (this.birdFlappying)
                    this.startBirdFlapping();
            });

            let now = Date.now();
            this.delta = now - this.then;

            if (this.delta > this.interval) {
                this.then = now - (this.delta % this.interval);

                if (this.birdPhase > 2) {
                    this.birdPhase = 0;
                }

                this.birdContainer.texture = this.birdTextures[this.birdPhase];
                this.birdPhase += 1;
            }
        }
    }
}