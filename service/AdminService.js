'use strict';


/**
 * Admin Course Editing
 * We send the new characteristics of the course and receive a  confirmation message as a response. 
 *
 * body Course  (optional)
 * courseid Integer The ID of the course that the admin is going to edit. 
 * returns Message
 **/
exports.adminCourseEditing = function (body, courseid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid) || !body || !body.title || body.title.trim() === '') {
      reject({
        code: 400,
        message: 'Invalid course ID or request body',
      });
      return;
    }

    const existingCourses = [101, 102, 103]; // Παράδειγμα υπαρχόντων μαθημάτων
    // Επιτυχής επεξεργασία
    resolve({
      text: 'Course successfully updated',
    });
  });
};



/**
 * Admin file Deletion
 * Admin removes a file
 *
 * courseid Integer The courseid in order to get the course object.
 * returns Message
 **/
exports.adminRemoveCourse = function (courseid) {
  return new Promise(function (resolve, reject) {
    if (isNaN(courseid)) {
      reject({
        code: 400,
        message: 'Invalid course ID',
      });
      return;
    }

    const existingCourses = [101, 102, 103]; // Παράδειγμα υπαρχόντων μαθημάτων
    // Επιτυχής διαγραφή
    resolve({
      text: 'Course successfully deleted',
    });
  });
};