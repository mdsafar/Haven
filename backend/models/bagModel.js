import mongoose, { Mongoose } from "mongoose";

const bagShema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    }
})

export default mongoose.model('bag',bagShema)