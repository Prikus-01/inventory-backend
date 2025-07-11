import { createproduct, deleteproduct, updateproduct, getproduct } from "../models/products.js"

export const createProduct = async (req,res) => {
    try {
        const { product_name, packing, units_in_case } = req.body;

        const result = await createproduct(product_name, packing, units_in_case);

        if(!result) {
            res.status(404).json({ status: 404 , message : "error in creating product."})
        }

        res.status(200).json({ status : 200 , data : result});
    } catch (error) {
        console.log("error in /createProduct route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;

        const result = await deleteproduct(id);

        if(!result){
            res.status(404).json({ status : 404 , message : "Product not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /deleteProduct route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const updateProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const { product_name, packing, units_in_case } = req.body;

        const result = await updateproduct(id, product_name, packing, units_in_case);

        if(!result){
            res.status(404).json({ status : 404 , message : "Product not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /updateProduct route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const getProduct = async (req,res) => {
    try {
        const result = await getproduct();

        if(!result){
            res.status(404).json({ status : 404 , message : "Product not found."})
        }

        res.status(200).json({ status: 200, data : result });
    } catch (error) {
        console.log("error in /getProduct route" , error);
        res.status(500).json({error: "Internal server error" });
    }
}