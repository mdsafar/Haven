import app from "./app.js"
import 'dotenv/config'
import {v2 as cloudinary} from "cloudinary"
import ConnectDatabase from "./config/database.js"

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  

ConnectDatabase();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running at https://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  