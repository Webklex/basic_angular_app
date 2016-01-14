/*
 * File: Controller.js
 * Category: AngularJS Controller
 * Author: MSG
 * Created: 26.12.15 01:03
 * Updated: -
 *
 * Description:
 *  -
 */

app.controller('mainController', ['$scope', mainController]);

function mainController($scope) {
    var vm = $scope;
    vm.title = 'Sitetitle';
    vm.var = 'Some plain content';
}