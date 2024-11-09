'use strict';


/**
 * Add file to favourites
 * The user add file to favourite folder 
 *
 * userid Integer The user ID for whom to add file to the favourites folder 
 * fileid Integer The file ID to perform the post oparation. 
 * returns Message
 **/
exports.addFavouriteFile = function(userid,fileid) {
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
 * download file
 * User download a file
 *
 * courseid Integer The courseid in order to get the course object.
 * fileid Integer The fileid of the file
 * returns Message
 **/
exports.downloadFile = function(courseid,fileid) {
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
 * Get Course files
 * Get course files
 *
 * courseid Integer The courseid in order to get the course object.
 * returns FilesArray
 **/
exports.getFiles = function(courseid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "school" : 6,
  "accessStatus" : 1,
  "title" : 0,
  "fileType" : "fileType"
}, {
  "school" : 6,
  "accessStatus" : 1,
  "title" : 0,
  "fileType" : "fileType"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Favourites File Remove
 * The user remove from favourite folder a file 
 *
 * userid Integer The user ID for whom to laod the favourites files. 
 * fileid Integer The file ID to perform the delete oparation. 
 * returns Message
 **/
exports.removeFavouriteFile = function(userid,fileid) {
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
 * File Deletion
 * The user remove from favourite folder a file 
 *
 * userid Integer The user ID in order to remove the favourite files. 
 * fileid Integer The File ID in order to remove the file. 
 * returns Message
 **/
exports.removeUserFile = function(userid,fileid) {
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
 * searches Courses DB
 * Returns arrays of Course objects
 *
 * keyword String Keyword to search for in courseDB.
 * returns CourseArray
 **/
exports.searchCourseDB = function(keyword) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "school" : "school",
  "university" : "university",
  "semester" : "semester",
  "title" : "title",
  "courseid" : 0
}, {
  "school" : "school",
  "university" : "university",
  "semester" : "semester",
  "title" : "title",
  "courseid" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * file upload
 * we send a file object and we get a confirmation message as a response
 *
 * body File  (optional)
 * userid Integer The user ID in order to perform the course search.
 * returns Message
 **/
exports.uploadNewFile = function(body,userid) {
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
 * User Favourites Files
 * Getting the Users Favourites Files 
 *
 * userid Integer The user ID for whom to laod the favourites files. 
 * returns FilesArray
 **/
exports.userFavouritesFiles = function(userid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "school" : 6,
  "accessStatus" : 1,
  "title" : 0,
  "fileType" : "fileType"
}, {
  "school" : 6,
  "accessStatus" : 1,
  "title" : 0,
  "fileType" : "fileType"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * user file editing
 * we send the new charachteristics of the file and we get a comfirmation message as a response
 *
 * body File  (optional)
 * userid Integer The user ID for whom to perform the course search.
 * fileid Integer The file ID for the file will perform the update
 * returns Message
 **/
exports.userFileEditing = function(body,userid,fileid) {
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
 * view Review
 * Submit new review for the file
 *
 * courseid Integer The courseid.
 * returns RatingArray
 **/
exports.viewReview = function(courseid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "author" : "author",
  "review" : "review",
  "starnumber" : 0,
  "reviewid" : 6
}, {
  "author" : "author",
  "review" : "review",
  "starnumber" : 0,
  "reviewid" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * write review
 * We send the fileid of a file and we get a file object as a response
 *
 * body Rating  (optional)
 * courseid Integer The courseid.
 * returns Message
 **/
exports.writeReview = function(body,courseid) {
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

