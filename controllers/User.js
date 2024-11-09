'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.addFavouriteFile = function addFavouriteFile (req, res, next, userid, fileid) {
  User.addFavouriteFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.downloadFile = function downloadFile (req, res, next, courseid, fileid) {
  User.downloadFile(courseid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFiles = function getFiles (req, res, next, courseid) {
  User.getFiles(courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeFavouriteFile = function removeFavouriteFile (req, res, next, userid, fileid) {
  User.removeFavouriteFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeUserFile = function removeUserFile (req, res, next, userid, fileid) {
  User.removeUserFile(userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchCourseDB = function searchCourseDB (req, res, next, keyword) {
  User.searchCourseDB(keyword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadNewFile = function uploadNewFile (req, res, next, body, userid) {
  User.uploadNewFile(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userFavouritesFiles = function userFavouritesFiles (req, res, next, userid) {
  User.userFavouritesFiles(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userFileEditing = function userFileEditing (req, res, next, body, userid, fileid) {
  User.userFileEditing(body, userid, fileid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewReview = function viewReview (req, res, next, courseid) {
  User.viewReview(courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.writeReview = function writeReview (req, res, next, body, courseid) {
  User.writeReview(body, courseid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
