CREATE TABLE IF NOT EXISTS blog_comments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_slug VARCHAR(255) NOT NULL,
    author_name VARCHAR(120) NOT NULL,
    author_email VARCHAR(190) NULL,
    content TEXT NOT NULL,
    content_hash CHAR(64) NOT NULL,
    status ENUM('pending','approved','rejected','spam') NOT NULL DEFAULT 'approved',
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_blog_comments_post_status_date (post_slug, status, created_at),
    INDEX idx_blog_comments_email_date (author_email, created_at),
    INDEX idx_blog_comments_ip_date (ip_address, created_at),
    INDEX idx_blog_comments_dedupe (post_slug, author_email, content_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
