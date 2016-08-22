'use strict';
var Ground = function () {
    PIXI.Sprite.call(this);
    var self = this,
        fps = 60,
        now,
        then = Date.now(),
        interval = 1000 / fps,
        delta,
        gameSettings = GameSettings.getInstance();

    this.texture = new PIXI.Texture.fromImage("ground.png");;
    this.isMoving = true;

    var move = function () {
        requestAnimationFrame(move);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            if (self.isMoving === true) {
                self.x -= 2;

                if (-self.x === self.texture.width - gameSettings.gameWidth) {
                    self.x = 0;
                }
            }
        }
    }

    move();
}

Ground.prototype = Object.create(PIXI.Sprite.prototype);