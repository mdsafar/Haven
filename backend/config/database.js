import mongoose from "mongoose";

const ConnectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.error(err)
    })
}


export default ConnectDatabase;