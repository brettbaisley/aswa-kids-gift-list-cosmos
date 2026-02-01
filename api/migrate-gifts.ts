/**
 * Migration script to set createdBy field for existing gifts
 * Run this once to set all existing gifts to brettbaisley
 */

import { GiftModel } from './dal/gift.model';
import mongoose from 'mongoose';

const COSMOS_DB_CONNECTION_STRING = process.env.CosmosDbConnectionString || '';
const CREATOR_USERNAME = 'brettbaisley';

async function migrateGifts() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(COSMOS_DB_CONNECTION_STRING, {
            readPreference: 'secondaryPreferred',
            retryWrites: false,
        });
        console.log('Connected to database');

        // Find all gifts without a createdBy field
        const giftsToUpdate = await GiftModel.find({
            $or: [
                { createdBy: { $exists: false } },
                { createdBy: null },
                { createdBy: '' }
            ]
        });

        console.log(`Found ${giftsToUpdate.length} gifts to update`);

        if (giftsToUpdate.length === 0) {
            console.log('No gifts need migration');
            await mongoose.disconnect();
            return;
        }

        // Update all gifts to have createdBy set to brettbaisley
        const result = await GiftModel.updateMany(
            {
                $or: [
                    { createdBy: { $exists: false } },
                    { createdBy: null },
                    { createdBy: '' }
                ]
            },
            {
                $set: { createdBy: CREATOR_USERNAME }
            }
        );

        console.log(`✅ Successfully updated ${result.modifiedCount} gifts`);
        console.log(`All existing gifts now have createdBy set to '${CREATOR_USERNAME}'`);

        await mongoose.disconnect();
        console.log('Disconnected from database');
    } catch (error) {
        console.error('❌ Error during migration:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

// Run the migration
migrateGifts();
