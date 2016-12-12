var ejs = require("ejs");
var session = require("express-session");
var mysql = require('./mysql');
var sign = false;
var bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var soap = require('soap');
var baseURL = "http://localhost:8081/Test/services";
	

function registeruser(req,res)
{
console.log("inside the register user");
console.log(req.param("firstname"));
console.log(req.param("lastname"));
console.log(req.param("pwd"));
console.log(req.param("password"));
console.log(req.param("username"));
console.log(req.param("email"));
var pass = req.param("pwd");
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(pass, salt);


var args = {username: req.param("email"),password: hash,firstname:req.param("firstname"),lastname:req.param("lastname")};
var url = baseURL+"/WebMain?wsdl";
var option = {
			ignoredNamespaces : true	
		};
soap.createClient(url,option, function(err, client) {
	  console.log(args.username+ "inside the soap");
    client.register(args, function(err, result) {
//  	  if(result.calledReturn != null && result.calledReturn == "" || result.calledReturn != undefined ){
  		  console.log("Succesfully registered the user SOAP");
  		  var json_responses = 
  				{"statusCode" : 200};
  				res.send(json_responses);
  				
  				
  //	  }
  	//  else{
  		  console.log("error while sending the data");
  		//  console.log("printing the calledvalue"+  result.calledReturn);
  		 // res.send({statusCode:401});
//  		  var json_responses = 
//			{"answer" : result.calledReturn , "shit" : 100};
//			res.send(json_responses);
  	 // }
    });
});



var pass = req.param("pwd");
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(pass, salt);
bcrypt.hash(req.param("pwd"), saltRounds, function(err, hash) {
	  // Store hash in your password DB. 
	});

console.log("encryptrd password" + hash);



}



exports.sell = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	
	
	var insert="insert into product (p_name,p_price,p_disc,username) values ('"+req.param("p_name")+"',  '"+req.param("p_price")+"' , '"+req.param("p_disc")+"', '"+req.session.username[0].username+"' )";

	console.log("ad submisssion:" + insert);
	
	
	var args = {p_name: req.param("p_name"),p_price:req.param("p_price"),p_disc:req.param("p_disc"),username:req.session.username[0].username};
	var url = baseURL+"/WebMain?wsdl";
	var option = {
				ignoredNamespaces : true	
			};
	soap.createClient(url,option, function(err, client) {
		  console.log(args.username+ "inside the soap inserting data into the product");
	    client.sell(args, function(err, result) {
//  	  if(result.calledReturn != null && result.calledReturn == "" || result.calledReturn != undefined ){
	  		  console.log("Succesfully registered the user SOAP");
	  		console.log("submitted as successfully. Check the DB");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
	  				
	  				
	  //	  }
	  	//  else{
	  		  console.log("error while sending the data");
	  		//  console.log("printing the calledvalue"+  result.calledReturn);
	  		 // res.send({statusCode:401});
//	  		  var json_responses = 
//				{"answer" : result.calledReturn , "shit" : 100};
//				res.send(json_responses);
	  	 // }
	    });
	});
	
//	mysql.fetchData(function(err, results) {
//		
//		console.log("inside the sell");
//
//		if (err) {
//			throw err;
//		} 
//		else{
//			if (results.length > 0) {
//				
//				console.log("submitted as successfully. Check the DB");
//				json_responses = {"statusCode" : 200};
//				res.send(json_responses);
//				
//			} 
//			else {
//				
//				console.log("ad inserted baby");
//				json_responses = {"statusCode" : 401};
//				res.send(json_responses);
//				
//			}
//		}
//	}, insert);
	
	//res.render("successLogin.ejs");
}





exports.addToCart = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	var p_id = req.param("p_id");
	console.log(p_id + "captured the pid correctly inside the addToCart");
	
	
	var args = {user_id: req.session.username[0].username,p_id:req.param("p_id")};
	var url = baseURL+"/WebMain?wsdl";
	var option = {
				ignoredNamespaces : true	
			};
	soap.createClient(url,option, function(err, client) {
		  console.log(args.username+ "inside the soap inserting data into the product");
	    client.addToCart(args, function(err, result) {
//  	  if(result.calledReturn != null && result.calledReturn == "" || result.calledReturn != undefined ){
	  		  console.log("Succesfully registered the user SOAP");
	  		console.log("submitted as successfully. Check the DB");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
	  				
	  				
	  //	  }
	  	//  else{
	  		  console.log("error while sending the data");
	  		//  console.log("printing the calledvalue"+  result.calledReturn);
	  		 // res.send({statusCode:401});
//	  		  var json_responses = 
//				{"answer" : result.calledReturn , "shit" : 100};
//				res.send(json_responses);
	  	 // }
	    });
	});
	
	
	
	
