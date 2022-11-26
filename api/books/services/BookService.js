const { ReadPreference } = require("mongodb");
const { BookModel } = require("../models/Book");

class BookService {

    static async getBooks() {
        return await BookModel.find({}).read(ReadPreference.NEAREST).exec();
    }

    static async getBook(bookId) {
        return await BookModel.findById(bookId).read(ReadPreference.NEAREST).exec();
    }

    static async addBook(data) {
        return await BookModel.create(data);
        //return await BookModel.create( {"title": "New Title", "genre": "fake news"})
        
    }

    static async updateBook(bookId, data) {
        return await BookModel.findByIdAndUpdate(bookId, data).exec();
    }

    static async deleteBook(bookId) {
        return await BookModel.deleteOne({_id: bookId}).exec();
    }
}

module.exports = BookService;
