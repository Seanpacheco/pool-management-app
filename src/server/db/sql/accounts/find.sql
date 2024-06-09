/*
    Finds accounts by user id.
*/
SELECT *, count(*) OVER() AS full_count FROM account
WHERE user_id = $1 AND account_name ILIKE $2
ORDER BY updated_at DESC
LIMIT 5 OFFSET $3;