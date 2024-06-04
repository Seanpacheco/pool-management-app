SELECT * FROM chem_log
WHERE installation_id = $1
ORDER BY created_at DESC