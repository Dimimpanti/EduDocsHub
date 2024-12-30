const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Unit Tests for User

//GET /course/{courseid}/reviews

//Test for GET /course/{courseid}/reviews returns the reviews array for a valid courseid
test('GET /course/{courseid}/reviews returns the reviews array for a valid courseid', async (t) => {
    const { got } = t.context;
    const courseid = 1; //Valid course ID

    const response = await got(`course/${courseid}/reviews`, { method: 'GET' });
    
    //response
    t.is(response.statusCode, 200);
    t.true(Array.isArray(response.body), 'The response should be an array of reviews');
    t.truthy(response.body.length > 0, 'The course should have at least one review');
    t.is(response.body[0].starnumber, 5, 'The first review should have 5 stars');
});

//GET /course/{courseid}/reviews returns 404 for a non-existent course ID 
test('GET /course/{courseid}/reviews returns 404 for a non-existent courseid', async (t) => {
    const { got } = t.context;
    const courseid = 'error'; //Invalid course ID

    const response = await got(`course/${courseid}/reviews`, { method: 'GET', throwHttpErrors: false });
    t.is(response.statusCode, 400);
    t.truthy(response.body.message, 'The response should contain a message property');
    t.is(response.body.message, 'request.params.courseid should be integer', 'The message should indicate that the course was not found');
});

//PUT /users/{userid}/UserFiles/Files/{fileid}

