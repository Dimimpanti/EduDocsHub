'use strict';


/**
 * Add file to favourites
 * The user add file to favourite folder 
 *
 * userid Integer The user ID for whom to add file to the favourites folder 
 * fileid Integer The file ID to perform the post oparation. 
 * returns Message
 **/
exports.addFavouriteFile = function (userid, fileid) {
  return new Promise((resolve, reject) => {
    if (isNaN(userid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'Invalid user ID or file ID',
      });
      return;
    }
    const success = true; // Replace with actual logic

    if (success) {
      resolve({
        code: 200,
        text: 'File added to favourites',
      });
    } else {
      reject({
        code: 500,
        message: 'Failed to add file to favourites',
      });
    }
  });
};

/**
 * download file
 * User downloads a file
 *
 * courseid Integer The course ID to retrieve the course object.
 * fileid Integer The file ID to retrieve the file
 * returns Message
 **/
exports.downloadFile = function (courseid, fileid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'Invalid course ID or file ID',
      });
      return;
    }

    const existingFiles = [
      { courseid: 1, fileid: 101, text: 'File successfully retrieved' },
      { courseid: 1, fileid: 102, text: 'File successfully retrieved' },
    ];

    const file = existingFiles.find(
      (f) => f.courseid === courseid && f.fileid === fileid
    );

    if (!file) {
      reject({
        code: 404,
        message: 'File not found',
      });
      return;
    }

    // Επιτυχής λήψη
    resolve({
      code: 200,
      text: file.text,
    });
  });
};


/**
 * Get Course files
 * Get course files
 *
 * courseid Integer The courseid in order to get the course object.
 * returns FilesArray
 **/
exports.getFiles = function (courseid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid)) {
      reject({
        code: 400,
        message: 'Invalid course ID',
      });
      return;
    }

    // Παράδειγμα δεδομένων
    const courseFiles = {
      1: [
        { fileid: 101, title: 'Lecture 1', fileType: 'pdf', accessStatus: 1 },
        { fileid: 102, title: 'Lecture 2', fileType: 'doc', accessStatus: 0 },
      ],
    };

    // Επιστροφή αρχείων αν υπάρχουν
    if (courseFiles[courseid]) {
      resolve(courseFiles[courseid]);
    } else {
      reject({
        code: 404,
        message: 'Course not found',
      });
    }
  });
};

/**
 * Favourites File Remove
 * The user remove from favourite folder a file 
 *
 * userid Integer The user ID for whom to laod the favourites files. 
 * fileid Integer The file ID to perform the delete oparation. 
 * returns Message
 **/
exports.removeFavouriteFile = function (userid, fileid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(userid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'Invalid user ID or file ID',
      });
      return;
    }

    const existingFiles = [101, 102, 103]; // Παράδειγμα υπαρχόντων αρχείων
    if (!existingFiles.includes(fileid)) {
      reject({
        code: 404,
        message: 'File not found in favourites',
      });
      return;
    }

    resolve({
      text: 'File successfully removed from favourites',
    });
  });
};


/**
 /**
 * File Deletion
 * The user removes a file
 *
 * userid Integer The user ID
 * fileid Integer The File ID
 * returns Message
 **/
 exports.removeUserFile = function (userid, fileid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(userid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'request.params.userid should be integer, request.params.fileid should be integer',
      });
      return;
    }

    const existingFiles = [201, 202, 203]; // Παράδειγμα υπαρχόντων αρχείων
    
    if (!existingFiles.includes(fileid)) {
      
      reject({
        code: 404,
        message: 'File not found',
      });
      return;
    }
    

    // Επιτυχής διαγραφή
    resolve({
      code: 200,
      text: 'File successfully deleted',
    });
  });
};

/**
 * searches Courses DB
 * Returns arrays of Course objects
 *
 * keyword String Keyword to search for in courseDB.
 * returns CourseArray
 **/
exports.searchCourseDB = function (keyword) {
  return new Promise(function (resolve, reject) {
    if (!keyword) {
      reject({
        code: 400,
        message: 'request.query should have required property \'keyword\''
      });
      return;
    }

    // Παράδειγμα δεδομένων αναζήτησης
    const courses = [
      { courseid: 1, title: 'Mathematics', semester: 'Fall', school: 'Science' },
      { courseid: 2, title: 'Physics', semester: 'Spring', school: 'Science' },
    ];

    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(keyword.toLowerCase())
    );

    resolve(filteredCourses);
  });
};


/**
 * file upload
 * we send a file object and we get a confirmation message as a response
 *
 * body File  (optional)
 * userid Integer The user ID in order to perform the course search.
 * returns Message
 **/
