const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((con)=>{
            console.log(`Connected to database : ${con.connection.host}`);
        })
        .catch((err)=>{
            console.error(`Connection failed with error : ${err}`);
        })
}
