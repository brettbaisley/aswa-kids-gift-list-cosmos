import * as db from "../lib/azure-cosmosdb-mongodb";

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        let response = null;
        await db.init();

        response = {
            documentResponse: await db.findItemById(req?.body?.id),
        };

        context.res = {
            body: response,
        };

    } catch (err) {
        context.log(`*** Error throw: ${JSON.stringify(err)}`);
    
        context.res = {
          status: 500,
          body: err,
        };
    }
}