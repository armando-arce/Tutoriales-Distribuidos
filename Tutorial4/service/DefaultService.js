'use strict';


/**
 * Delete a book by ID.
 *
 * bookId String 
 * no response value expected for this operation
 **/
exports.booksBookIdDELETE = function(bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a book by ID.
 *
 * bookId String 
 * returns Book
 **/
exports.booksBookIdGET = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "copyright" : "2015",
  "pages" : "1054",
  "author" : "Silbertzhz",
  "edition" : "4th",
  "publisher" : "Mc Graw Hill",
  "language" : "ENGLISH",
  "title" : "Database System",
  "bookId" : "book01"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update book information
 *
 * body Book Book data
 * bookId String 
 * no response value expected for this operation
 **/
exports.booksBookIdPUT = function(body,bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a new book
 *
 * body Book Book data
 * no response value expected for this operation
 **/
exports.booksPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

