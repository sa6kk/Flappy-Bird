/// <reference path="../models/gameSettings.ts" />
/// <reference path="../views/birdView.ts" />

namespace FlappyBird {
    export class BirdController extends PIXI.Container { 
        private gameSettings: GameSettings;

        private view:BirdView;

        private isStatic: boolean;
        private isHitted: boolean;
        private hasFallen: boolean;
        private velocityY: number;

        constructor(view:BirdView) {
            super();
            this.gameSettings = GameSettings.getInstance();
            this.view = view;

            this.velocityY = -this.gameSettings.birdFlyVelocity; 
            this.isHitted = false;
            this.isStatic = false;
            this.hasFallen = false;

            this.birdGravity();
        }

        get Bird(): PIXI.Sprite { return this.view.Bird;} 

        get IsStatic(): boolean { return this.isStatic; }
        get HasFallen(): boolean { return this.hasFallen; }
        get IsHitted(): boolean { return this.isHitted; }

        set IsStatic(value: boolean) { this.isStatic = value; }
        set HasFallen(value: boolean) { this.hasFallen = value; }
        set IsHitted(value: boolean) { 
            if(value)
                this.onBirdHit();
            this.isHitted = value;
        }

        fly(): void {
            if (!this.isHitted)
                this.velocityY = -this.gameSettings.birdFlyVelocity;
        }

        resetBird(): void {
            this.view.Bird.x = this.gameSettings.birdStartingXPossition;
            this.view.Bird.y = this.gameSettings.birdStartingYPossition;

            this.view.startBirdFlapping();
            this.view.Bird.rotation = 0;
            this.velocityY = -this.gameSettings.birdFlyVelocity;
            this.isHitted = false;
            this.hasFallen = false;
            this.isStatic = false;
        }

        private onBirdHit(): void {
            this.velocityY = 0;
            this.view.stopBirdFlapping();            
        }

        private birdGravity(): void {
            if (!this.hasFallen && !this.isStatic) {
                if (this.velocityY < 12) {
                    this.velocityY += this.gameSettings.gravity;
                }

                this.view.Bird.y += this.velocityY;

                //bird rotation 
                if (!this.isHitted) {
                    if (this.velocityY > 0 && this.view.Bird.rotation < 1.5) {
                        this.view.Bird.rotation += this.velocityY / 30;
                    }
                    else if (this.velocityY < 0 && this.view.Bird.rotation > -0.2) {
                        this.view.Bird.rotation -= 0.12;
                    }
                } else {
                    this.view.Bird.rotation += 0.1;
                }
            }
            requestAnimationFrame(() => { this.birdGravity(); });
        }
    }
}