//	var insert="insert into cart (user_id,p_id) values ('"+req.session.username[0].username+"',  '"+req.param("p_id")+"' )";
//
//	console.log("QUERY for submitting an AD is:" + insert);

//	mysql.fetchData(function(err, results) {
//		
//		console.log("inside the addToCart");
//
//		if (err) {
//			throw err;
//		} 
//		else{
//			if (results.length < 0) {
//				
//				console.log("submitted as successfully. Check the DB");
//				json_responses = {"statusCode" : 200};
//				res.send(json_responses);
//				
//			} 
//			else {
//				
//				console.log("data inserted into cart");
//				json_responses = {"statusCode" : 401};
//				res.send(json_responses);
//				
//			}
//		}
//	}, insert);
}









function signin(req,res) {
		res.render('signin.ejs',function(err, result) {
 // render on success
			if (!err) {
				res.end(result);
				console.log("inside signin");
			}
 // render or error
			else {
				res.end('An error occurred');
				console.log(err);
			}
		});
	}


function register(req,res) {
	res.render('register.ejs',function(err, result) {
// render on success
		if (!err) {
			res.end(result);
			
			console.log("inside register");
		}
// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}


function afterSignIn(req,res)
	{
	console.log("inside the aftersignin");
	console.log(req.param("username"));
	console.log(req.param("password"));
	var username = req.param("username");
	var password_db = req.param("password");
	var pass = req.param("pwd");
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password_db, salt);

	
	if(bcrypt.compareSync(password_db, hash))
		{
		
		console.log("true. Encryption works ");
		
		}
	
	
	
	
	var getUser="select * from users where username='"+req.param("username")+"' ";
	var date = "update users set time = '"+Date()+"' where username = '"+req.param("username")+"'";
	
	console.log("printing current time");
	console.log(Date() );
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else{
			if(results.length > 0){
				
				

				if(bcrypt.compareSync(password_db, hash))
					{
					
					
					
					mysql.fetchData(function(err, results) {
						
						console.log("inside the inserting into purchase");

						if (err) {
							throw err;
						} 
						else{
							if (results.length > 0) {
								
								console.log("Inserting into users := date");
								json_responses = {"statusCode" : 200};
								//res.send(json_responses);
								
							} 
							else {
								
								console.log("Error while insering date into users");
								json_responses = {"statusCode" : 401};
								//res.send(json_responses);
								
							}
						}
					}, date)
					
					
					
					
					
					console.log("valid Login");
					console.log("result is" + results[0].username);
					var json_response = { "statusCode" : 200};
				    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

					console.log("true. Encryption works ");
					req.session.username = results;
					req.session.id=results[0].user_id;
					res.render('successLogin.ejs', {data: req.session.username},function(err, result) {
						// render on success
					if (!err) {
						res.end(result);
							sign = true;
							}
						// render or error
							else {
							res.end('An error occurred');
							console.log(err);
						}
					});
					
					}
				else{
					
					res.render('failLogin.ejs',function(err, result) {
						// render on success
							if (!err) {
							res.end(result);
							}
						// 	render or error
							else {
							res.end('An error occurred');
							console.log(err);
						}
					});
					
					
				}
			    console.log (JSON.stringify(results));
				//req.session.username = results;
				//req.session.id=results[0].user_id;
				
				
				
				
				console.log(results[0].username+ "this is the username in session");
				console.log(req.session.username[0].username);
				console.log(req.session.username[0].time);
				
				//session implementation
				
			      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

			
				}
					else {
						console.log("Invalid Login");
						res.render('failLogin.ejs',function(err, result) {
						// render on success
							if (!err) {
							res.end(result);
							}
						// 	render or error
							else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
			}
		},getUser);
	
	
	//adding for displying date
	
/*mysql.fetchData(function(err, results) {
		
		console.log("inside the inserting into purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Inserting into users := date");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Error while insering date into users");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, date)*/
	
	
	
	
	
	
	
	
	
	}


  exports.login = function(req,res) //redirect function to the homepage
  {
	  //console.log(req.session.username[0].username+ "checking the exports login");
	  
	  
	  
	  if(req.session.username && sign === true) //check whether session is valid
	  {
		  //console.log("cheking the validity inside login page"+ req.session.username[0].username);
		  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        
		  res.render("successLogin",{data: req.session.username});
	  }
	  else
	  {
		  res.render("signin");
	  }
  };


  
  exports.logout = function(req,res) //logout function
  {
	  sign = false;

	  //console.log(req.session.username[0].username+ "value of username before destroy");

      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

	  req.session.destroy(); //destroy session
	  req.session = null;
      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');



	  res.redirect("signin");
      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

	};

















function getAllUsers(req,res)
		{
		var getAllUsers = "select * from product";
		console.log("Query is:"+getAllUsers);
		mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else
					{
						if(results.length > 0){
							var rows = results;
							var jsonString = JSON.stringify(results);
							var jsonParse = JSON.parse(jsonString);
							console.log("Results Type: "+(typeof results));
							console.log("Result Element Type:"+(typeof rows[0].p_name));
							console.log("Results Stringify Type:"+(typeof jsonString));
							console.log("Results Parse Type:"+(typeof jsonString));
							console.log("Results: "+(results));
							console.log("Result Element:"+(rows[0].p_name));
							console.log("Results Stringify:"+(jsonString));
							console.log("Results Parse:"+(jsonParse));
							res.render('products.ejs',{data:jsonParse},function(err, result) {
 // render on success
								if (!err) {
									res.end(result);
								}
 // render or error
								else {
									res.end('An error occurred');
									console.log(err);
								}
							});
						}
						else { 
							console.log("No users found in database");
							ejs.renderFile('./views/failLogin.ejs',function(err, result) {
 // render on success
								if (!err) {
									res.end(result);	
								}
 // render or error
								else {
									res.end('An error occurred');
									console.log(err);
								}
							});
						}
					}
			},getAllUsers);
		
		
		}
		



exports.buy = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	
	var insert = "select * from product where username <> '"+req.session.username[0].username+"'";

	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}











