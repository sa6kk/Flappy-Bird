module FlappyBird {
    export class GameSettings {
        gameWidth: number = 144;
        gameHeight: number = 256;
        gravity: number = 0.1;
        birdFlyVelocity: number = 2.4;
        groundYPos: number = null;

        private static _instance: GameSettings = new GameSettings();

        constructor() {
            if (GameSettings._instance) {
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            GameSettings._instance = this;
        }

        public static getInstance(): GameSettings {
            return GameSettings._instance;
        }
    }
}