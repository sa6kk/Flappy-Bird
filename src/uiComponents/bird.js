class Bird extends PIXI.Sprite {
    constructor(x, y) {
        super()

        let fps = 60;
        this._then = Date.now();
        this._interval = 3000 / fps;
        this._delta;
        this._velocityY;

        this.x = x;
        this.y = y;
        this.anchor.x = this.anchor.y = 0.5;
        this._hasFallen = false;
        this._isStatic = false;

        this._gameSettings = GameSettings.getInstance();
        this._birdPhase = 0;
        this._birdTextures = [
                new PIXI.Texture.fromImage("birdDown.png"),
                new PIXI.Texture.fromImage("birdMiddle.png"),
                new PIXI.Texture.fromImage("birdUp.png")];

        this.texture = this._birdTextures[0];
        this._velocityY = -this._gameSettings.birdFlyVelocity;

        this.startBirdFlapping();
        this.birdGravity();
    }

    startBirdFlapping() {
        requestAnimationFrame(() => { this.startBirdFlapping() });

        let now = Date.now();
        this._delta = now - this._then;

        if (this._delta > this._interval) {
            this._then = now - (this._delta % this._interval);

            if (!this._hasFallen) {
                if (this._birdPhase > 2) {
                    this._birdPhase = 0;
                }

                this.texture = this._birdTextures[this._birdPhase];
                this._birdPhase += 1;
            }
        }
    }

    birdGravity() {
        requestAnimationFrame(() => { this.birdGravity() });

        if (!this._hasFallen && !this._isStatic) {
            //just testing should be removed
            //replace with hitTestObject checking ground and bird
            if (this.y >= this._gameSettings.groundYPos - this.width) {
                this._hasFallen = true;
            }

            if (this._velocityY < 12) {
                this._velocityY += this._gameSettings.gravity;
            }

            this.y += this._velocityY;

            if (this._velocityY > 0 && this.rotation < 1.5) {
                this.rotation += this._velocityY / 20;
            }
            else if (this._velocityY < 0 && this.rotation > -0.2) {
                this.rotation -= 0.12;
            }
        }
    }

    fly() {
        this._velocityY = -this._gameSettings.birdFlyVelocity;
    }
};

