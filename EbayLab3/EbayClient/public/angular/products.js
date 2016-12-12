
var app = angular.module('myApp', [ 'ngRoute' ]);
app.config(function($routeProvider) {
	console.log("inside routeprovider");
		$routeProvider
		
		
		.when("/sell", {
			templateUrl : "templates/sell.html",
			
			
		})
		
		.when("/buy", {
			templateUrl : "templates/buy.ejs",
			
			
		})
		
		.when("/cart", {
			templateUrl : "templates/cart.ejs",
			
			
		})
		.when("/history", {
			templateUrl : "templates/history.ejs",
			
			
		})
		.when("/yourads", {
			templateUrl : "templates/yourads.ejs",
			
			
		})
		.when("/info", {
			templateUrl : "templates/info.ejs",
			
			
		});
	});



app.controller('sellController1', function($scope,$http) {
	console.log("I am in sell controller");
	console.log("here" +$scope.status);
	console.log("printing product name" + $scope.p_name);
	$scope.addproduct = function() {
		$http({
			method : "POST",
			url : '/sell',
			data : {
				"p_name" : $scope.p_name,
				"p_price" : $scope.p_price,
				"p_disc" : $scope.p_disc
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("sent the data over server succssfully.");
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside products.js");
		});
	};
});








app.controller('buyController', function($scope,$http) {
	console.log("I am in buy controller");
	//console.log("here" +$scope.status);
	//console.log("printing product name" + $scope.p_name);
	
		$http({
			method : "POST",
			url : '/buy'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside products.js");
		});
		
		
		$scope.addToCart = function(data) {
			var p_id = {
				"p_id" : data
			};
			console.log(p_id);
			console.log(data);
			console.log("inside addCart function");
			$http({
				method : "POST",
				url : '/addToCart',
				data : p_id
			}).success(function(data) {

				if (data.statusCode == 200) {
					console.log("added to the cart successfully");
				} else {
					console.log("error while adding data to the cart");
				}
			})
		}
		
		
		

});



app.controller('cartController', function($scope,$http,$route) {
	console.log("I am in cart controller");

			$http({
			method : "POST",
			url : '/cart'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
		}).error(function(error) {
               console.log("failed inside products.js");
		});
		
		
		$scope.purchase = function(data) {
			var p_id = {
				"p_id" : data,
				"card" : $scope.card,
				"cvv" : $scope.cvv
				
				
				};
			console.log("printing p_id object"+p_id);
			console.log(data);
			console.log("Printing the card number"+p_id.card);
			console.log("inside purchase function");
			
			
			//credit card validation code
			
			
			if($scope.card.length===16 && $scope.cvv.length===3 && !isNaN($scope.card)){
			
			$http({
				method : "POST",
				url : '/purchase',
				data : p_id
			}).success(function(data) {

				if (data.statusCode == 200) {
					console.log("purchased successfully");
					alert("item purchased");
				} else {
					console.log("error while adding data to the cart");
					//alert("invalid credentails");
				}
			})
			
			alert("item purchased successfully");
			$route.reload();
			
			}
			
			else {
				alert("invalid credentails");
				
			}
		}
		
		
		

});



app.controller('historyController', function($scope,$http) {
	console.log("I am in history controller");
	//console.log("here" +$scope.status);
	//console.log("printing product name" + $scope.p_name);
	
		$http({
			method : "POST",
			url : '/history'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside products.js");
		});
		
});



app.controller('youradsController', function($scope,$http) {
	console.log("I am in yourads controller");
	//console.log("here" +$scope.status);
	//console.log("printing product name" + $scope.p_name);
	
		$http({
			method : "POST",
			url : '/yourads'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside info.js");
		});
		
});



app.controller('infoController', function($scope,$http) {
	

	
	
	console.log("I am in info controller");
	console.log("here" +$scope.Birthday);
	console.log("printing USER  contact number " + $scope.Contact);
	
	
	
	
	

	$http({
		method : "POST",
		url : '/info1'
		
	}).success(function(data) {
		//checking the response data for statusCode
		console.log(data+ "oho");
		if (data.statusCode == 200) {
			console.log("data received successfully");
			$scope.allproducts = data.results;
			console.log("Result fetached is " + $scope.allproducts);
			console.log(JSON.stringify($scope.allproducts));
			}
		else
			{
			console.log("failed while sending data new product");
			}
			//Making a get call to the '/redirectToHomepage' API
	}).error(function(error) {
           console.log("failed inside info.js");
	});
	
	
	
	
	
	
	

	$scope.addinfo = function() {
		$http({
			method : "POST",
			url : '/info',
			data : {
				"about" : $scope.about,
				"Birthday" : $scope.Birthday,
				"Ebay_handle" : $scope.Ebay_handle,
				"Address" : $scope.Address,
				"Contact" : $scope.Contact
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("sent the data over server succssfully.");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify("This is the data receved fom server"+$scope.allproducts));
				console.log(JSON.stringify($scope.allproducts));

			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside info.js");
		});
	};
});





