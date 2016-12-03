/// <reference path="../../typings/pixi.js.d.ts" />
/// <reference path="../models/gameSettings.ts" />

module FlappyBird {
    export class Bird extends PIXI.Sprite {
        private gameSettings: GameSettings;

        private birdTextures: Array<PIXI.Texture>
        private birdPhase: number;

        private then: number;
        private interval: number;
        private delta: number;
        private velocityY: number;

        private isStatic: boolean;
        private isHitted: boolean;
        private hasFallen: boolean;

        constructor(x: number, y: number) {
            super()

            this.gameSettings = GameSettings.getInstance();
            
            let fps = 60;
            this.then = Date.now();
            this.interval = 3000 / fps;
            this.delta;
            this.velocityY;

            this.x = x;
            this.y = y;
            this.anchor.x = this.anchor.y = 0.5;
            this.isHitted = false;
            this.isStatic = false;
            this.hasFallen = false;

            this.birdPhase = 0;
            this.birdTextures = [
                PIXI.Texture.fromImage("birdDown.png"),
                PIXI.Texture.fromImage("birdMiddle.png"),
                PIXI.Texture.fromImage("birdUp.png")
            ];

            this.texture = this.birdTextures[0];
            this.velocityY = -this.gameSettings.birdFlyVelocity;

            this.startBirdFlapping();
            this.birdGravity();
        }

        get IsStatic(): boolean { return this.isStatic; }
        get HasFallen(): boolean { return this.hasFallen; }
        get IsHitted(): boolean { return this.isHitted; }

        set IsStatic(value: boolean) { this.isStatic = value; }
        set HasFallen(value: boolean) { this.hasFallen = value; }
        set IsHitted(value: boolean) { 
            if(value)
                this.velocityY = 0;
            this.isHitted = value;
        }

        fly(): void {
            if (!this.isHitted)
                this.velocityY = -this.gameSettings.birdFlyVelocity;
        }

        resetBird(): void {
            this.rotation = 0;
            this.velocityY = -this.gameSettings.birdFlyVelocity;
            this.isHitted = false;
            this.hasFallen = false;
            this.isStatic = false;
        }

        private startBirdFlapping(): void {
            requestAnimationFrame(() => { this.startBirdFlapping(); });

            let now = Date.now();
            this.delta = now - this.then;

            if (this.delta > this.interval) {
                this.then = now - (this.delta % this.interval);

                if (!this.isHitted) {
                    if (this.birdPhase > 2) {
                        this.birdPhase = 0;
                    }

                    this.texture = this.birdTextures[this.birdPhase];
                    this.birdPhase += 1;
                }
            }
        }

        private birdGravity(): void {
            if (!this.hasFallen && !this.isStatic) {
                if (this.velocityY < 12) {
                    this.velocityY += this.gameSettings.gravity;
                }

                this.y += this.velocityY;

                if (!this.isHitted) {
                    if (this.velocityY > 0 && this.rotation < 1.5) {
                        this.rotation += this.velocityY / 30;
                    }
                    else if (this.velocityY < 0 && this.rotation > -0.2) {
                        this.rotation -= 0.12;
                    }
                } else {
                    this.rotation += 0.1;
                }
            }
            requestAnimationFrame(() => { this.birdGravity(); });
        }
    }
}