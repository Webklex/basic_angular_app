/**
 * Created by webklex on 11.01.16.
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