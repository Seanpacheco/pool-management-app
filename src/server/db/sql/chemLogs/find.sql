SELECT * FROM chem_log
WHERE installation_id = $1
AND log_date BETWEEN $2 AND $3
ORDER BY log_date DESC