'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService');

module.exports.adminCourseEditing = function adminCourseEditing (req, res, next, body, courseid) {
  Admin.adminCourseEditing(body, courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminRemoveCourse = function adminRemoveCourse (req, res, next, courseid) {
  Admin.adminRemoveCourse(courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
