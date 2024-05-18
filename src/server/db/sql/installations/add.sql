/* 
  Adds a new installation to the database
*/
INSERT INTO installation(site_id, name, type, shape, length, width, depth, gallons)
VALUES(${site_id}, ${name}, ${type}, ${shape}, ${length}, ${width}, ${depth}, ${gallons})
RETURNING *;