// Provides some shim for PhantomJS
window.indexedDB = window.indexedDB || {
    open: function () {
        return {};
    },
    deleteDatabase: function () {
        return {};
    }
};