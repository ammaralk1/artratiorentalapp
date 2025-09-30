-- Adds persistent preferences per user, including theme selection

CREATE TABLE IF NOT EXISTS user_preferences (
    user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    language ENUM('ar', 'en') NOT NULL DEFAULT 'ar',
    theme ENUM('light', 'dark') NOT NULL DEFAULT 'light',
    dashboard_tab VARCHAR(64) DEFAULT NULL,
    dashboard_sub_tab VARCHAR(64) DEFAULT NULL,
    projects_tab VARCHAR(64) DEFAULT NULL,
    projects_sub_tab VARCHAR(64) DEFAULT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_preferences_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
