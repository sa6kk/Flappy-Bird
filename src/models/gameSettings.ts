module FlappyBird {
    export class GameSettings {
        //game resolution
        gameWidth: number = 144;
        gameHeight: number = 256;
        
        //bird settings
        birdStartingXPossition:number = this.gameWidth / 3;
        birdStartingYPossition:number = this.gameHeight / 5;
        birdFlyVelocity: number = 2.5;
        gravity: number = 0.106;
        
        //obsticles settings
        pipeObsticlesGap:number = 45;
        obsticlesDistance:number = 45;
        obsticlesSpeed:number = 1;

        groundYPos:number = null;

        private static instance: GameSettings = new GameSettings();

        constructor() {
            if (GameSettings.instance) {
                throw new Error("Error: Instantiation failed: Use GameSettings.getInstance() instead of new.");
            }
            GameSettings.instance = this;
        }

        public static getInstance(): GameSettings {
            return GameSettings.instance;
        }
    }
}