
const cosmos = require('../models/mongo.js');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Connect to the database
    await cosmos.connect(process.env["CosmosDbConnectionString"]);
    books = await cosmos.Books.list();
    context.res.body = books;
}


// export const getAll = async () => {
//     return await BookModel.find({});
// };