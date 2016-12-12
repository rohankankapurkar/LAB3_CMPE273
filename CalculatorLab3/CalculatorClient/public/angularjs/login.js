var login = angular.module('login', []);
login.controller('login', function($scope, $http) {

 
	$scope.sample=[];
	$scope.total = 0;
	$scope.submit = function() {
        		
	console.log($scope.rohan);
	console.log($scope.keys);

	var lst = {
			"keys" : $scope.keys,
			"rohan" : $scope.rohan
	}
	
		
		$http({
			method : "POST",
			url : '/checklogin',
			data : lst
		     }).success(function(data) {
			
			console.log("data.answer");
			$scope.answer = data.answer;
			
			$scope.rohan = JSON.stringify(data.answer);
		});
	};
	
	
	$scope.add = function() {
		console.log("yeah");
		
		var keys = $scope.keys;
			
			$http({
				method : "POST",
				url : '/checklogin1',
				data : keys
				
				
			     }).success(function() {
				
				console.log("inside");
			});
		};
		
});
