module.exports = function ( config ) {
    "use strict";

    config.set({
        basePath: "..",
        frameworks: [ "mocha", "chai", "sinon-chai" ],
        files: [
            "test/init.js",
            "offline-cleanup.js",
            "test/specs/**/*.js"
        ],
        browsers: [ "PhantomJS" ],
        reporters: [ "dots" ]
    });
};