//PUT /users/{userid}/UserFiles/Files/{fileid} updates the file successfully
test('PUT /users/{userid}/UserFiles/Files/{fileid} updates the file successfully', async (t) => {
  const { got } = t.context;
  const userid = 1; //valid user ID
  const fileid = 101; //valid file ID
  const updatedFile = {
      title: 123, 
      school: 10,
      fileType: "pdf",
      accessStatus: 1
  };

  const response = await got.put(`users/${userid}/UserFiles/Files/${fileid}`, {
      json: updatedFile,
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 400 for a bad request');
  t.truthy(response.body.text, 'The response should contain a success message or error details');
});

//PUT /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid
test('PUT /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;
  const userid = "invalid";//invalid user ID
  const fileid = "invalid";//invalid file ID
  const updatedFile = {
      title: 123, 
      school: 10,
      fileType: "pdf",
      accessStatus: 1
  };

  const response = await got.put(`users/${userid}/UserFiles/Files/${fileid}`, {
      json: updatedFile,
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(
    response.body.message,
    'request.params.userid should be integer, request.params.fileid should be integer',
    'The error message should match the validation error'
  );
  
});

//POST /users/{userid}/Favourites/Files/{fileid}

//POST /users/{userid}/Favourites/Files/{fileid} successful addition of a file to the favourites page
test('POST /users/{userid}/Favourites/Files/{fileid} adds a file to favourites successfully', async (t) => {
  const { got } = t.context;
  const userid = 1;//valid iser ID
  const fileid = 101;//valid file ID

  const response = await got.post(`users/${userid}/Favourites/Files/${fileid}`, {
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 200 for successful update');


  t.is(response.body.text, 'File added to favourites', 'The success message should match');

});

//POST /users/{userid}/Favourites/Files/{fileid} unsuccesful editing cause of invalid userid or fileid
test('POST /users/{userid}/Favourites/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;
  const userid = "invalid";//invalid user ID
  const fileid = "invalid";//invalid file ID

  const response = await got.post(`users/${userid}/Favourites/Files/${fileid}`, {
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(
      response.body.message,
      'request.params.userid should be integer, request.params.fileid should be integer',
      'The error message should match the validation error'
  );
});

//DELETE /users/{userid}/UserFiles/Files/{fileid}

//Succesful deletion of a file by the user
test('DELETE /users/{userid}/UserFiles/Files/{fileid} handles successful', async (t) => {
  const { got } = t.context;
  const userid = 1;//valid user ID
  const fileid = 201;//valid file ID

  const responseSuccess = await got.delete(`users/${userid}/UserFiles/Files/${fileid}`, {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'File successfully deleted', 'The success message should match');
});

//DELETE /users/{userid}/UserFiles/Files/{fileid} for non-existent file deletion
test('DELETE /users/{userid}/UserFiles/Files/{fileid} for non-existent file deletion', async (t) => {
  const { got } = t.context;
  const userid = 1;//valid user ID
  const fileid = 2;//non-existent file
  const responseNotFound = await got.delete(`users/${userid}/UserFiles/Files/${fileid}`, {
    throwHttpErrors: false,
  });
  t.is(responseNotFound.statusCode, 404, 'The response status code should be 404 for non-existent file');
  t.truthy(responseNotFound.body.message, 'The response should contain an error message');
  t.is(responseNotFound.body.message, 'File not found', 'The error message should match');
});

//DELETE /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid
test('DELETE /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;
  const userid = 'invalid';//invalid user ID
  const fileid = 'invalid';//invalid file ID

  const responseInvalid = await got.delete(`users/${userid}/UserFiles/Files/${fileid}`, {
      throwHttpErrors: false,
  });

  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(
      responseInvalid.body.message,
      'request.params.userid should be integer, request.params.fileid should be integer',
      'The error message should match the validation error'
  );
});

//GET /course/{courseid}/Files/{fileid}

//User retrieves a file successfully
test('GET /course/{courseid}/Files/{fileid} retrieves the file successfully', async (t) => {
  const { got } = t.context;
  const courseid = 1;//valid course ID
  const fileid = 101;//valid file ID

  const response = await got(`course/${courseid}/Files/${fileid}`, {
    method: 'GET',
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 200 for successful retrieval');
  t.truthy(response.body.text, 'The response should contain a success message');
  t.is(response.body.text, 'File successfully retrieved', 'The success message should match');
});

//Unsuccessfull search cause of non-existent file 
test('GET /course/{courseid}/Files/{fileid} returns 404 for non-existent file', async (t) => {
  const { got } = t.context;
  const courseid = 1; // valid course ID
  const fileid = 999; // Non-existent file

  const response = await got(`course/${courseid}/Files/${fileid}`, {
    method: 'GET',
    throwHttpErrors: false,
  });
// response 
  t.is(response.statusCode, 404, 'The response status code should be 404 for non-existent file');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(response.body.message, 'File not found', 'The error message should match');
});


// GET /users/{userid}/Favourites/Files

//Unsuccessfull action cause of invalid user ID
test('GET /users/{userid}/Favourites/Files returns 400 for invalid user ID', async (t) => {
  const { got } = t.context;
  const userid = 'invalid'; // invalid user ID

  const response = await got(`users/${userid}/Favourites/Files`, { throwHttpErrors: false });

  //response
  t.is(response.statusCode, 400, 'The response status code should be 400 for invalid user ID');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(response.body.message, 'request.params.userid should be integer', 'The error message should match');
});


// GET /course/{courseid}/Files

//GET /course/{courseid}/Files handles successful retrieval
test('GET /course/{courseid}/Files handles successful retrieval', async (t) => {
  const { got } = t.context;
  const courseid = 1;//valid course ID

  const responseSuccess = await got(`course/${courseid}/Files`, { method: 'GET', throwHttpErrors: false });
  
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful retrieval');
  t.truthy(responseSuccess.body, 'The response should contain file details');
  t.true(Array.isArray(responseSuccess.body), 'The response should be an array');
  t.truthy(responseSuccess.body.length > 0, 'The array should not be empty');
});

//GET /course/{courseid}/Files for non-existent course
test('GET /course/{courseid}/Files for non-existent course', async (t) => {
  const { got } = t.context;
  const courseid = 'invalid'; // invalid course ID

  const responseNotFound = await got(`course/${courseid}/Files`, { method: 'GET', throwHttpErrors: false });
  // response 
  t.is(responseNotFound.statusCode, 400, 'The response status code should be 400 for non-existent course');
  t.truthy(responseNotFound.body.message, 'The response should contain an error message');
  t.is(responseNotFound.body.message, 'request.params.courseid should be integer', 'The error message should match');
});

//GET/course/search

//Succesful search for a keyword
test('GET /course/search handles successful search', async (t) => {
  const { got } = t.context;

  // Successful search when search word is math
  const responseSuccess = await got('course/search?keyword=math', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful search');
  t.truthy(responseSuccess.body, 'The response should contain search results');
  t.true(Array.isArray(responseSuccess.body), 'The response should be an array');
  t.truthy(responseSuccess.body.length > 0, 'The array should not be empty');
});

//Unmatched keyword leads to an unsuccessful search
test('GET /course/search for no results', async (t) => {
  const { got } = t.context;

  const responseNoResults = await got('course/search?keyword=unknown', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseNoResults.statusCode, 200, 'The response status code should be 200 even for no results');
  t.true(Array.isArray(responseNoResults.body), 'The response should be an array');
  t.is(responseNoResults.body.length, 0, 'The array should be empty when no results are found');
});

//Unsuccessfull search cause the keyword is missing
test('GET /course/search for missing keyword', async (t) => {
  const { got } = t.context;

  // Missing keyword
  const responseInvalid = await got('course/search', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for missing keyword');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(responseInvalid.body.message, 'request.query should have required property \'keyword\'', 'The error message should match');
});

//POST /users/{userid}/UserFiles/Files

//POST /users/{userid}/UserFiles/Files handles successful upload
test('POST /users/{userid}/UserFiles/Files handles successful upload', async (t) => {
  const { got } = t.context;

  // valid editing of an  existing file
  const validFile = {
    title: 1,
    school: 2,
    fileType: 'pdf',
    accessStatus: 1,
  };

  const responseSuccess = await got.post('users/1/UserFiles/Files', {
    json: validFile,
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful upload');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'File successfully uploaded', 'The success message should match');
});

//POST /users/{userid}/UserFiles/Files for invalid input
test('POST /users/{userid}/UserFiles/Files for invalid input', async (t) => {
  const { got } = t.context;
  const userid = 1;

  //invalid file editing due to wrong title parameters
  const invalidFile = {
    title: 'invalid',
    school: 2,
    fileType: 'pdf',
    accessStatus: 1,
  };

  const responseInvalid = await got.post('users/1/UserFiles/Files', {
    json: invalidFile,
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(responseInvalid.body.message, 'request.body.title should be integer', 'The error message should match');
});

//DELETE /users/{userid}/Files/{fileid}

//Syccessfull deletion of a favorite file from the user
test('DELETE /users/{userid}/Favourites/Files/{fileid} handles successful deletion', async (t) => {
  const { got } = t.context;
  const userid = 1; //valid user ID
  const fileid = 101; //valid file id

  const responseSuccess = await got.delete('users/1/Favourites/Files/101', {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'File successfully removed from favourites', 'The success message should match');
});

//Unsuccessfull deletion due to invalid userID and invalid fileID
test('DELETE /users/{userid}/Favourites/Files/{fileid} for invalid input', async (t) => {
  const { got } = t.context;

  const responseInvalid = await got.delete('users/invalid/Favourites/Files/invalid', {
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
});

//Tests for admin

//DELETE /admin/courses/{courseid}

//Successfull deletion of a course
test('DELETE /admin/courses/{courseid} handles successful deletion', async (t) => {
  const { got } = t.context;

  const responseSuccess = await got.delete('admin/courses/101', {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'Course successfully deleted', 'The success message should match');
});

//Unsuccessfull deletion of a course due to invalid course ID
test('DELETE /admin/courses/{courseid} for invalid input', async (t) => {
    const { got } = t.context;

  const responseInvalid = await got.delete('admin/courses/invalid', {
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(
    responseInvalid.body.message,
    'request.params.courseid should be integer',
    'The error message should match the validation error'
  );
});

// Test for PUT /admin/courses/{courseid} 

//Successfull update of a file from the admin
test('PUT /admin/courses/{courseid} handles successful editing', async (t) => {
  const { got } = t.context;
  const courseid = 101; //valid course ID

  // valid update of a course
  const updatedCourse = {
    title: 'Advanced Mathematics',
    school: 'Science',
    university: 'National University',
    semester: 'Spring 2024',
  };

  const responseSuccess = await got.put('admin/courses/101', {
    json: updatedCourse,
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful editing');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'Course successfully updated', 'The success message should match');
});

//Unsuccessfull update from the admin due to missing title and invalid course ID
test('PUT /admin/courses/{courseid} for invalid input', async (t) => {
  const { got } = t.context;
  const  courseid = 'invalid';
  
  const invalidCourse = {
    title: '',
    school: 'Science',
    university: 'National University',
    semester: 'Spring 2024',
  };

  const responseInvalid = await got.put('admin/courses/invalid', {
    json: invalidCourse,
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(
    responseInvalid.body.message,
    'request.params.courseid should be integer',
    'The error message should match the validation error'
  );
});
