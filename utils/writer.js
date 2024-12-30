// Constructor for encapsulating a response payload with a status code and payload data
var ResponsePayload = function (code, payload) {
  this.code = code; // HTTP status code
  this.payload = payload; // Response data (can be an object, string, etc.)
};

// Utility function to create a ResponsePayload object
exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

// Helper to determine if an argument is a ResponsePayload instance
function isResponsePayload(arg) {
  return arg && arg instanceof ResponsePayload;
}

// Helper to determine if a value is a valid HTTP status code (integer)
function isValidStatusCode(value) {
  return Number.isInteger(value);
}

// Helper to extract the status code from the arguments
function extractStatusCode(arg1, arg2) {
  if (isValidStatusCode(arg2)) {
    return arg2; // Second argument is the status code
  }
  if (isValidStatusCode(arg1)) {
    return arg1; // First argument is the status code
  }
  return 200; // Default status code
}

// Helper to extract the payload from the arguments
function extractPayload(arg1, code) {
  if (code && arg1) {
    return arg1; // Payload is the first argument if a code exists
  }
  return arg1 || null; // Otherwise, return the first argument as the payload
}

// Helper to format the payload as JSON
function formatPayload(payload) {
  if (typeof payload === 'object') {
    return JSON.stringify(payload, null, 2); // Pretty-print JSON
  }
  return payload; // Return as-is if not an object
}

// Core function to write a JSON response
var writeJson = exports.writeJson = function (response, arg1, arg2) {
  // Handle ResponsePayload instances
  if (isResponsePayload(arg1)) {
    return writeJson(response, arg1.payload, arg1.code); // Recursively call with unpacked data
  }

  // Extract status code and payload
  const code = extractStatusCode(arg1, arg2);
  const payload = formatPayload(extractPayload(arg1, code));

  // Set HTTP response headers and status code
  response.writeHead(code, { 'Content-Type': 'application/json' });

  // End the response by sending the payload
  response.end(payload);
};