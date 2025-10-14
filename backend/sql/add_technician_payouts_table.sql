CREATE TABLE IF NOT EXISTS technician_payouts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    technician_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    note TEXT NULL,
    paid_at DATETIME NOT NULL,
    recorded_by INT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_technician_payouts_technician FOREIGN KEY (technician_id) REFERENCES technicians(id) ON DELETE CASCADE,
    CONSTRAINT fk_technician_payouts_user FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_technician_payouts_technician_paid_at (technician_id, paid_at)
);
