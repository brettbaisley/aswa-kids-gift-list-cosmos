const { connect, default: mongoose } = require("mongoose");
const { BookModel } = require("./book.js");

let db=null;



const Books = {
    list: async() => {
        return await BookModel.find({}).exec();
    }
}

module.exports = {
    connect: async (conn) => {
        await mongoose.connect(conn)
    },
    Books
}