/* 
  Adds a new account to the database
*/
INSERT INTO account(user_id, account_name, email, phone)
VALUES(${user_id}, ${account_name}, ${email}, ${phone})
RETURNING *;