import { query } from "../utils/database.js"

export const deletegodown = async (id) => {
    const result = await query(
        "DELETE FROM godowns WHERE godown_id = $1 RETURNING *",[id]
    )
    return result.rows[0];
}

export const updategodown = async (id, godown_name) => {
    const result = await query(
        "UPDATE godowns SET godown_name=$2 where godown_id = $1 RETURNING *",[id, godown_name]
    )
    return result.rows[0];
}

export const createGodowns = async (godown_name) =>{
    const result = await query(
        "INSERT INTO Godowns (godown_name) VALUES ($1) RETURNING *",[godown_name]
    )
    return result.rows[0];
}

export const getgodowns = async () => {
    const result = await query(
        "SELECT * FROM public.godowns ORDER BY godown_name ASC"
    )
    return result.rows;
}