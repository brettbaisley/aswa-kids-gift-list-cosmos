const mongoose = require("mongoose");
const { BookModel } = require("../models/Book");

class BookService {

    static async connect() {
        return await mongoose.connect(process.env["CosmosDbConnectionString"]);
    }

    static async disconnect() {
        return await mongoose.close();
    }

    static async getBooks() {
        return BookModel.find({}).exec();
    }

    static async getBook(bookId) {
        return BookModel.findById(bookId).exec();
    }

    static async create(data) {
        const book = new BookModel(data);
        return book.save();
    }

    static async update(bookId, data) {
        return BookModel.findByIdAndUpdate(bookId, data).exec();
    }

    static async delete(bookId) {
        return BookModel.deleteOne({_id: bookId}).exec();
    }
}

module.exports = BookService;
