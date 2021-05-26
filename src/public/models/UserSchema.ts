import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        Username: {
            type: String
        },
        name: {
            type: String
        },
        lname:{
            type: String
        },
        email:{
            type: String
        },
        password:{
            type: String
        },
        msg:{
            type: Array
        }

    }
    );

let User = mongoose.model("user", UserSchema);
// module.exports  =  User;
export { User }