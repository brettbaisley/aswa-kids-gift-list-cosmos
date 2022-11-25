const  { Schema, model } = require("mongoose");

const BookSchema = new Schema(
    { title: {type: String, required: true} },
    { genre: {type: String, required: true} }
);


module.exports.BookModel = model("Book", BookSchema);