angular.module('edmunds', [])

.service('edmundsService', function($http) {

	var edmundUrl = "https://api.edmunds.com/api/vehicle/v2/";
	var apiKey = "&api_key=nrrggdr6y5m3qn8jeck4ajc9";
	var viewStr = "&view=basic&fmt=json";

/*		makes?state=new&year=2014&view=basic&fmt=json&
	https://api.edmunds.com/api/vehicle/v2/audi?year=2014&view=basic&fmt=json&api_key=nrrggdr6y5m3qn8jeck4ajc9

*/
	this.getMakes = function(year) {
		var request = edmundUrl + "makes?" + "year=" + year + viewStr + apiKey;
		return $http.get(request).then(function(result) {
    		return result.data;
		});
	}

	// audi?year=2013&view=basic&fmt=json&api_key=nrrggdr6y5m3qn8jeck4ajc9

	// this.getModels = function(year, make) {
	// 	var request = edmundUrl + make + "?year=" + year + viewStr + apiKey;
	// 	return $http.get(request).then(function(result){
	// 		return result.data;
	// 	})
	// }

	//https://api.edmunds.com/api/vehicle/v2/honda/accord?year=2014&view=basic&fmt=json&api_key=nrrggdr6y5m3qn8jeck4ajc9

	this.getStyles = function(year, make, model) {
		var request = edmundUrl + "/" + make + "/" + model + "?" + "year=" + year + viewStr + apiKey;
		return $http.get(request).then(function(result) {
    		return result.data;
		});
	}
});