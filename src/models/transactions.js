import { query } from "../utils/database.js"

export const createtransaction = async (transaction_type, product_id, godown_id, quantity, reference_number) => {
    const result = await query(
        "INSERT INTO transactions (transaction_type, product_id, godown_id, quantity, reference_number) VALUES ($1,$2,$3,$4,$5) RETURNING *",[transaction_type, product_id, godown_id, quantity, reference_number]
    )
    return result.rows[0];
}

export const deletetransaction = async (id) => {
    const result = await query(
        "DELETE FROM transactions WHERE transactions_id=$1 RETURNING *",[id]
    )
    return result.rows[0];
}

export const updatetransaction = async (id, transaction_type, product_id, godown_id, quantity, reference_number) => {
    const result = await query(
        "UPDATE transactions SET transaction_type=$2, product_id=$3, godown_id=$4, quantity=$5, reference_number=$6 where transactions_id = $1 RETURNING *",[id, transaction_type, product_id, godown_id, quantity, reference_number]
    )
    return result.rows[0];
}

export const gettransaction = async () => {
    const result = await query(
        "SELECT * FROM transactions ORDER BY transactions_id ASC"
    )

    return result.rows;
}

export const gettransactionbyid = async (id) => {
    const result = await query(
        "SELECT * FROM transactions WHERE transactions_id=$1",[id]
    )

    return result.rows[0];
}
