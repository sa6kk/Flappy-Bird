(function(){
    'use strict'
    
    var GAME_WIDTH = 144,
        GAME_HEIGHT = 256;

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
            animate();    
        }

         function createrenderer() {
            console.log("Create Renderer");

            var rendererOptions = {
            antialiasing: false,
            transparent: false,
            // resolution: window.devicePixelRatio,
            autoResize: true,
            }

            renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);

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
        var ratio = Math.min(window.innerWidth/GAME_WIDTH,
                         window.innerHeight/GAME_HEIGHT);

        // Scale the view appropriately to fill that dimension
        stage.scale.x = stage.scale.y = ratio;

        // Update the renderer dimensions
        renderer.resize(Math.ceil(GAME_WIDTH * ratio),
                        Math.ceil(GAME_HEIGHT * ratio));
      }

      function animate() {
          requestAnimationFrame(animate);
          renderer.render(stage);
      }   
}())