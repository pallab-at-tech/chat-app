const mongoose = require('mongoose')

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("Connect DB")

    } catch (error) {
        console.log("Mongodb connect error ",error);
        process.exit(1);
    }
    
}

module.exports = connectDB