import { QueryFile, IQueryFileOptions } from 'pg-promise';
import { join } from 'path';

export const users = {
  find: sql('users/find.sql'),
  add: sql('users/add.sql'),
  create: sql('users/create.sql'),
};

// Helper for linking to external query files;
function sql(file: string): QueryFile {
  const fullPath: string = join(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;
}
