Production Templates (AR/EN)

This folder contains three ready-to-use Excel templates for film/production projects with bilingual headers (Arabic / English):

- ExpensesTemplate.xlsx — Complete budget and expenses tracker with sections, per-line formulas, payment status, vendor and booking references, and a summary tab.
- ShotListTemplate.xlsx — Detailed shot list with technical and logistics columns, filters, and dropdowns.
- CallSheetTemplate.xlsx — Call sheet including header meta, important notes, cast calls, key contacts, and schedule grid.

How to use
- Open any template and Fill the top meta fields (Project, Date, etc.).
- Keep the bilingual headers; add rows as needed (300–400 pre-created rows).
- For Expenses, use the Section column to group lines (e.g., Above the Line, Production Expenses, Post-Production). The Summary sheet totals by Section automatically.
- Currency, Status, and Payment Method columns have dropdowns. You can edit lists from Data Validation in Excel or Google Sheets.
- Line Total and Balance columns are formula-driven. Avoid overwriting formulas.

Importing to Google Sheets
- Upload the .xlsx to Drive and open with Google Sheets. Data validation lists and formulas will carry over.

Regenerating
- Run scripts/generate_production_templates.py to rebuild all templates.

