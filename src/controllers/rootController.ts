/// <reference path="../uiComponents/bird.ts" />
/// <reference path="../uiComponents/ground.ts" />
/// <reference path="../controllers/obsticlesController.ts" />
/// <reference path="../views/rootView.ts" />
/// <reference path="../views/obsticlesView.ts" />
/// <reference path="../utils/collisionChecker.ts" />

module FlappyBird {
    export class RootController extends PIXI.Container {
        private view: RootView;

        private obsticlesController:ObsticlesController;
        private obsticlesView:ObsticlesView;
        private ground: Ground;
        private bird: Bird;

        private gameSettings: GameSettings;
        private gameOver: boolean = false;          // when set to true checkBirdCollision will stop;

        constructor(view: any) {
            super();

            this.view = view;
            this.gameSettings = GameSettings.getInstance();

            let backgroundSprite = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
            view.addChild(backgroundSprite);

            this.ground = new Ground();
            this.ground.y = this.gameSettings.gameHeight - this.ground.height;
            this.gameSettings.groundYPos = this.ground.y;

            this.bird = new Bird(this.gameSettings.birdStartingXPossition, this.gameSettings.birdStartingYPossition);
            
            view.interactive = true;
            document.addEventListener('keydown', (e) => {this.onKeyDown(e);});
            view.click = view.touchstart = () => {
                this.mainAction()
            };

            this.obsticlesView = new ObsticlesView();
            this.obsticlesController = new ObsticlesController(this.obsticlesView);
            view.addChild(this.obsticlesView);
            
            view.addChild(this.ground);
            view.addChild(this.bird);

            this.checkBirdCollision.bind(this)();
        }

        private onKeyDown(key:KeyboardEvent){
            if(key.keyCode == 32){
                this.mainAction();
            }
        }

        private mainAction():void{
             if(this.gameOver)
                    this.restart();
                else 
                    this.bird.fly(); 
        }

        private checkBirdCollision(): void {
            requestAnimationFrame(() => {
                if (!this.gameOver && !this.bird.HasFallen)
                    this.checkBirdCollision()
            });

            //pipe collision
            if(!this.bird.IsHitted){
                for (let pipeObsticle of this.obsticlesController.PipeObsticles){
                    if (CollisionChecker.pipeCollision(this.bird,pipeObsticle)){     
                        this.birdHitted();
                        break;
                    }
                }
            }
            
            //groundHit
            if (CollisionChecker.groundCollision(this.bird,this.ground)) {
                this.gameOver = true;
                this.bird.HasFallen = true;
                this.birdHitted()
            }
        }

        private restart(): void {
            this.bird.x = this.gameSettings.birdStartingXPossition;
            this.bird.y = this.gameSettings.birdStartingYPossition;

            this.gameOver = false;
            this.checkBirdCollision();

            this.bird.resetBird();
            this.ground.startMoving();
            this.obsticlesController.resetObsticles();
            this.obsticlesController.startMoving(); 
        }

        private birdHitted(): void {
            this.bird.IsHitted = true;
            this.ground.stopMoving();
            this.obsticlesController.stopMoving();
        }
    }
}