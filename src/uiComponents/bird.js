'use strict';
var Bird = function (x, y) {
    PIXI.Sprite.call(this);
    var self = this,
        fps = 60,
        now,
        then = Date.now(),
        interval = 3000 / fps,
        delta;

    this.x = x;
    this.y = y;
    this.anchor.x = this.anchor.y = 0.5;


    var gameSettings = GameSettings.getInstance(),
        birdPhase = 0,
        birdTextures = [
            new PIXI.Texture.fromImage("birdDown.png"),
            new PIXI.Texture.fromImage("birdMiddle.png"),
            new PIXI.Texture.fromImage("birdUp.png")];

    this.texture = new PIXI.Texture.fromImage("birdMiddle.png");

    var onEnterFrame = function () {
        requestAnimationFrame(onEnterFrame);

        now = Date.now();
            delta = now - then;

            if (delta > interval) {
                then = now - (delta % interval);

                if (birdPhase > 2) {
                    birdPhase = 0;
                }

                self.texture = birdTextures[birdPhase];
                birdPhase++;
            }  
    }

    onEnterFrame();
};

Bird.prototype = Object.create(PIXI.Sprite.prototype);