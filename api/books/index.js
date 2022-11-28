
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
            body: response,
        };

    } catch(err) {
        context.log(`*** Error throw: ${err}`);
        context.res = {
            status: 500,
            body: err,
        };
    }
}