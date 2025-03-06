import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1741237617~exp=1741241217~hmac=317dc59cde51436c06324058328a30a0fe685776061526f9ecd0a876e373f3db&w=740"
    }
})

const User = mongoose.model("users", userSchema) 

export default User;