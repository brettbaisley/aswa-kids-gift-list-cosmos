const mongoose = require("mongoose");
const BookService = require('./services/BookService.js');

module.exports = async function (context, req) {
    context.log('Starting API call...');

    try {
        let response = null;
        const bookId = context.bindingData.bookId;

        // Create database connection
        await mongoose.connect(process.env["CosmosDbConnectionString"]);

        switch(req.method) {
            case "GET":
                if (bookId) {
                    response = {
                        documentResponse: await BookService.getBook(bookId)
                    };
                } else {
                    response = {
                        documentResponse: await BookService.getBooks()
                    };
                }
            break;

            case "POST":
                if (req?.body?.document) {
                    const insertBook = await BookService.addBook(req?.body?.document)
                    response = {
                        documentResponse: insertBook
                    }
                } else {
                    throw Error("No document found")
                };
            break;

            case "PUT":
                ///FILL THIS IN
            break;

            case "DELETE":
                if (bookId) {
                    response = {
                        deleteResponse: await BookService.deleteBook(bookId)
                    }
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





    // const bookId = context.bindingData.bookId.trim();
    // context.log(`BookID found: ${bookId}`)

    // // Create DB connection
    // try {
        
    // } catch(err) {
    //     context.log(`Unable to connect to database: ${err}`);
    //     context.res.body = `Unable to connect to database: ${err}`;
    // }

    // // Get all books, or one specified book

    // if (bookId) {
    //     try {
    //         const book = await BookService.getBook(bookId);
    //         context.res.body = book;
    //     } catch(err) {
    //         context.log(`Unable to get book (${bookId}): ${err}`);
    //         context.res.body = `Unable to get book (${bookId}): ${err}`;
    //     } finally {
    //         await mongoose.connection.close();
    //     }
    // } else {
    //     try {
    //         const books = await BookService.getBooks();
    //         context.res.body = books;
    //     } catch(err) {
    //         context.log(`Unable to get all books: ${err}`);
    //         context.res.body = `Unable to get all books: ${err}`;
    //     } finally {
    //         await mongoose.connection.close();
    //     }
    // }

    // // TODO: Add routes


}