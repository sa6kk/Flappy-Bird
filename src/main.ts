/// <reference path="../typings/cordova/cordova.d.ts" />
/// <reference path="../typings/cocoon.d.ts" />
/// <reference path="../typings/pixi.js.d.ts" />

/// <reference path="./models/gameSettings.ts" />
/// <reference path="./controllers/rootController.ts" />
/// <reference path="./views/rootView.ts" />

module FlappyBird {
    export class Main {
        private isCocoonJs;
        private gameSettings: GameSettings = GameSettings.getInstance();
        private stage: PIXI.Container;
        private renderer: any;
        private canvas: any;

        constructor() {
            this.isCocoonJs = navigator.isCocoonJS;

            if (window.cordova) {
                document.addEventListener("deviceready", this.startLoadingAssets.bind(this));
            } else {
                window.onload = this.startLoadingAssets.bind(this);
            }
        }

        private startLoadingAssets(): void {
            setTimeout(() => { try { navigator.splashscreen.hide(); } catch (e) { console.log(e); } }, 5000, false);

            let loader = PIXI.loader;
            loader.add('gameSprite', !window.cordova ? "img/spritesData.json" : cordova.platformId.toLowerCase() === "android" ?
                "file:///img/spritesData.json" : "img/spritesData.json");
            loader.on('complete', this.onAssetsLoaded.bind(this));
            loader.load();
        }

        private onAssetsLoaded(): void {
            this.createrenderer();

            let rootView = new RootView(this.stage),
                rootController = new RootController(rootView);

            this.animate()
        }

        private createrenderer(): void {
            if (this.isCocoonJs) {
                console.log("canvas+")
                this.canvas = document.createElement('screencanvas');

                this.canvas.style.cssText = "idtkscale:ScaleAspectFill";
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.canvas.backgroundColor = 0xff0000;

                this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, this.canvas);
            }
            else {
                console.log("normal canvas")
                this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0xffff00 });
            }

            this.stage = new PIXI.Container();
            this.stage.scale.x = window.innerWidth / this.gameSettings.gameWidth;
            this.stage.scale.y = window.innerHeight / this.gameSettings.gameHeight;
            document.body.appendChild(this.renderer.view);

            this.stage.interactive = true;
            this.animate();
        }

        private animate(): void {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.render(this.stage);
        }
    }

    let game: Main = new Main()
}