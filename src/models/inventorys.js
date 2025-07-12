import { query } from "../utils/database.js"

export const createinventory = async (product_id, godown_id, quantity) => {
    const result = await query(
        "INSERT INTO inventorys (product_id, godown_id, quantity) VALUES ($1,$2,$3) RETURNING *",[product_id, godown_id, quantity]
    )
    return result.rows[0];
}

export const deleteinventory = async (id) => {
    const result = await query(
        "DELETE FROM inventorys WHERE inventory_id=$1 RETURNING *",[id]
    )
    return result.rows[0];
}

export const updateinventory = async (product_id, godown_id, quantity) => {
    const result = await query(
        "UPDATE inventorys SET quantity=$3 where product_id = $1 AND godown_id=$2 RETURNING *",[product_id, godown_id, quantity]
    )
    return result.rows[0];
}

export const getinventory = async () => {
    const result = await query(
        "SELECT * FROM inventorys ORDER BY inventory_id ASC"
    )

    return result.rows;
}

export const getinventorybyid = async (product_id,godown_id) => {
    const result = await query(
        "SELECT * FROM inventorys WHERE product_id=$1 AND godown_id=$2",[product_id,godown_id]
    )
    
    return result.rows;
}
