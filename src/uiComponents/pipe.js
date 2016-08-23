'use strict';
var Pipe = function (pipeUp = true) {
    PIXI.Sprite.call(this);
    var self = this,
        gameSettings = GameSettings.getInstance();

    self.texture = new PIXI.Texture.fromImage(pipeUp ? "pipeUp.png" : "pipeDown.png");

    if(!pipeUp){
        console.log(gameSettings.groundYPos - self.texture.height);
        self.y = gameSettings.groundYPos - self.texture.height;
    }
};

Pipe.prototype = Object.create(PIXI.Sprite.prototype);

 