//adding data to the cart

exports.addToCart = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	var p_id = req.param("p_id");
	console.log(p_id + "captured the pid correctly inside the addToCart");
	
	
	var args = {user_id: req.session.username[0].username,p_id:req.param("p_id")};
	var url = baseURL+"/WebMain?wsdl";
	var option = {
				ignoredNamespaces : true	
			};
	soap.createClient(url,option, function(err, client) {
		  console.log(args.username+ "inside the soap inserting data into the product");
	    client.addToCart(args, function(err, result) {
//  	  if(result.calledReturn != null && result.calledReturn == "" || result.calledReturn != undefined ){
	  		  console.log("Succesfully registered the user SOAP");
	  		console.log("submitted as successfully. Check the DB");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
	  				
	  				
	  //	  }
	  	//  else{
	  		  console.log("error while sending the data");
	  		//  console.log("printing the calledvalue"+  result.calledReturn);
	  		 // res.send({statusCode:401});
//	  		  var json_responses = 
//				{"answer" : result.calledReturn , "shit" : 100};
//				res.send(json_responses);
	  	 // }
	    });
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var insert="insert into cart (user_id,p_id) values ('"+req.session.username[0].username+"',  '"+req.param("p_id")+"' )";

	console.log("QUERY for submitting an AD is:" + insert);

//	mysql.fetchData(function(err, results) {
//		
//		console.log("inside the addToCart");
//
//		if (err) {
//			throw err;
//		} 
//		else{
//			if (results.length < 0) {
//				
//				console.log("submitted as successfully. Check the DB");
//				json_responses = {"statusCode" : 200};
//				res.send(json_responses);
//				
//			} 
//			else {
//				
//				console.log("data inserted into cart");
//				json_responses = {"statusCode" : 401};
//				res.send(json_responses);
//				
//			}
//		}
//	}, insert);
}


exports.cart = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the cart function");
	
	var insert = "select p.p_id, p.p_name, p.p_disc,p.p_price,p.username from product p , cart c where p.p_id = c.p_id and c.user_id ='"+req.session.username[0].username+"' ";
	
    console.log("QUERY for checking the cart is :" + insert);

	//console.log("query output in cart is " + results);
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				
				console.log("printing the result of cart values " + results);
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}


//inserting into purchase

