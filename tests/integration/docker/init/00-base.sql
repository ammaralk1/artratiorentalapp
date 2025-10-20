-- Load core schema and sample data
SOURCE /docker-entrypoint-initdb.d/base/auth_schema.sql;
SOURCE /docker-entrypoint-initdb.d/base/dev_sample_data.sql;
