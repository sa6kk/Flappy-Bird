module FlappyBird {
    export class RootView extends PIXI.Container {
        private stage: PIXI.Container;

        constructor(stage: PIXI.Container) {
            super();
            this.stage = stage;
            stage.addChild(this);
        }

        get Stage(): PIXI.Container { return this.stage; }
    }
}