!function ( window ) {
    "use strict";

    var dbs = [];
    var indexedDB = window.indexedDB || {};
    var idbOpen = indexedDB.open;

    indexedDB.open = function offlineCleanupIDB ( name ) {
        !~dbs.indexOf( name ) ? dbs.push( name ) : null;
        return idbOpen.apply( this, arguments );
    };

    window.offlineCleanup = function offlineCleanup ( cb ) {
        var left = dbs.length;
        cb = typeof cb === "function" ? cb : function () {};

        dbs.forEach(function ( name, i ) {
            var req = indexedDB.deleteDatabase( name );
            req.onsuccess = function () {
                left--;
                if ( left === 0 ) {
                    finish();
                }
            };

            req.onerror = function ( err ) {
                left = -1;
                cb( err );
            };
        });

        if ( !dbs.length ) {
            finish();
        }

        function finish () {
            localStorage.clear();
            cb( null );
        }
    };
    offlineCleanup.dbs = dbs;

}( window );