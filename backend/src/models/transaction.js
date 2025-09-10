import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : true
    },
    date : {
        type : String,
        default : Date.now()
    },
    category : {
        type : String,
        enum : [ "credit", "debit"],
        required : true
    }
}, { timestamps : true });

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;