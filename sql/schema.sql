-- Create database tables for the social media platform
-- This script creates tables for implemented features only; create tables for like, comment and follow features

CREATE TYPE trans_type AS ENUM ('inward', 'outward');

-- Products table
CREATE TABLE IF NOT EXISTS Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    packing VARCHAR(255) NOT NULL,
    units_in_case INTEGER NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Godowns table
CREATE TABLE IF NOT EXISTS Godowns (
    godown_id SERIAL PRIMARY KEY,
    godown_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventorys table
CREATE TABLE IF NOT EXISTS Inventorys (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES Products(product_id) ON DELETE CASCADE,
    godown_id INTEGER NOT NULL REFERENCES Godowns(godown_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS Transactions (
    transactions_id SERIAL PRIMARY KEY,
    transaction_type trans_type,
    product_id INTEGER NOT NULL REFERENCES Products(product_id) ON DELETE CASCADE,
    godown_id INTEGER NOT NULL REFERENCES Godowns(godown_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    reference_number INTEGER NOT NULL,
    transactions_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update timestamp triggers

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON Products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_godowns_updated_at BEFORE UPDATE ON Godowns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventorys_updated_at BEFORE UPDATE ON Inventorys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON Transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
-- Create indexes for better performance

CREATE INDEX idx_products_name ON Products(product_name);
CREATE INDEX idx_godowns_name ON Godowns(godown_name);
CREATE INDEX idx_inventorys_product_id ON Inventorys(product_id);
CREATE INDEX idx_inventorys_godown_id ON Inventorys(godown_id);
CREATE INDEX idx_transactions_transaction_type ON Transactions(transaction_type);
CREATE INDEX idx_transactions_product_id ON Transactions(product_id);
CREATE INDEX idx_transactions_godown_id ON Transactions(godown_id);
CREATE INDEX idx_transactions_reference_number ON Transactions(reference_number);
