var soap = require('soap');
var baseURL = "http://localhost:8081/Test/services";





exports.add = function(req,res){
	
	
	var keys = req.param("rohan");

	
	console.log(keys);
};




exports.checkLogin = function(req,res){
	
	var keys = req.param("keys");
	var rohan = req.param("rohan");
	console.log(keys);
	console.log(rohan);
	console.log("getting");
	var exp= eval(rohan);

	 var url = baseURL+"/WebMain?wsdl";
	 var option = {
				ignoredNamespaces : true	
			};
	  var args = {rohan: rohan};

	  soap.createClient(url,option, function(err, client) {
		  console.log(args.name);
	      client.called(args, function(err, result) {
	    	  if(result.calledReturn != null && result.calledReturn == "" || result.calledReturn != undefined ){
	    		  console.log("got the data");
	    		  var json_responses = 
	    				{"answer" : result.calledReturn , "shit" : 100};
	    				res.send(json_responses);
	    				
	    				
	    	  }
	    	  else{
	    		  console.log("error while sending the data");
	    		  console.log("printing the calledvalue"+  result.calledReturn);
	    		  //res.send({statusCode:401});
	    		  var json_responses = 
  				{"answer" : result.calledReturn , "shit" : 100};
  				res.send(json_responses);
	    	  }
	      });
	  });
	
	
	
	
	
	console.log(exp);
	var json_responses = "";

		
		json_responses = 
		{"answer" : exp , "shit" : 100};
		res.send(json_responses);
		

		

};


