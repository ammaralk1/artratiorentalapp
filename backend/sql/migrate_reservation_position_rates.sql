-- Migration: Snapshot technician position rates inside reservation_technicians
-- Goal: Decouple reservation crew pricing from the global technician positions table

UPDATE reservation_technicians rt
LEFT JOIN technician_positions tp ON (
    (rt.position_id IS NOT NULL AND tp.id = rt.position_id)
    OR (rt.position_id IS NULL AND rt.position_key IS NOT NULL AND tp.name = rt.position_key)
)
SET
    rt.position_cost = CASE
        WHEN (rt.position_cost IS NULL OR rt.position_cost = 0) AND tp.cost IS NOT NULL
            THEN tp.cost
        ELSE rt.position_cost
    END,
    rt.position_client_price = CASE
        WHEN (rt.position_client_price IS NULL OR rt.position_client_price = 0) AND tp.client_price IS NOT NULL
            THEN tp.client_price
        ELSE rt.position_client_price
    END,
    rt.position_name = CASE
        WHEN (rt.position_name IS NULL OR rt.position_name = '')
            THEN COALESCE(tp.label_ar, tp.label_en, tp.name, rt.position_name)
        ELSE rt.position_name
    END,
    rt.position_label_ar = CASE
        WHEN (rt.position_label_ar IS NULL OR rt.position_label_ar = '') AND tp.label_ar IS NOT NULL
            THEN tp.label_ar
        ELSE rt.position_label_ar
    END,
    rt.position_label_en = CASE
        WHEN (rt.position_label_en IS NULL OR rt.position_label_en = '') AND tp.label_en IS NOT NULL
            THEN tp.label_en
        ELSE rt.position_label_en
    END
WHERE tp.id IS NOT NULL
  AND (
        ((rt.position_cost IS NULL OR rt.position_cost = 0) AND tp.cost IS NOT NULL)
     OR ((rt.position_client_price IS NULL OR rt.position_client_price = 0) AND tp.client_price IS NOT NULL)
     OR (rt.position_name IS NULL OR rt.position_name = '')
     OR ((rt.position_label_ar IS NULL OR rt.position_label_ar = '') AND tp.label_ar IS NOT NULL)
     OR ((rt.position_label_en IS NULL OR rt.position_label_en = '') AND tp.label_en IS NOT NULL)
  );