exports.uploadNewFile = function (body, userid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(userid)) {
      reject({
        code: 400,
        message: 'Invalid user ID',
      });
      return;
    }

    if (!body || typeof body.title !== 'number' || typeof body.school !== 'number') {
      reject({
        code: 400,
        message: 'Invalid file data provided',
      });
      return;
    }

    resolve({
      text: 'File successfully uploaded',
    });
  });
};



/**
 * User Favourites Files
 * Getting the Users Favourites Files 
 *
 * userid Integer The user ID for whom to laod the favourites files. 
 * returns FilesArray
 **/
exports.userFavouritesFiles = function(userid) {
  return new Promise(function(resolve, reject) {
    if (isNaN(userid)) {
      reject({
        code: 400,
        message: 'request.params.userid should be integer',
      });
      return;
    }

    // Παράδειγμα δεδομένων
    const favourites = {
      1: [
        { fileid: 101, title: 'File 1', school: 'School A', fileType: 'pdf', accessStatus: 1 },
        { fileid: 102, title: 'File 2', school: 'School B', fileType: 'doc', accessStatus: 0 },
      ],
      2: [],
    };

    const userFavourites = favourites[userid];
    if (userFavourites && userFavourites.length > 0) {
      resolve(userFavourites);
    } else {
      reject({
        code: 404,
        message: 'No favourites found for this user',
      });
    }
  });
};

/**
 * user file editing
 * we send the new charachteristics of the file and we get a comfirmation message as a response
 *
 * body File  (optional)
 * userid Integer The user ID for whom to perform the course search.
 * fileid Integer The file ID for the file will perform the update
 * returns Message
 **/
exports.userFileEditing = function(body, userid, fileid) {
  return new Promise(function(resolve, reject) {
    if (!body || !body.title || isNaN(userid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'Invalid user ID, file ID, or request body',
      });
      return;
    }

    resolve({
      text: 'File successfully updated',
    });
  });
};

/**
 * view Review
 * Retrieve reviews for a specific course
 *
 * courseid Integer The courseid.
 * returns RatingArray
 **/
exports.viewReview = function(courseid) {
  return new Promise(function(resolve, reject) {
    if (courseid === 'error') {
      reject({
        code: 500,
        message: 'Simulated unexpected error',
      });
      return;
    }

    const examples = {
      1: [
        {
          author: 'John Doe',
          review: 'Great course!',
          starnumber: 5,
          reviewid: 1,
        },
      ],
    };

    const data = examples[courseid];
    if (data) {
      resolve(data);
    } else {
      reject({
        code: 404,
        message: 'Course not found',
      });
    }
  });
};

/**
 * write review
 * Add a review for a specific course
 *
 * courseid Integer The course ID
 * body Object The review details
 * returns Message
 **/
exports.writeReview = function (courseid, body) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid)) {
      reject({
        code: 400,
        message: 'Invalid course ID',
      });
      return;
    }

    if (!body || !body.starnumber || !body.author || !body.review) {
      reject({
        code: 400,
        message: 'Invalid review data',
      });
      return;
    }

    // Προσθήκη κριτικής (απλή προσομοίωση)
    const newReview = {
      courseid: courseid,
      starnumber: body.starnumber,
      author: body.author,
      review: body.review,
    };

    // Επιτυχής δημιουργία κριτικής
    resolve({
      code: 201,
      text: 'Review successfully added',
      review: newReview,
    });
  });
};


/**
 * Retrieve specific file for a course
 * Fetch the file details for a given course and file ID.
 *
 * courseid Integer The ID of the course
 * fileid Integer The ID of the file
 * returns Message or Error
 **/
/**
 * Get specific file details for a course
 * Retrieves the details of a specific file associated with a course.
 *
 * courseid Integer The ID of the course
 * fileid Integer The ID of the file
 * returns File
 **/
exports.getCourseFile = function (courseid, fileid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid) || isNaN(fileid)) {
      reject({
        code: 400,
        message: 'request.params.courseid should be integer, request.params.fileid should be integer',
      });
      return;
    }

    // Παράδειγμα υπαρχόντων αρχείων
    const existingFiles = {
      1: [
        { fileid: 101, title: 'Lecture 1', school: 'Engineering', fileType: 'pdf', accessStatus: 'public' },
        { fileid: 102, title: 'Lecture 2', school: 'Engineering', fileType: 'ppt', accessStatus: 'private' },
      ],
    };

    const files = existingFiles[courseid];
    if (!files) {
      reject({
        code: 404,
        message: 'Course not found',
      });
      return;
    }

    const file = files.find((f) => f.fileid === fileid);
    if (!file) {
      reject({
        code: 404,
        message: 'File not found',
      });
      return;
    }

    // Επιτυχής ανάκτηση αρχείου
    resolve({
      code: 200,
      text: 'File successfully retrieved',
      file,
    });
  });
};
