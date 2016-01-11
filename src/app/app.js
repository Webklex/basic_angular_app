/**
 * Created by webklex on 09.01.16.
 */

var config = {
    app: {
        name: 'Basic idle Game'
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

app.config(['localStorageServiceProvider', '$routeProvider', function (localStorageServiceProvider, $routeProvider) {
    localStorageServiceProvider
        .setPrefix(config.app.name)
        .setStorageType(config.storage.type)
        .setStorageCookie(0, '/')
        .setNotify(true, true);

    $routeProvider.
        when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        }).
     otherwise({
     redirectTo: '/'
     })
    ;
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
