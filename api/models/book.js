const  { Schema, model } = require("mongoose");

const BookSchema = new Schema(
    { title: String },
    { genre: String }
);


module.exports.BookModel = model("Book", BookSchema);