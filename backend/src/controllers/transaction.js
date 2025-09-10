import Transaction from "../models/transaction.js";

export async function addTransaction( req, res ) {
    const { title, amount, date, category } = req.body;

    if(!title || !amount || !category ) {
        return res.status(400).json({ message : "Provide all fields "});
    }

    const newTransaction = new Transaction ( {
        title,
        amount,
        date,
        category
    });

    await newTransaction.save();
    return res.status(201).json(
        { message : "transaction created successfully "},
        newTransaction
    )
}


export async function getTransaction(req, res) {
    const transactions = await Transaction.find();
    return res.status(200).json(transactions);
}


export async function updateTransaction(req, res) {
    const { id } = req.params;
    const { title, amount, date, category } = req.body;

    const updated = await Transaction.findByIdAndUpdate(
        id,
        { title, amount, date, category },
        { new: true }
    );

    if (!updated) {
        return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction updated successfully", updated });
}


export async function deleteTransaction(req, res) {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
        return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json({ message: "Transaction deleted successfully" });
}