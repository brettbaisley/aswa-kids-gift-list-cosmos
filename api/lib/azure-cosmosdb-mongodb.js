import { Schema, model, connect } from "mongoose";

let db=null;

const BookSchema = new Schema(
  { title: String },
  { genre: String }
);
const BookModel = model("Book", BookSchema);

export const init = async () => {
  if(!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};

export const getAll = async () => {
    return await BookModel.find({});
};


// export const addItem = async (doc) => {
//   const modelToInsert = new BookModel();
//   modelToInsert["categoryName"] = doc.name;

//   return await modelToInsert.save();
// };
// export const findItemById = async (id) => {
//   return await BookModel.findById(id);
// };
// export const findItems = async (query = {}) => {
//   return await BookModel.find({});
// };
// export const deleteItemById = async (id) => {
//   return await BookModel.findByIdAndDelete(id);
// };