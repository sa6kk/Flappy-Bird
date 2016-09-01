class Ground extends PIXI.Sprite {
    constructor() {
        super();

        this.texture = new PIXI.Texture.fromImage("ground.png");;
        let fps = 60;
        this._then = Date.now(),
        this._interval = 1000 / fps,
        this._delta,
        this._gameSettings = GameSettings.getInstance();

        this._isMoving = true;
        this.move();
    }

    move() {
        requestAnimationFrame(() => { this.move() } );
        // requestAnimationFrame((function() { this.move() }).bind(this))

        let now = Date.now();
        this._delta = now - this._then;

        if (this._delta > this._interval){
            this._then = now - (this._delta % this._interval);
            if (this._isMoving === true) {
                this.x -= 2;

                if (-this.x === this.texture.width - this._gameSettings.gameWidth) {
                    this.x = 0;
                }
            }
        }
    }
}   
