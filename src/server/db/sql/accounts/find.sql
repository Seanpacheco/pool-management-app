/*
    Finds accounts by user id.
*/
SELECT * FROM account
WHERE user_id = $1
ORDER BY updated_at DESC