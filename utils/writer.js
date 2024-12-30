//Function for respnose paylod
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

//Utility function to create a ResponsePayload object
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

//Function to write a JSON response to the HTTP response object
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

//If the first argument is an instance of ResponsePayload, unpack it and recurse
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

//If the second argument is an integer, treat it as the HTTP status code
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    // If the first argument is an integer, treat it as the HTTP status code
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  // If a status code exists, assign the first argument as the payload
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    // Otherwise, treat the first argument as the payload
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  //Set the HTTP response headers and status code
  response.writeHead(code, {'Content-Type': 'application/json'});

  //End the response by sending the payload
  response.end(payload);
}
