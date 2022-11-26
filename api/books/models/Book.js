const  { Schema, model } = require("mongoose");

const BookSchema = new Schema({
    title: {"type": String, "required": true},
    genre: {"type": String, "required": true},
    created: { type: Date, default: Date.now }
});


module.exports.BookModel = model("Book", BookSchema);