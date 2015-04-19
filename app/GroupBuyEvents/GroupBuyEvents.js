'use strict';

angular.module('myApp.GroupBuyEvents', ['ngRoute','firebase','edmunds','ui.bootstrap','zippopotam'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/GroupBuyEvents', {
    templateUrl: 'GroupBuyEvents/GroupBuyEvents.html',
    controller: 'GroupBuyEventsCtrl'
  });
}])

.controller('GroupBuyEventsCtrl', ['$scope','$firebaseObject','$firebaseAuth','$firebaseArray','edmundsService','zippopotamService',
	function($scope, $firebaseObject,$firebaseAuth, $firebaseArray, edmundsService, zippopotamService) {

		var ref = new Firebase("https://groupbuy.firebaseio.com/groupbuyevents");
		// download the data into a local object

		$scope.groupBuyEvents = $firebaseArray(ref);
	  	// putting a console.log here won't work, see below

	  	//TO DO
	  	// Google authentication
	  	//https://www.firebase.com/docs/web/guide/login/google.html

	  	//Vehicle data API
	  	//http://edmunds.mashery.com/docs/read/The_Vehicle_API

	  	$scope.groupBuyEvent = {};

	  	$scope.saveGroupBuyForm = function() {

	  		$scope.groupBuyEvent = {
	  			year: $scope.carSelection.year,
	  			make: $scope.carSelection.make.name,
	  			model: $scope.carSelection.model.name,
	  			style: $scope.carSelection.style.name,
	  			dealerName: $scope.dealer.name,
	  			dealerAddress: $scope.dealer.address,
	  			zip: $scope.dealer.zip,
	  			city: $scope.dealer.city,
	  			state: $scope.dealer.state,
	  			price: $scope.price,
	  			discount: $scope.discount,
	  			buyBefore: Date.parse($scope.buyBefore),
	  			groupSize: $scope.groupSize,
	  			notes: $scope.notes
	  		}

	  		$scope.groupBuyEvents.$add($scope.groupBuyEvent);
	  	}

		$scope.noOfYears = function(num) {
		    return new Array(num);
		}

	  	$scope.makes;
	  	$scope.models;
	  	$scope.styles;

	  	$scope.typeOfUser = "Buyer";
	  	$scope.groupSize = 2;


	  	$scope.currentYear = new Date().getFullYear();
	  	$scope.carSelection = {
	  		year: $scope.currentYear,
	  		make: '',
	  		model: '',
	  		style: ''
	  	}

	  	var resetSelection = function() {

	  		// TO DO
	  	}

	  	// to get the company name, also gives model names which set after company selection
	  	$scope.getMakes = function() {
		  	edmundsService.getMakes($scope.carSelection.year)
		  	.then(function(data) {
		  		$scope.makes = data;
		  	});

		  	$scope.carSelection.model='';
	  		$scope.carSelection.style='';

	  		$scope.models = "";
	  		$scope.styles = "";
		}

		// models are already fetched, just set here after company selection
	  	$scope.refreshModels = function() {
	  		$scope.models = $scope.carSelection.make.models;

	  		$scope.carSelection.style='';
	  		$scope.styles = "";
		}

		// styles fetched after model is selected
		$scope.getStyles = function() {
			edmundsService.getStyles($scope.carSelection.year, $scope.carSelection.make.name, $scope.carSelection.model.name)
		  	.then(function(data) {
		  		$scope.styles = data.years[0].styles;
		  		console.log(data.years[0].styles);
		  	});
		}

		$scope.getCityState = function() {
			if($scope.dealer.zip.length == 5) {
				zippopotamService.getCityState($scope.dealer.zip)
				.then(function(data){
					$scope.dealer.city = data.places[0]['place name'];
					$scope.dealer.state = data.places[0].state;
				});
			} else {
				$scope.dealer.city = '';
				$scope.dealer.state = '';
			}
		}

		$scope.openDatePicker = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.toggleMin = function() {
    		$scope.minDate = $scope.minDate ? null : new Date();
    		$scope.minDate.setDate($scope.minDate.getDate() + 30);
    		$scope.buyBefore = $scope.minDate;
  		};

  		$scope.toggleMin();
		$scope.getMakes();
	}
]);