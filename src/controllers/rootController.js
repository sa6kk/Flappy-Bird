(function(){
    'use strict';

        var gameSettings = GameSettings.getInstance();
        console.log(gameSettings);

        var stage, renderer;

        var loader = PIXI.loader;
        loader.add('ace', "assets/spritesData.json");
        loader.on('complete', onAssetsLoaded);
        loader.load();

        function onAssetsLoaded(){
            createrenderer();       

            var container = new PIXI.Container(),
                backgroundSprite = new PIXI.Sprite(new PIXI.Texture.fromImage("background.png"));

            var birdController = new BirdController();

            container.addChild(backgroundSprite);
            stage.addChild(container);
            
            var bird = new Bird(gameSettings.gameWidth / 3,gameSettings.gameHeight / 2 );
            stage.addChild(bird);
            animate();
        }

         function createrenderer() {
            console.log("Create Renderer");

            var rendererOptions = {
                antialiasing: false,
                transparent: false,
                resolution: window.devicePixelRatio,
                autoResize: true,
            }

            renderer = PIXI.autoDetectRenderer(gameSettings.gameWidth, gameSettings.gameHeight, rendererOptions);

            // Put the renderer on screen in the corner
            renderer.view.style.position = "absolute";
            renderer.view.style.top = "0px";
            renderer.view.style.left = "0px";

            stage = new PIXI.Container();

            // Size the renderer to fill the screen
            resize();

            document.body.appendChild(renderer.view);

            window.addEventListener("resize", resize);
    }

    function resize() {
        // Determine which screen dimension is most constrained
        var ratio = Math.min(window.innerWidth/gameSettings.gameWidth,
                         window.innerHeight/gameSettings.gameHeight);

        // Scale the view appropriately to fill that dimension
        stage.scale.x = stage.scale.y = ratio;

        // Update the renderer dimensions
        renderer.resize(Math.ceil(gameSettings.gameWidth * ratio),
                        Math.ceil(gameSettings.gameHeight * ratio));
      }

      function animate() {
          requestAnimationFrame(animate);
          renderer.render(stage);
      }   
})()