ALTER TABLE reservation_technicians
    ADD COLUMN notes TEXT NULL;

ALTER TABLE reservation_equipment
    MODIFY COLUMN notes TEXT NULL;
