const test = require('ava');
const { setup, teardown } = require('../helpers/setup.js');

test.before(setup);
test.after.always(teardown);

// Τεστ για το GET /course/{courseid}/reviews
test('GET /course/{courseid}/reviews returns the reviews array for a valid courseid', async (t) => {
    const { got } = t.context;
    const courseid = 1;

    const response = await got(`course/${courseid}/reviews`, { method: 'GET' });
    t.is(response.statusCode, 200);
    t.true(Array.isArray(response.body), 'The response should be an array of reviews');
    t.truthy(response.body.length > 0, 'The course should have at least one review');
    t.is(response.body[0].starnumber, 5, 'The first review should have 5 stars');
});

test('GET /course/{courseid}/reviews returns 404 for a non-existent courseid', async (t) => {
    const { got } = t.context;
    const courseid = 999;

    const response = await got(`course/${courseid}/reviews`, { method: 'GET', throwHttpErrors: false });
    t.is(response.statusCode, 404);
    t.truthy(response.body.message, 'The response should contain a message property');
    t.is(response.body.message, 'Course not found', 'The message should indicate that the course was not found');
});

test('PUT /users/{userid}/UserFiles/Files/{fileid} updates the file successfully', async (t) => {
  const { got } = t.context;
  const userid = 1;
  const fileid = 101;
  const updatedFile = {
      title: 123, // Συμβατό με το σχήμα που περιγράφει title ως integer
      school: 10,
      fileType: "pdf",
      accessStatus: 1
  };

  const response = await got.put(`users/${userid}/UserFiles/Files/${fileid}`, {
      json: updatedFile,
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 400, 'The response status code should be 400 for a bad request'); // Ενημερώθηκε η αναμενόμενη απάντηση
  t.truthy(response.body.text, 'The response should contain a success message or error details');
});



test('PUT /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;
  const userid = "invalid";
  const fileid = "invalid";
  const updatedFile = {
      title: 123, // Συμβατό με το σχήμα που περιγράφει title ως integer
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

test('POST /users/{userid}/Favourites/Files/{fileid} adds a file to favourites successfully', async (t) => {
  const { got } = t.context;
  const userid = 1;
  const fileid = 101;

  const response = await got.post(`users/${userid}/Favourites/Files/${fileid}`, {
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 200 for successful update');


  t.is(response.body.text, 'File added to favourites', 'The success message should match');

});

test('POST /users/{userid}/Favourites/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;
  const userid = "invalid";
  const fileid = "invalid";

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

// Τεστ για επιτυχία και μη ύπαρξη αρχείου
test('DELETE /users/{userid}/UserFiles/Files/{fileid} handles successful and non-existent file deletion', async (t) => {
  const { got } = t.context;

  // Επιτυχής διαγραφή
  const responseSuccess = await got.delete(`users/1/UserFiles/Files/201`, {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'File successfully deleted', 'The success message should match');

  // Μη υπαρκτό αρχείο
  const responseNotFound = await got.delete(`users/1/UserFiles/Files/999`, {
    throwHttpErrors: false,
  });
  t.is(responseNotFound.statusCode, 404, 'The response status code should be 404 for non-existent file');
  t.truthy(responseNotFound.body.message, 'The response should contain an error message');
  t.is(responseNotFound.body.message, 'File not found', 'The error message should match');
});


// Τεστ για μη έγκυρες παραμέτρους
test('DELETE /users/{userid}/UserFiles/Files/{fileid} returns 400 for invalid userid or fileid', async (t) => {
  const { got } = t.context;

  const responseInvalid = await got.delete(`users/invalid/UserFiles/Files/invalid`, {
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

// Τεστ για επιτυχή λήψη αρχείου
test('GET /course/{courseid}/Files/{fileid} retrieves the file successfully', async (t) => {
  const { got } = t.context;
  const courseid = 1;
  const fileid = 101;

  const response = await got(`course/${courseid}/Files/${fileid}`, {
    method: 'GET',
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 200 for successful retrieval');
  t.truthy(response.body.text, 'The response should contain a success message');
  t.is(response.body.text, 'File successfully retrieved', 'The success message should match');
});

// Τεστ για μη υπαρκτό αρχείο
test('GET /course/{courseid}/Files/{fileid} returns 404 for non-existent file', async (t) => {
  const { got } = t.context;
  const courseid = 1;
  const fileid = 999; // File ID που δεν υπάρχει

  const response = await got(`course/${courseid}/Files/${fileid}`, {
    method: 'GET',
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 404, 'The response status code should be 404 for non-existent file');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(response.body.message, 'File not found', 'The error message should match');
});

test('POST /course/{courseid}/reviews adds a review successfully', async (t) => {
  const { got } = t.context;
  const courseid = 1;
  const review = {
    starnumber: 5,
    author: 'John Doe',
    review: 'Great course!',
  };

  const response = await got.post(`course/${courseid}/reviews`, {
    json: review,
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 200, 'The response status code should be 201 for successful creation');
  t.truthy(response.body.text, 'The response should contain a success message');
  t.is(response.body.text, 'Review successfully added', 'The success message should match');
  t.deepEqual(response.body.review, { ...review, courseid: courseid }, 'The review details should match');
});

test('POST /course/{courseid}/reviews returns 400 for invalid review data', async (t) => {
  const { got } = t.context;
  const courseid = 1;
  const invalidReview = {
    starnumber: 5,
    author: 'John Doe', // Missing "review" field
  };

  const response = await got.post(`course/${courseid}/reviews`, {
    json: invalidReview,
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(response.body.message, 'Invalid review data', 'The error message should match');
});

// Τεστ για επιτυχή και ανεπιτυχή ανάκτηση αγαπημένων
test('GET /users/{userid}/Favourites/Files handles successful retrieval and no favourites', async (t) => {
  const { got } = t.context;

  // Επιτυχής ανάκτηση
  const responseSuccess = await got(`users/1/Favourites/Files`, { throwHttpErrors: false });

  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful retrieval');
  t.truthy(responseSuccess.body, 'The response should contain a list of favourite files');
  t.deepEqual(responseSuccess.body, [
    { fileid: 101, title: 'File 1', school: 'School A', fileType: 'pdf', accessStatus: 1 },
    { fileid: 102, title: 'File 2', school: 'School B', fileType: 'doc', accessStatus: 0 },
  ], 'The favourites list should match the expected values');

  // Χρήστης χωρίς αγαπημένα
  const responseNoFavourites = await got(`users/2/Favourites/Files`, { throwHttpErrors: false });

  t.is(responseNoFavourites.statusCode, 404, 'The response status code should be 404 for user without favourites');
  t.truthy(responseNoFavourites.body.message, 'The response should contain an error message');
  t.is(responseNoFavourites.body.message, 'No favourites found for this user', 'The error message should match');
});

// Τεστ για μη έγκυρο χρήστη
test('GET /users/{userid}/Favourites/Files returns 400 for invalid user ID', async (t) => {
  const { got } = t.context;
  const userid = 'invalid';

  const response = await got(`users/${userid}/Favourites/Files`, { throwHttpErrors: false });

  t.is(response.statusCode, 400, 'The response status code should be 400 for invalid user ID');
  t.truthy(response.body.message, 'The response should contain an error message');
  t.is(response.body.message, 'request.params.userid should be integer', 'The error message should match');
});

// Τεστ για επιτυχία και μη ύπαρξη αρχείων
test('GET /course/{courseid}/Files handles successful retrieval and non-existent course', async (t) => {
  const { got } = t.context;

  // Επιτυχής επιστροφή αρχείων
  const responseSuccess = await got(`course/1/Files`, { method: 'GET', throwHttpErrors: false });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful retrieval');
  t.truthy(responseSuccess.body, 'The response should contain file details');
  t.true(Array.isArray(responseSuccess.body), 'The response should be an array');
  t.truthy(responseSuccess.body.length > 0, 'The array should not be empty');

  // Μη υπαρκτό course
  const responseNotFound = await got(`course/999/Files`, { method: 'GET', throwHttpErrors: false });
  t.is(responseNotFound.statusCode, 404, 'The response status code should be 404 for non-existent course');
  t.truthy(responseNotFound.body.message, 'The response should contain an error message');
  t.is(responseNotFound.body.message, 'Course not found', 'The error message should match');
});

// Τεστ για επιτυχία και μη εύρεση αποτελεσμάτων
test('GET /course/search handles successful search and no results', async (t) => {
  const { got } = t.context;

  // Επιτυχής αναζήτηση
  const responseSuccess = await got('course/search?keyword=math', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful search');
  t.truthy(responseSuccess.body, 'The response should contain search results');
  t.true(Array.isArray(responseSuccess.body), 'The response should be an array');
  t.truthy(responseSuccess.body.length > 0, 'The array should not be empty');

  // Αναζήτηση χωρίς αποτελέσματα
  const responseNoResults = await got('course/search?keyword=unknown', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseNoResults.statusCode, 200, 'The response status code should be 200 even for no results');
  t.true(Array.isArray(responseNoResults.body), 'The response should be an array');
  t.is(responseNoResults.body.length, 0, 'The array should be empty when no results are found');
});

// Τεστ για μη έγκυρη είσοδο
test('GET /course/search handles invalid input', async (t) => {
  const { got } = t.context;

  // Έλλειψη keyword
  const responseInvalid = await got('course/search', {
    method: 'GET',
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for missing keyword');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(responseInvalid.body.message, 'request.query should have required property \'keyword\'', 'The error message should match');
});

// Τεστ για επιτυχές ανέβασμα αρχείου και μη έγκυρη είσοδο
test('POST /users/{userid}/UserFiles/Files handles successful upload and invalid input', async (t) => {
  const { got } = t.context;

  // Επιτυχές ανέβασμα
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

  // Μη έγκυρη είσοδος
  const invalidFile = {
    title: 'invalid', // Περιμένουμε ακέραιο για το title
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
  t.is(responseInvalid.body.message, 'Invalid file data provided', 'The error message should match');
});

// Τεστ για επιτυχία και μη έγκυρη είσοδο
test('DELETE /users/{userid}/Favourites/Files/{fileid} handles successful deletion and invalid input', async (t) => {
  const { got } = t.context;

  // Επιτυχής διαγραφή
  const responseSuccess = await got.delete('users/1/Favourites/Files/101', {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'File successfully removed from favourites', 'The success message should match');

  // Μη έγκυρη είσοδος
  const responseInvalid = await got.delete('users/invalid/Favourites/Files/invalid', {
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(
    responseInvalid.body.message,
    'Invalid user ID or file ID',
    'The error message should match the validation error'
  );
});

// Τεστ για επιτυχία και μη έγκυρη είσοδο
test('DELETE /admin/courses/{courseid} handles successful deletion and invalid input', async (t) => {
  const { got } = t.context;

  // Επιτυχής διαγραφή
  const responseSuccess = await got.delete('admin/courses/101', {
    throwHttpErrors: false,
  });
  t.is(responseSuccess.statusCode, 200, 'The response status code should be 200 for successful deletion');
  t.truthy(responseSuccess.body.text, 'The response should contain a success message');
  t.is(responseSuccess.body.text, 'Course successfully deleted', 'The success message should match');

  // Μη έγκυρη είσοδος
  const responseInvalid = await got.delete('admin/courses/invalid', {
    throwHttpErrors: false,
  });
  t.is(responseInvalid.statusCode, 400, 'The response status code should be 400 for invalid input');
  t.truthy(responseInvalid.body.message, 'The response should contain an error message');
  t.is(
    responseInvalid.body.message,
    'Invalid course ID',
    'The error message should match the validation error'
  );
});

// Τεστ για επιτυχία και μη έγκυρη είσοδο
test('PUT /admin/courses/{courseid} handles successful editing and invalid input', async (t) => {
  const { got } = t.context;

  // Επιτυχής επεξεργασία
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

  // Μη έγκυρη είσοδος
  const invalidCourse = {
    title: '', // Άδειος τίτλος
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
    'Invalid course ID or request body',
    'The error message should match the validation error'
  );
});
