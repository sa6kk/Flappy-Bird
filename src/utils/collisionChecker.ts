/// <reference path="../uiComponents/ground.ts" />
/// <reference path="../uiComponents/pipesObsticle.ts" />

module FlappyBird {
    export class CollisionChecker {
        static pipeCollision(bird: PIXI.Sprite, pipeObsticle: PipeObsticle): boolean {
            let birdLeftPoint: number = bird.x - bird.texture.width;
            let birdRightPoint: number = bird.x + bird.texture.width;
            let birdTopPoint: number = bird.y - bird.texture.height;
            let birdBottomPoint: number = bird.y + bird.texture.height;


            let xCollision: boolean =
                bird.x < pipeObsticle.x + pipeObsticle.UpperPipe.width &&
                bird.x + bird.width / 2 > pipeObsticle.x


            let yCollision: boolean =
                (bird.y - bird.height / 2 < pipeObsticle.UpperPipe.y + pipeObsticle.UpperPipe.height &&
                    bird.height / 2 + bird.y > pipeObsticle.UpperPipe.y) ||
                (bird.y - bird.height / 2 < pipeObsticle.BottomPipe.y + pipeObsticle.BottomPipe.height &&
                    bird.height / 2 + bird.y > pipeObsticle.BottomPipe.y)

            if (yCollision && xCollision) {
                return true;
            }


            return false;
        }

        static groundCollision(bird: PIXI.Sprite, ground: Ground): boolean {
            if (Math.round(bird.y) >= ground.y) {
                return true;
            } else {
                return false;
            }
        }
    }
}