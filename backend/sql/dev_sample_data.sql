-- Development schema and seed data (safe to run locally).
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS reservation_technicians;
DROP TABLE IF EXISTS reservation_equipment;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS project_expenses;
DROP TABLE IF EXISTS project_equipment;
DROP TABLE IF EXISTS project_technicians;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS maintenance_requests;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS technicians;
DROP TABLE IF EXISTS customers;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE customers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  company VARCHAR(255) DEFAULT NULL,
  notes TEXT,
  tax_id VARCHAR(128) DEFAULT NULL,
  document_url TEXT DEFAULT NULL,
  document_path VARCHAR(512) DEFAULT NULL,
  document_mime_type VARCHAR(128) DEFAULT NULL,
  document_file_name VARCHAR(255) DEFAULT NULL,
  document_size BIGINT UNSIGNED DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE technicians (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  specialization VARCHAR(255) DEFAULT NULL,
  department VARCHAR(255) DEFAULT NULL,
  daily_wage DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  notes TEXT,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE equipment (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(255) DEFAULT NULL,
  subcategory VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255) DEFAULT NULL,
  description TEXT,
  quantity INT NOT NULL DEFAULT 0,
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  barcode VARCHAR(100) DEFAULT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'available',
  image_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_code VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) DEFAULT NULL,
  client_id BIGINT UNSIGNED NOT NULL,
  client_company VARCHAR(255) DEFAULT NULL,
  description TEXT,
  start_datetime DATETIME DEFAULT NULL,
  end_datetime DATETIME DEFAULT NULL,
  apply_tax TINYINT(1) NOT NULL DEFAULT 0,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  discount DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
  company_share_enabled TINYINT(1) NOT NULL DEFAULT 0,
  company_share_percent DECIMAL(8,2) NOT NULL DEFAULT 0,
  company_share_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  equipment_estimate DECIMAL(12,2) NOT NULL DEFAULT 0,
  expenses_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_with_tax DECIMAL(12,2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  paid_percentage DECIMAL(8,2) NOT NULL DEFAULT 0,
  payment_progress_type VARCHAR(20) DEFAULT NULL,
  payment_progress_value DECIMAL(12,2) DEFAULT NULL,
  confirmed TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE project_technicians (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  technician_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (technician_id) REFERENCES technicians(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE project_equipment (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  equipment_id BIGINT UNSIGNED NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE project_expenses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  label VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reservation_code VARCHAR(50) NOT NULL UNIQUE,
  customer_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME DEFAULT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  location VARCHAR(255) DEFAULT NULL,
  notes TEXT,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  project_id BIGINT UNSIGNED DEFAULT NULL,
  discount DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
  apply_tax TINYINT(1) NOT NULL DEFAULT 0,
  paid_status VARCHAR(50) NOT NULL DEFAULT 'unpaid',
  paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  paid_percentage DECIMAL(8,2) NOT NULL DEFAULT 0,
  payment_progress_type VARCHAR(20) DEFAULT NULL,
  payment_progress_value DECIMAL(12,2) DEFAULT NULL,
  confirmed TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservation_equipment (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reservation_id BIGINT UNSIGNED NOT NULL,
  equipment_id BIGINT UNSIGNED NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservation_technicians (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reservation_id BIGINT UNSIGNED NOT NULL,
  technician_id BIGINT UNSIGNED NOT NULL,
  role VARCHAR(100) DEFAULT NULL,
  hours_worked DECIMAL(8,2) NOT NULL DEFAULT 0,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY (technician_id) REFERENCES technicians(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservation_payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reservation_id BIGINT UNSIGNED NOT NULL,
  payment_type VARCHAR(20) NOT NULL,
  value DECIMAL(12,2) DEFAULT NULL,
  amount DECIMAL(12,2) DEFAULT NULL,
  percentage DECIMAL(8,2) DEFAULT NULL,
  note TEXT,
  recorded_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE maintenance_requests (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  equipment_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'open',
  issue TEXT,
  repair_cost DECIMAL(10, 2) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data
INSERT INTO customers (full_name, phone, email, address, company, notes) VALUES
('شركة الأفق الإعلامية', '+966-500-000001', 'info@afuqmedia.sa', 'الرياض - السعودية', 'الأفق الإعلامية', 'عميل دائم لمشاريع الإنتاج'),
('Vision Events', '+966-500-000002', 'contact@visionevents.sa', 'جدة - السعودية', 'Vision Events', 'مهتم بالفعاليات الموسمية');

INSERT INTO technicians (full_name, phone, email, specialization, department, daily_wage, status, notes) VALUES
('سامي العنزي', '+966-501-234567', 'sami@art-ratio.test', 'إضاءة', 'الفريق الميداني', 550, 'active', 'خبير في أنظمة الإضاءة'),
('ليث الحربي', '+966-502-345678', 'laith@art-ratio.test', 'صوتيات', 'الفريق الميداني', 600, 'active', 'فني صوت معتمد'),
('Amina Al Harbi', '+966-503-456789', 'amina@art-ratio.test', 'إدارة مشاريع', 'المكتب', 700, 'active', 'منسقة مشاريع');

INSERT INTO equipment (category, subcategory, name, description, quantity, unit_price, barcode, status, image_url) VALUES
('إضاءة', 'LED Panels', 'Aputure LS 300X', 'مصباح LED عالي السطوع', 8, 4500, 'EQ-LED-300X', 'available', NULL),
('صوت', 'Mixers', 'Yamaha TF1 Mixer', 'جهاز مكساج صوتي رقمي', 4, 12000, 'EQ-AUDIO-TF1', 'available', NULL),
('تصوير', 'Cameras', 'Sony FX6 Camera', 'كاميرا سينمائية كاملة الإطار', 5, 24000, 'EQ-CAM-FX6', 'maintenance', NULL);

INSERT INTO projects (
  project_code,
  title,
  type,
  client_id,
  client_company,
  description,
  start_datetime,
  end_datetime,
  apply_tax,
  payment_status,
  discount,
  discount_type,
  company_share_enabled,
  company_share_percent,
  company_share_amount,
  equipment_estimate,
  expenses_total,
  tax_amount,
  total_with_tax,
  paid_amount,
  paid_percentage,
  payment_progress_type,
  payment_progress_value,
  confirmed
) VALUES
(
  'PRJ-0001',
  'حفل إطلاق منتج',
  'Event',
  1,
  'الأفق الإعلامية',
  'تنظيم وإضاءة حفل إطلاق منتج جديد',
  '2025-09-20 18:00:00',
  '2025-09-21 02:00:00',
  1,
  'partial',
  10,
  'percent',
  1,
  10,
  3500,
  35000,
  5000,
  1750,
  41750,
  20000,
  48.0,
  'amount',
  20000,
  1
);

INSERT INTO project_technicians (project_id, technician_id) VALUES
(1, 1),
(1, 2);

INSERT INTO project_equipment (project_id, equipment_id, quantity) VALUES
(1, 1, 4),
(1, 2, 2);

INSERT INTO project_expenses (project_id, label, amount) VALUES
(1, 'نقل المعدات', 1800.00),
(1, 'تصاريح بلدية', 950.00);

INSERT INTO reservations (
  reservation_code,
  customer_id,
  title,
  start_datetime,
  end_datetime,
  status,
  location,
  notes,
  total_amount,
  project_id,
  discount,
  discount_type,
  apply_tax,
  paid_status,
  paid_amount,
  paid_percentage,
  payment_progress_type,
  payment_progress_value,
  confirmed
) VALUES
('RSV-0001', 1, 'تحضير الحفل الرئيسي', '2025-09-19 10:00:00', '2025-09-19 22:00:00', 'confirmed', 'قاعة الملك فهد للمؤتمرات', 'تحضير المسرح والإضاءة', 28000, 1, 0, 'percent', 1, 'partial', 12000, 42.86, 'amount', 12000, 1),
('RSV-0002', 2, 'فعالية ترويجية صغيرة', '2025-10-01 09:00:00', '2025-10-01 18:00:00', 'pending', 'فندق الهيلتون', 'عرض صوتي وضوئي بسيط', 12000, NULL, 0, 'percent', 0, 'unpaid', 0, 0, 'percent', NULL, 0);

INSERT INTO reservation_payments (reservation_id, payment_type, value, amount, percentage, note, recorded_at) VALUES
(1, 'amount', 12000, 12000, 42.86, 'دفعة مقدمة من العميل', '2025-08-30 12:00:00');

INSERT INTO reservation_equipment (reservation_id, equipment_id, quantity, unit_price, notes) VALUES
(1, 1, 4, 4500, 'تركيب كامل مع مشغل'),
(1, 2, 1, 12000, NULL),
(2, 2, 1, 12000, NULL);

INSERT INTO reservation_technicians (reservation_id, technician_id, role, hours_worked) VALUES
(1, 1, 'Lead Lighting', 12),
(1, 2, 'Audio Engineer', 10),
(2, 3, 'Coordinator', 8);

INSERT INTO maintenance_requests (equipment_id, status, issue, repair_cost) VALUES
(3, 'open', 'فحص الكاميرا قبل الإرجاع للعميل', NULL);
