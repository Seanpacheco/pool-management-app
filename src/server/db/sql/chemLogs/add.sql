/* 
  Adds a new chem log to the database
*/
INSERT INTO chem_log(installation_id, log_date, sanitizer_level, sanitizer_type, ph_level, alkalinity_level, calcium_level, total_dissolved_solids_level, cynauric_acid_level)
VALUES(${installation_id}, ${log_date}, ${sanitizer_level}, ${sanitizer_type}, ${ph_level}, ${alkalinity_level}, ${calcium_level}, ${total_dissolved_solids_level}, ${cynauric_acid_level})
RETURNING *;