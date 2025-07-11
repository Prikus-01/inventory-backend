import { deletegodown, createGodowns, updategodown ,getgodowns } from "../models/godowns.js";

export const getGodowns = async (req,res) => {
    try {
        const result = await getgodowns();

        if(!result) {
            res.status(404).json({ status: 404, message : "error in finding godowns" })
        }

        res.status(200).json({ status : 200 , number_of_godowns : result.length , data : result});
    } catch (error) {
        console.log("error in /getGodowns route" , error);
        res.status(500).json({error: "Internal server error" });
    }
};

export const updateGodown = async (req,res) => {
    try {
        const { id } = req.params;
        const { godown_name } = req.body;
        const result = await updategodown(id, godown_name);

        if (!result) {
            return res.status(404).json({ status: 404, error: "Godown not found" });
        }

        res.status(200).json({ status: 200, message: "updated successfully!", updated: result });
    } catch (error) {
        console.log("error in /updateGodowns route" , error);
        res.status(500).json({error: "Internal server error" });
    }
};

export const deleteGodown = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deletegodown(id);

        if (!result) {
            return res.status(404).json({ status: 404, error: "Godown not found" });
        }

        res.status(200).json({ status: 200, message: "Deleted successfully!", deleted: result });
    } catch (error) {
        console.error("Error in /deleteGodowns route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const createGodown = async (req, res) => {
    try {
        const { godown_name } = req.body;
        
        const result = await createGodowns(godown_name);

        if(!result) {
            res.status(404).json({ status: 404 , message : "error in creating godown" })
        }

        console.log(`${result.godown_name} godown created.`)

        res.status(201).json({ status : 201 , data :  result })
    } catch (error) {
        console.log("error in /createGodowns route" , error);
        res.status(500).json({error: "Internal server error" });
    }
};
