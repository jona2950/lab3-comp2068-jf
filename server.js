// package to communicate web protocols with Node using javeScript 
var connect = require('connect');

// package module of connect to parse paramters from url
var url = require('url');

// main component to our app, holding itself; as a function, and handling middleware. 
var srv = connect(); 

// goal: get two pairs of numbers, x & y; added, multiplied, subtracted, or divided via parsing req from url
var calculon = function(req, res, next){

	// Sample URL: http://localhost:3000/lab3?method=add&x=16&y=4
	
	// capture our url parameters into an array than variables
	var purl = url.parse(req.url, true).query;
	//our variables
	var method = purl['method'];
	var x = parseFloat(purl['x']);
	var y = parseFloat(purl['y']);
	//our final calculation variable and equation string
	var salt;
	
	//if we want to read from the browser arguments to browser
	if (purl['true']){
		//testing
		for (i in purl ){
			res.end(purl[i]); //indexing is non-numerical order, instead, id placeholder name
		}
	}


	if (method == "add"){
		salt = (add(x,y));
	}
	else if(method == "subtract"){
		salt = (subtract(x,y));
	}
	else if(method == "multiply"){
		salt = (multiply(x,y));
	}
	else if(method == "divide"){
		salt = (divide(x,y));
	}
	
	salt = formatToBrowser(salt);
	res.end(formatEquation(method, x, y, salt));
		
	
};

//our mathematical functions to process the calculators request
var add = function(x,y){
	return (x+y);
}
var subtract = function(x,y){
	return (x-y);
}
var multiply = function(x,y){
	return (x*y);
}
var divide = function(x,y){
	return (x/y);
}
//return result to string format
var formatToBrowser = function(salt){
	return(salt.toString());
}
//format our equation
var formatEquation = function(method, x, y, salt){
	return x.toString() + ' ' + method + ' ' + y.toString() + ' = ' + salt;
}

// srv will know the following use(d) path is for the following.. events
// '/lab3' called to trigger function, calculate
srv.use('/lab3', calculon);

srv.listen(3000);

// display message that the server is running
console.log('Connect running on port 3000');