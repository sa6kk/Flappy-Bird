/// <reference path="../uiComponents/ground.ts" />
/// <reference path="../controllers/birdController.ts" />
/// <reference path="../controllers/obsticlesController.ts" />
/// <reference path="../views/rootView.ts" />
/// <reference path="../views/birdView.ts" />
/// <reference path="../views/obsticlesView.ts" />
/// <reference path="../utils/collisionChecker.ts" />

module FlappyBird {
    export class RootController extends PIXI.Container {
        private view: RootView;

        private obsticlesController: ObsticlesController;
        private obsticlesView: ObsticlesView;
        private birdController: BirdController;
        private birdView:BirdView;

        private ground: Ground;

        private gameSettings: GameSettings;
        private gameOver: boolean = false;          // when set to true checkBirdCollision method will stop;

        constructor(view: any) {
            super();

            this.view = view;
            this.gameSettings = GameSettings.getInstance();

            let backgroundSprite = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
            view.addChild(backgroundSprite);

            this.ground = new Ground();
            this.ground.y = this.gameSettings.gameHeight - this.ground.height;
            this.gameSettings.groundYPos = this.ground.y;

            this.birdView = new BirdView(this.gameSettings.birdStartingXPossition, this.gameSettings.birdStartingYPossition);
            this.birdController = new BirdController(this.birdView);

            view.interactive = true;
            document.addEventListener('keydown', (e:KeyboardEvent) => { this.onKeyDown(e); });
            view.click = view.touchstart = () => {
                this.mainAction()
            };

            this.obsticlesView = new ObsticlesView();
            this.obsticlesController = new ObsticlesController(this.obsticlesView);
            view.addChild(this.obsticlesView);

            view.addChild(this.ground);
            view.addChild(this.birdView);

            this.checkBirdCollision.bind(this)();
        }


        private onKeyDown(key: KeyboardEvent) {
            if (key.keyCode == 32) {
                this.mainAction();
            }
        }

        private mainAction(): void {
            if (this.gameOver)
                this.restart();
            else
                this.birdController.fly();
        }

        private checkBirdCollision(): void {
            requestAnimationFrame(() => {
                if (!this.gameOver && !this.birdController.HasFallen)
                    this.checkBirdCollision()
            });

            //pipe collision
            if (!this.birdController.IsHitted) {
                if (CollisionChecker.pipeCollision(this.birdController.Bird, this.obsticlesController.NextPipeObsticle)) {
                    this.birdHitted();
                }
            }

            //groundHit
            if (CollisionChecker.groundCollision(this.birdController.Bird, this.ground)) {
                this.gameOver = true;
                this.birdController.HasFallen = true;
                this.birdHitted()
            }
        }

        private restart(): void {
            this.gameOver = false;

            this.ground.startMoving();
            this.birdController.resetBird();
            this.obsticlesController.resetObsticles();
            this.obsticlesController.startMoving();
            this.checkBirdCollision();
        }

        private birdHitted(): void {
            this.birdController.IsHitted = true;
            this.ground.stopMoving();
            this.obsticlesController.stopMoving();
        }
    }
}