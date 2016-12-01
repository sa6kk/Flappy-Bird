module FlappyBird {
    export class Ground extends PIXI.Sprite {
        private gameSettings: GameSettings;

        private then: number;
        private interval: number;
        private delta: number;

        private isMoving: boolean;

        constructor() {
            super();
            this.texture = PIXI.Texture.fromImage("ground.png");;

            let fps = 60;
            this.then = Date.now(),
                this.interval = 1000 / fps,
                this.delta,
                this.gameSettings = GameSettings.getInstance();

            this.isMoving = true;
            this.startMoving();
        }

        private startMoving() {
            requestAnimationFrame(() => {
                if (this.isMoving) {
                    this.startMoving()
                }
            });

            let now = Date.now();
            this.delta = now - this.then;

            if (this.delta > this.interval) {
                this.then = now - (this.delta % this.interval);
                if (this.isMoving === true) {
                    this.x -= 2;

                    if (-this.x === this.texture.width - this.gameSettings.gameWidth) {
                        this.x = 0;
                    }
                }
            }
        }
    };
}