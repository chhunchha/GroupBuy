'use strict';

angular.module('myApp.GroupBuyEvents', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/GroupBuyEvents', {
    templateUrl: 'GroupBuyEvents/GroupBuyEvents.html',
    controller: 'GroupBuyEventsCtrl'
  });
}])

.controller('GroupBuyEventsCtrl', ['$scope','$firebaseObject','$firebaseAuth','$firebaseArray',
	function($scope, $firebaseObject,$firebaseAuth, $firebaseArray) {

		var ref = new Firebase("https://groupbuy.firebaseio.com/groupbuyevents");
		// download the data into a local object

		$scope.groupBuyEvents = $firebaseArray(ref);
	  	// putting a console.log here won't work, see below

	  	//TO DO
	  	// Google authentication
	  	//https://www.firebase.com/docs/web/guide/login/google.html

	  	$scope.groupBuyEvent = {
	  		"make": "Honda",
      		"model": "Civic",
  			"year": 2014,
  			"dealer": "Honda Sunnyvale",
  			"price": 24000,
  			"discountPer": 10,
  			"offerValidTill": "15-Aug-2015",
  			"minGroupSize": 3
	  	};

	  	$scope.saveGroupBuyEvent = function() {
	  		$scope.groupBuyEvents.$add($scope.groupBuyEvent);
	  	}
	}
]);

app.controller("SampleCtrl", function() {

});