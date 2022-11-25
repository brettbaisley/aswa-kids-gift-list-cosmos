const BookService = require('./services/BookService.js');

module.exports = async function (context, req) {
    context.log('Starting API call...');

    const bookId = context.bindingData.bookId;
    context.log(`BookID found: ${bookId}`)

    // Create DB connection
    try {
        await BookService.connect();
    } catch(err) {
        context.log(`Unable to connect to database: ${err}`);
        context.res.body = `Unable to connect to database: ${err}`;
    }

    // Get all books, or one specified book

    if (bookId) {
        try {
            const book = await BookService.getBook(bookId);
            context.res.body = book;
        } catch(err) {
            context.log(`Unable to get book (${bookId}): ${err}`);
            context.res.body = `Unable to get book (${bookId}): ${err}`;
        }
    } else {
        try {
            const books = await BookService.getBooks();
            context.res.body = books;
        } catch(err) {
            context.log(`Unable to get all books: ${err}`);
            context.res.body = `Unable to get all books: ${err}`;
        }
    }

    // TODO: Add routes


}