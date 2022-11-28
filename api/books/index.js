
const mongoose = require("mongoose");
const BookService = require('./services/BookService.js');

module.exports = async function (context, req) {
    context.log('Starting API call...');

    try {
        let response = null;
        const bookId = context.bindingData.bookId;
        context.log(`Book ID: ${bookId}`)

        // Create database connection
        mongoose.connect(process.env["CosmosDbConnectionString"]);

        switch(req.method) {
            case "GET":
                if (bookId) {
                    response = await BookService.getBook(bookId);
                } else {
                    response = await BookService.getBooks();
                }
            break;

            case "POST":
                if (req?.body?.document) {
                    const insertBook = await BookService.addBook(req?.body?.document)
                    response = insertBook;
                } else {
                    throw Error("No document found")
                };
            break;

            case "PUT":
                if (req?.body?.document) {
                    const updateBook = await BookService.updateBook(bookId, req?.body?.document)
                    response = updateBook;
                } else {
                    throw Error("No document found")
                };
            break;

            case "DELETE":
                if (bookId) {
                    response = await BookService.deleteBook(bookId);                    
                } else {
                    throw Error("No bookId specified to delete")
                }
        }

        context.res = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify([
                {
                  "_id": "63820f418b1cf13e201e58a8",
                  "title": "War and Peace",
                  "genre": "Historical",
                  "created": "2022-11-26T13:06:09.604Z",
                  "__v": 0
                },
                {
                  "_id": "63820f718b1cf13e201e58aa",
                  "title": "The Great Gatsby, Volume 1",
                  "genre": "Fiction",
                  "created": "2022-11-26T13:06:57.105Z",
                  "__v": 0
                },
                {
                  "_id": "63820f748b1cf13e201e58ac",
                  "title": "The Great Gatsby, Volume 2",
                  "genre": "Fiction",
                  "created": "2022-11-26T13:07:00.751Z",
                  "__v": 0
                },
                {
                  "_id": "63820f8f8b1cf13e201e58ae",
                  "title": "Thomas the Train.",
                  "genre": "Children",
                  "created": "2022-11-26T13:07:27.490Z",
                  "__v": 0
                }
              ]),
        };

    } catch(err) {
        context.log(`*** Error throw: ${err}`);
        context.res = {
            status: 500,
            body: err,
        };
    }
}