import { query } from "../utils/database.js"

export const createproduct = async (product_name, packing, units_in_case) => {
    const result = await query(
        "INSERT INTO products (product_name, packing, units_in_case) VALUES ($1,$2,$3) RETURNING *",[product_name, packing, units_in_case]
    )
    return result.rows[0];
}

export const deleteproduct = async (id) => {
    const result = await query(
        "DELETE FROM products WHERE product_id=$1 RETURNING *",[id]
    )
    return result.rows[0];
}

export const updateproduct = async (id, product_name, packing, units_in_case) => {
    const result = await query(
        "UPDATE products SET product_name=$2, packing=$3, units_in_case=$4 where product_id = $1 RETURNING *",[id,product_name,packing,units_in_case]
    )
    return result.rows[0];
}

export const getproduct = async () => {
    const result = await query(
        "SELECT * FROM products ORDER BY product_name ASC"
    )

    return result.rows;
}
