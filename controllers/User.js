'use strict';

// Import the utility functions for writing JSON responses
var utils = require('../utils/writer.js');

// Import the UserService module for handling user-related operations
var User = require('../service/UserService');

/**
 * Add file to favourites
 * The user adds file to favourite folder 
 *
 * userid Integer The user ID for whom to add file to the favourites folder 
 * fileid Integer The file ID to perform the post oparation. 
 **/
module.exports.addFavouriteFile = function addFavouriteFile (_req, res, _, userid, fileid) {
  User.addFavouriteFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * download file
 * User download a file
 *
 * courseid Integer The courseid in order to get the course object.
 * fileid Integer The fileid of the file
 * returns Message
 **/
module.exports.downloadFile = function downloadFile(_req, res, _, courseid, fileid) {
  User.downloadFile(courseid, fileid)
    .then(function (response) {
      utils.writeJson(res, { text: response.text }, response.code);
    })
    .catch(function (error) {
      if (error.code === 404) {
        utils.writeJson(res, { message: error.message }, 404);
      } else if (error.code === 400) {
        utils.writeJson(res, { message: error.message }, 400);
      } else {
        console.error('Unexpected error:', error); 
        utils.writeJson(res, { message: 'Unexpected error occurred' }, 500);
      }
    });
};

/**
 * Get course files
 *
 * courseid Integer The courseid in order to get the course object.
 **/
module.exports.getFiles = function getFiles(_req, res, _, courseid) {
  User.getFiles(courseid)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      if (error.code === 400) {
        utils.writeJson(res, { message: error.message }, 400);
      } else if (error.code === 404) {
        utils.writeJson(res, { message: error.message }, 404);
      } else {
        console.error('Unexpected error:', error);
        utils.writeJson(res, { message: 'Unexpected error occurred' }, 500);
      }
    });
};

/**
 * The user removes from favourite folder a file 
 *
 * userid Integer The user ID for whom to laod the favourites files. 
 * fileid Integer The file ID to perform the delete oparation. 
 **/
module.exports.removeFavouriteFile = function removeFavouriteFile(_req, res, _, userid, fileid) {
  User.removeFavouriteFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      if (error.code === 400) {
        utils.writeJson(res, { message: error.message }, 400);
      } else if (error.code === 404) {
        utils.writeJson(res, { message: error.message }, 404);
      } else {
        console.error('Unexpected error:', error);
        utils.writeJson(res, { message: 'Unexpected error occurred' }, 500);
      }
    });
};

/**
 /**
 * File Deletion
 * The user removes a file
 *
 * userid Integer The user ID
 * fileid Integer The File ID
 **/
module.exports.removeUserFile = function removeUserFile(_req, res, _, userid, fileid) {
  User.removeUserFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, { text: response.text }, response.code);
    })
    .catch(function (error) {
      if (error.code === 404) {
        utils.writeJson(res, error, 404);
      } else if (error.code === 400) {
        utils.writeJson(res, error, 400);
      } else {
        console.error('Unexpected error:', error);
        utils.writeJson(res, { code: 500, message: 'Unexpected error occurred' }, 500);
      }
    });
};

/**
 * searches Courses DB
 * Returns arrays of Course objects
 *
 * keyword String Keyword to search for in courseDB.
 * returns CourseArray
 **/
module.exports.searchCourseDB = function searchCourseDB (_req, res, _, keyword) {
  User.searchCourseDB(keyword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * file upload
 *
 * body File  (optional)
 * userid Integer The user ID in order to perform the course search.
 **/
module.exports.uploadNewFile = function uploadNewFile (_req, res, _, body, userid) {
  User.uploadNewFile(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * User Favourites Files
 * Getting the Users Favourites Files 
 *
 * userid Integer The user ID 
 **/
module.exports.userFavouritesFiles = function userFavouritesFiles (_req, res, _, userid) {
  User.userFavouritesFiles(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * user file editing
 *
 * body File  (optional)
 * userid Integer The user ID for whom to perform the course search.
 * fileid Integer The file ID for the file will perform the update
 **/
module.exports.userFileEditing = function userFileEditing (_req, res, _, body, userid, fileid) {
  User.userFileEditing(body, userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * view Review
 * Retrieve reviews for a specific course
 *
 * courseid Integer The courseid.
 * returns RatingArray
 **/
module.exports.viewReview = function viewReview (_req, res, _, courseid) {
  User.viewReview(courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
module.exports.writeReview = function writeReview (_req, res, _, body, courseid) {
  User.writeReview(body, courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
