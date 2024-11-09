'use strict';


/**
 * Admin Course Editing
 * We send the new characteristics of the course and receive a  confirmation message as a response. 
 *
 * body Course  (optional)
 * courseid Integer The ID of the course that the admin is going to edit. 
 * returns Message
 **/
exports.adminCourseEditing = function(body,courseid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Admin file Deletion
 * Admin removes a file
 *
 * courseid Integer The courseid in order to get the course object.
 * returns Message
 **/
exports.adminRemoveCourse = function(courseid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

