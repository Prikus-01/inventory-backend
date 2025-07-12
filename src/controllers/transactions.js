import { createtransaction, deletetransaction, updatetransaction, gettransaction } from "../models/transactions.js"

export const createTransaction = async (req,res) => {
    try {
        const { transaction_type, product_id, godown_id, quantity, reference_number } = req.body;
        
        const result = await createtransaction(transaction_type, product_id, godown_id, quantity, reference_number );
        
        if(!result) {
            res.status(404).json({status: 404 , message : "error in creating Traansaction."})
        }

        res.status(200).json({ status : 200 , data : result});
    } catch (error) {
        console.log("error in /createTransaction route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const deleteTransaction = async (req,res) => {
    try {
        const { id } = req.params;

        const result = await deletetransaction(id);

        if(!result){
            res.status(404).json({ status : 404 , message : "Traansaction not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /deleteTransaction route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const updateTransaction = async (req,res) => {
    try {
        const { id } = req.params;
        const { transaction_type, product_id, godown_id, quantity, reference_number } = req.body;

        const result = await updatetransaction(id, transaction_type, product_id, godown_id, quantity, reference_number);

        if(!result){
            res.status(404).json({ status : 404 , message : "Transaction not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /updateTransaction route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const getTransaction = async (req,res) => {
    try {
        const result = await gettransaction();

        if(!result){
            res.status(404).json({ status : 404 , message : "Transactions not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /getTransaction route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}
