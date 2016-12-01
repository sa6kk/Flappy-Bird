/// <reference path="../uiComponents/bird.ts" />
/// <reference path="../uiComponents/pipe.ts" />
/// <reference path="../uiComponents/ground.ts" />

module FlappyBird {
    export class RootController extends PIXI.Container {

        private ground: Ground;
        private bump: any;

        private pipeUp: Pipe;
        private pipeDown: Pipe;
        private bird: Bird;

        constructor(view: any, gameSettings: GameSettings) {
            super();
            let backgroundSprite = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
            view.addChild(backgroundSprite);

            this.ground = new Ground();
            this.ground.y = gameSettings.gameHeight - this.ground.height;
            gameSettings.groundYPos = this.ground.y;

            //pipe test
            this.pipeUp = new Pipe(true);
            this.pipeUp.y -= 20;
            this.pipeUp.x = 200;
            this.pipeDown = new Pipe(false);
            this.pipeDown.y += 80;
            this.pipeDown.x = 200
            view.addChild(this.pipeUp);
            view.addChild(this.pipeDown);

            //testing bird
            this.bird = new Bird(gameSettings.gameWidth / 3, gameSettings.gameHeight / 5);
            view.interactive = true;
            view.click = view.touchstart = () => { this.bird.fly(); };

            this.checkBirdCollision.bind(this)();

            view.addChild(this.ground);
            view.addChild(this.bird);
        }

        checkBirdCollision() {
            //TODO:
            //pipe test movement
            if (true) {
                this.pipeDown.x--;
                this.pipeUp.x--;
            }

            requestAnimationFrame(() => { this.checkBirdCollision() });
        }
    }
}