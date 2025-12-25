const serverless = require('serverless-http');
const app = require('../../backend/server');
const { connectDB } = require('../../backend/server');

const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // Prevent Lambda from waiting for MongoDB connection to close
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await connectDB();
    } catch (error) {
        console.error('Database connection failed', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database connection failed' })
        };
    }

    return handler(event, context);
};
