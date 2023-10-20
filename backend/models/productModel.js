import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:String,
        required:[true,"Please enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 Characters"]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    for:{
       type:String,
       required:true
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock Cannot Exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
       {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            //required: true,
          },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
       }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //required: true,
      },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Product",productSchema)