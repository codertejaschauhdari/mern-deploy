const  mongoose  = require("mongoose");

async function connectMongoDb(URL){
    try {
        const conn = await mongoose.connect(URL)
       console.log("mongo db connected ", conn.connection.host)
            
    } catch (error) {
        console.log("conenction error",error);
        process.exit(1)
    }
   
}

module.exports ={ connectMongoDb};
