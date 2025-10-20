INSERT INTO users (username, password_hash, role)
VALUES ('integration_admin', '$2y$12$63S8H0nG.o3tAb0kvwPhoeBX/96ssqXMNtla16BqL9AlfviYdF0oW', 'admin')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