exports.purchase = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	var p_id = req.param("p_id");
	console.log(p_id + "captured the pid correctly inside the addToCart"+ p_id);
	var card = req.param("card");
	console.log("printing out the credit card number"+ card);
	console.log(card.length);
	
	

	
	//credit card validation
	
	if (card.length === 16){
	
	
	
	
	
	
	
	
	
	var insert="insert into purchase (p_id,username) values ('"+req.param("p_id")+"','"+req.session.username[0].username+"'  )";
	
	var insert2 = " insert into purchase2(p_id,p_name,p_quantity,p_price,p_disc,username) select * from product where p_id = '"+req.param("p_id")+"' ";
	
	var insert3 = "update purchase2 set myname = '"+req.session.username[0].username+"' where p_id = '"+req.param("p_id")+"' ";
	
	var deleteFromCart = "delete from cart where p_id ='"+req.param("p_id")+"'";
	
	var deleteFromProducts = "delete from product where p_id = '"+req.param("p_id")+"'";

	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the inserting into purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Inserted into products");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Error while insering into cart");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, insert)
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the inserting into purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Inserted into products2");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Error while insering into cart");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, insert2)
	
		mysql.fetchData(function(err, results) {
		
		console.log("inside the inserting into purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Inserting into purchase2 the mailid only");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Error while insering into mailid into purchase2");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, insert3)
	
mysql.fetchData(function(err, results) {
		
		console.log("inside the deleting a cart item when added to purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length = 0) {
				
				console.log("delete item from cart as it is added into purchased");
				json_responses1 = {"statusCode" : 200};
				//res.send(json_responses1);
				
			} 
			else {
				

				console.log("Error inside the deleting product from Cart");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, deleteFromCart);
	
	
mysql.fetchData(function(err, results) {
		
		console.log("deleting from purchase table");

		if (err) {
			throw err;
		} 
		else{
			if (results.length = 0) {
				
				console.log("delete item from purchase. 3rd query");
				json_responses1 = {"statusCode" : 200};
				res.send(json_responses1);
				
			} 
			else {
				

				console.log("Error inside the deleting product from Product.3rd query");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, deleteFromProducts);
}	
	
	else {
		//window.alert("invalid credentails");
		res.send("invalid credentails");
	}
}


//code to show the hstory of purchase


exports.history = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	

	var insert = "select * from purchase2 where myname = '"+req.session.username[0].username+"'";
	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}



exports.yourads = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	

	var insert = "select p_id,p_name,p_quantity,p_price,p_disc from product where username = '"+req.session.username[0].username+"' UNION select p_id,p_name,p_quantity,p_price,p_disc from purchase2 where username = '"+req.session.username[0].username+"'";
	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}


//updating users information

exports.info = function (req, res) {

	console.log(req.session.username[0].username+ "INSIDE INFO");
	console.log(req.param("Birthday"));
	
	var insert="update users set about = '"+req.param("about")+"', Birthday = '"+req.param("Birthday")+"', Ebay_handle= '"+req.param("Ebay_handle")+"', Address= '"+req.param("Address")+"',Contact = '"+req.param("Contact")+"' where username = '"+req.session.username[0].username+"'";

	
	var show = "select * from users where username = '"+req.session.username[0].username+"'";
	
	console.log("user updation query is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the info");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			}
		}
	}, insert);
	
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the info");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, show);
	
	
	
	
	


};


exports.info1 = function (req, res) {

	console.log(req.session.username[0].username+ "INSIDE INFO");
	//console.log(req.param("Birthday"));
	
	//var insert="update users set about = '"+req.param("about")+"', Birthday = '"+req.param("Birthday")+"', Ebay_handle= '"+req.param("Ebay_handle")+"', Address= '"+req.param("Address")+"',Contact = '"+req.param("Contact")+"' where username = '"+req.session.username[0].username+"'";

	
	var show = "select * from users where username = '"+req.session.username[0].username+"'";
	
	console.log("user updation query is:" + show);


	var args = {username:req.session.username[0].username};
	var url = baseURL+"/WebMain?wsdl";
	var option = {
				ignoredNamespaces : true	
			};
	soap.createClient(url,option, function(err, client) {
	console.log(args.username+ "inside the soap");
	client.info1(args, function(err, results) {
  	  		if(results.calledReturn != null && results.calledReturn == "" || results.calledReturn != undefined ){
	  		console.log("Succesfully registered the user SOAP");
			json_responses = {"statusCode" : 200 , "results" : results };
	  		res.send(json_responses);
	  	}
  	  
  	  		else
  	  		{
	  		 console.log("error while sending the data");
	  		 console.log("printing the calledvalue"+  result.calledReturn);
	  		 res.send({statusCode:401});
	  		 var json_responses = 
	  		 {"answer" : result.calledReturn , "shit" : 100};
	  		 res.send(json_responses);
  	  		}
	    });
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the info");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, show);
	
	
	
	
	


}


exports.register = register;
exports.registeruser = registeruser;
exports.signin=signin;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;
