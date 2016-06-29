/*  Auto deploy with GIT - CI
    Nodejs
    */
    
var http = require('http');
// Config port
const PORT = 8989; 
var dispatcher = require('httpdispatcher');

//We need a function which handles requests and send response
function handleRequest(request, response){
  try {
      dispatcher.dispatch(request, response);
  } catch(err) {
      console.log(err);
  }
  //response.end('It Works!! Path Hit: ' + request.url);
}

// Controller
dispatcher.onGet("/deploy", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Process git pull
	require('simple-git')().pull(function(err, update) {
	    
	    //  Something if you need read summary and make anything, on this example, i just return status like json
      //  if(update && update.summary.changes) {
      //    require('child_process').exec('npm restart'); 
		  //  }
		  
      if(!err){
        res.end(JSON.stringify(update));
      }
      else{
			  res.end(JSON.stringify(err));
		  }
    });
}); 


//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //console.log("Server listening on: http://localhost:%s", PORT);
});
