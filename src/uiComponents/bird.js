'use strict';
var Bird = function (x, y) {
    PIXI.Sprite.call(this);
    var self = this,
        fps = 60,
        now,
        then = Date.now(),
        interval = 3000 / fps,
        delta,
        birdRotationY,
        velocityY;

    this.x = x;
    this.y = y;
    this.anchor.x = this.anchor.y = 0.5;
    this.hasFallen = false;
    this.isStatic = false;

    var gameSettings = GameSettings.getInstance(),
        birdPhase = 0,
        birdTextures = [
            new PIXI.Texture.fromImage("birdDown.png"),
            new PIXI.Texture.fromImage("birdMiddle.png"),
            new PIXI.Texture.fromImage("birdUp.png")];

    this.texture = birdTextures[0];
    velocityY = -gameSettings.birdFlyVelocity;


    var startBirdFlapping = function () {
        requestAnimationFrame(startBirdFlapping);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

            if (!self.hasFallen) {
                if (birdPhase > 2) {
                    birdPhase = 0;
                }

                self.texture = birdTextures[birdPhase];
                birdPhase += 1;
            }
        }
    }

    var birdGravity = function () {
        requestAnimationFrame(birdGravity);
        
        if (!self.hasFallen && !self.isStatic ) {
            //just testing should be removed
            //replace with hitTestObject checking ground and bird
            if (self.y >= gameSettings.groundYPos - self.width) {
                self.hasFallen = true;
            }

            if (velocityY < 12) {
                velocityY += gameSettings.gravity;
            }

            self.y += velocityY;

            if(velocityY > 0 && self.rotation < 1.5) {
                self.rotation += velocityY / 20;
            }
            else if (velocityY < 0 && self.rotation > -0.2){
                self.rotation -= 0.12;
            }
        }
    }

    startBirdFlapping();
    birdGravity();

    this.fly = function() { 
        velocityY = -gameSettings.birdFlyVelocity; 
    }
};

Bird.prototype = Object.create(PIXI.Sprite.prototype);

