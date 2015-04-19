angular.module('zippopotam', [])

.service('zippopotamService', function($http) {

	var zippoUrl = "http://api.zippopotam.us/us/";

	/*
	http://api.zippopotam.us/us/90210

	{"post code": "90210", "country": "United States", "country abbreviation": "US",
	"places": [{"place name": "Beverly Hills", "longitude": "-118.4065",
	"state": "California", "state abbreviation": "CA", "latitude": "34.0901"}]}

	*/

	this.getCityState = function(zipcode) {
		var request = zippoUrl + "/" + zipcode
		return $http.get(request).then(function(result) {
    		return result.data;
		});
	}

});