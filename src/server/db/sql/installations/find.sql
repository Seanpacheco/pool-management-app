SELECT * FROM installation
WHERE site_id = $1
ORDER BY created_at DESC