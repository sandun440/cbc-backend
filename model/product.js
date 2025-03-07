import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    productName : {
        type : String,
        required : true
    },
    atlNames : [
        {
            type : String
        }
    ],
    images : [
        {
            type : String
        }
    ],
    price : {
        type : Number
    },
    lastPrice : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const Product = mongoose.model("products", productSchema);

export default Product;