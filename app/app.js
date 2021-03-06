'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.GroupBuyEvents',
  'myApp.view2',
  'myApp.version',
  'firebase',
  'edmunds',
  'ui.bootstrap',
  'zippopotam'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/GroupBuyEvents'});
}]);
