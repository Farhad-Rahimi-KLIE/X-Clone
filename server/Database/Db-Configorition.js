const mongoose = require('mongoose');

const ConnectDB = async  ()=>{
    try {
        const ConnectionInstanse = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log(`MongoDB Connected !! DB Host: ${ConnectionInstanse.connection.host}`);
    } catch (error) {
        console.log('MongoDB Connection Error.', error)
        process.exit(1)
    }
}

module.exports = ConnectDB;