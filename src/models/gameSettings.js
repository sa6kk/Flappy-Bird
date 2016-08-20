var GameSettings = (function () {
    var instance;

    function createInstance() {
        var settings = new Object();
        settings.gameWidth = 144;
        settings.gameHeight = 256;

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