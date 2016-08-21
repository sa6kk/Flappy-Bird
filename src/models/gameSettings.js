var GameSettings = (function () {
    var instance;

    function createInstance() {
        var settings = new Object();
        settings.gameWidth = 144;
        settings.gameHeight = 256;
        settings.gravity = 0.1;
        settings.birdJumpVelocity = 1.8;

        return settings;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();