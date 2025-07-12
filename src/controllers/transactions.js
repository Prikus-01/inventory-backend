import { createtransaction, deletetransaction, updatetransaction, gettransaction, gettransactionbyid } from "../models/transactions.js"
import {  createinventory, getinventorybyid, updateinventory } from "../models/inventorys.js"

export const createTransaction = async (req,res) => {
    try {
        const { transaction_type, product_id, godown_id, quantity, reference_number } = req.body;

        //check row exist or not
        const product = await getinventorybyid(product_id,godown_id);

        //row does not exist
        if(product.length === 0){
            const creproduct = await createinventory(product_id,godown_id,0);
        }
        
        //row exist
        if(transaction_type === 'inward'){
            const prod = await getinventorybyid(product_id,godown_id);
            const updatedinventory = await updateinventory(product_id, godown_id, prod[0].quantity+quantity);
        }else{
            const prod = await getinventorybyid(product_id,godown_id);
            const updatedinventory = await updateinventory(product_id, godown_id, prod[0].quantity-quantity);
        }
        
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

        const trans = await gettransactionbyid(id);
        console.log(trans)

        if(trans.transaction_type === 'inward'){
            const prod = await getinventorybyid(trans.product_id,trans.godown_id);
            const updatedinventory = await updateinventory(trans.product_id, trans.godown_id, prod[0].quantity-trans.quantity);
        }else{
            const prod = await getinventorybyid(trans.product_id,trans.godown_id);
            const updatedinventory = await updateinventory(trans.product_id, trans.godown_id, prod[0].quantity+trans.quantity);
        }

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
