/*
 * File: router.js
 * Category: -
 * Author: MSG - Webklex
 * URL: http://webklex.com
 * Created: 11.01.2016
 * Updated: -
 *
 * Description:
 *  -
 */
app.config(['$routeProvider', function ($routeProvider) {

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