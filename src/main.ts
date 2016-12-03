/// <reference path="../typings/pixi.js.d.ts" />
/// <reference path="./models/gameSettings.ts" />
/// <reference path="./controllers/rootController.ts" />
/// <reference path="./views/rootView.ts" />

module FlappyBird {    
    export class Main {
        private gameSettings:GameSettings =  GameSettings.getInstance();
        private stage:PIXI.Container;
        private renderer:any;

        constructor(){            
            let loader = PIXI.loader;
            loader.add('ace', "assets/spritesData.json");
            loader.on('complete', this.onAssetsLoaded.bind(this));
            loader.load();
        }
        
        private onAssetsLoaded():void {
            this.createrenderer();

            let rootView = new RootView(this.stage),
                rootController = new RootController(rootView);

            this.animate()
        }

        private createrenderer():void {
            console.log("Create Renderer");

            let rendererOptions = {
                antialiasing: false,
                transparent: false,
                resolution: window.devicePixelRatio,
                autoResize: true,
            }

            this.renderer = PIXI.autoDetectRenderer(this.gameSettings.gameWidth, this.gameSettings.gameHeight, rendererOptions);

            this.renderer.view.style.position = "absolute";
            this.renderer.view.style.top = "0px";
            this.renderer.view.style.left = "0px";
            this.renderer.view.style.display = "block"
            this.renderer.view.style.margin = "auto";

            this.stage = new PIXI.Container();

            this.resize()

            document.body.appendChild(this.renderer.view);

            window.addEventListener("resize", this.resize.bind(this));
        }

        private resize():void {
            let ratio = Math.min(window.innerWidth / this.gameSettings.gameWidth,
                window.innerHeight / this.gameSettings.gameHeight);
            this.stage.scale.x = this.stage.scale.y = ratio;

            this.renderer.resize(Math.ceil(this.gameSettings.gameWidth * ratio),
                Math.ceil(this.gameSettings.gameHeight * ratio));
        }

        private animate():void {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.render(this.stage);
        }
    }

    let game:Main = new Main() 
}