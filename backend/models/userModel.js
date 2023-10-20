import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter user name"],
        maxLength:[30,"Name Cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,   
    },
    password: {
        type: String,
        required:[true,"Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"]
    },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})



export default mongoose.model("User",userSchema)