-- File Path: /main page/database.sql
-- Create Database
CREATE DATABASE cyberguard_db;
USE cyberguard_db;

-- 1. Users Table (Updated with Tier support)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    account_tier ENUM('Standard Guard', 'Advanced Guard', 'Elite Guard') DEFAULT 'Standard Guard',
    
    -- In a real passkey system, we store a Public Key credential ID here
    passkey_credential_id VARCHAR(255),
    passkey_public_key TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Scan History Table
CREATE TABLE scan_history (
    scan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    scan_type ENUM('Password', 'URL', 'FileHash') NOT NULL,
    scan_content_hash VARCHAR(255), -- Store hash, never the actual password
    risk_level ENUM('Safe', 'Warning', 'Dangerous') NOT NULL,
    scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. Mock Data (For testing purposes)
INSERT INTO users (full_name, email, account_tier) 
VALUES ('Daniel Karanja', 'dk@cyberguard.com', 'Elite Guard');

INSERT INTO scan_history (user_id, scan_type, scan_content_hash, risk_level)
VALUES 
(1, 'Password', 'hash_of_weak_password', 'Dangerous'),
(1, 'URL', 'hash_of_safe_site', 'Safe');