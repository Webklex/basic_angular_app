/**
 * Created by webklex on 09.01.16.
 */

var config = {
    app: {
        name: 'My new App'
    },
    storage: {
        type: 'localStorage' //sessionStorage
    }
};

var app = angular.module('app', [
    'ui.bootstrap',
    'ngSanitize',
    'LocalStorageModule',
    'ngRoute'
], function($interpolateProvider) {
    //$interpolateProvider.startSymbol('[[');
    //$interpolateProvider.endSymbol(']]');
});

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix(config.app.name)
        .setStorageType(config.storage.type)
        .setStorageCookie(0, '/')
        .setNotify(true, true);
}]);

app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

app.filter('ucfirst', function() {
    return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
});
