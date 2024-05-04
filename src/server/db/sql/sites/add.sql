/* 
  Adds a new site to the database
*/
INSERT INTO site(account_id, address, postal_code, email, phone)
VALUES(${account_id}, ${address}, ${postal_code}, ${email}, ${phone})
RETURNING *;