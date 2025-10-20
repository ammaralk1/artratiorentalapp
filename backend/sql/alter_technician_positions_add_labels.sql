ALTER TABLE technician_positions
    ADD COLUMN label_ar VARCHAR(150) DEFAULT NULL AFTER name,
    ADD COLUMN label_en VARCHAR(150) DEFAULT NULL AFTER label_ar;

UPDATE technician_positions
SET
    label_ar = CASE
        WHEN name IN ('photographer', 'مصور فوتوغرافي') THEN 'مصور فوتوغرافي'
        WHEN name IN ('videographer', 'مصور فيديو') THEN 'مصور فيديو'
        WHEN name IN ('editor', 'مونتير') THEN 'مونتير'
        WHEN name IN ('director', 'مخرج') THEN 'مخرج'
        WHEN name IN ('dop', 'مدير تصوير') THEN 'مدير تصوير'
        WHEN name IN ('lighting-assistant', 'مساعد إضاءة') THEN 'مساعد إضاءة'
        WHEN name IN ('camera-assistant', 'مساعد كاميرا') THEN 'مساعد كاميرا'
        ELSE name
    END,
    label_en = CASE
        WHEN name IN ('photographer', 'مصور فوتوغرافي') THEN 'Photographer'
        WHEN name IN ('videographer', 'مصور فيديو') THEN 'Videographer'
        WHEN name IN ('editor', 'مونتير') THEN 'Editor'
        WHEN name IN ('director', 'مخرج') THEN 'Director'
        WHEN name IN ('dop', 'مدير تصوير') THEN 'Director of Photography'
        WHEN name IN ('lighting-assistant', 'مساعد إضاءة') THEN 'Lighting Assistant'
        WHEN name IN ('camera-assistant', 'مساعد كاميرا') THEN 'Camera Assistant'
        ELSE name
    END;
