'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService');

/**
 * Admin Course Editing
 * We send the new characteristics of the course and receive a  confirmation message as a response. 
 *
 * body Course  (optional)
 * courseid Integer The ID of the course that the admin is going to edit. 
 * returns Message
 **/
module.exports.adminCourseEditing = function adminCourseEditing(_, res, next, body, courseid) {
  Admin.adminCourseEditing(body, courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
    
  next();
};

/**
 * Admin file Deletion
 * Admin removes a file
 *
 * courseid Integer The courseid in order to get the course object.
 * returns Message
 **/
module.exports.adminRemoveCourse = function adminRemoveCourse(_, res, next, courseid) {
  Admin.adminRemoveCourse(courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

  next();
};
