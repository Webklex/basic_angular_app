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
    vm.title = 'Site title';
    vm.var = 'Basic Angular App';
}