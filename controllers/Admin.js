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
module.exports.adminCourseEditing = function adminCourseEditing(req, res, next, body, courseid) {
  Admin.adminCourseEditing(body, courseid)
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
 * Admin file Deletion
 * Admin removes a file
 *
 * courseid Integer The courseid in order to get the course object.
 * returns Message
 **/
module.exports.adminRemoveCourse = function adminRemoveCourse(req, res, next, courseid) {
  Admin.adminRemoveCourse(courseid)
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
