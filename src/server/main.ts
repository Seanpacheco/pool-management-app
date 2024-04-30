import express, { Request } from 'express';
import ViteExpress from 'vite-express';
import { validateAccessToken } from './middleware/auth0.middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { db } from './db/connection';
import { accountInitializer, accountMutator } from './db/schemas/public/Account';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(cors<Request>());

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

app.post('/api/v1/accounts', validateAccessToken, async (req, res) => {
  console.log('adding account');
  console.log(req.body.account_name);
  const result = accountInitializer.safeParse({
    user_id: req.auth?.payload.sub,
    account_name: req.body.account_name,
    email: req.body.email,
    phone: req.body.phone,
  });
  if (result.success) {
    try {
      const data = await db.accounts.add({
        user_id: req.auth?.payload.sub,
        account_name: req.body.account_name,
        email: req.body.email,
        phone: req.body.phone,
      });
      res.status(200).json({ data: data, status: 'Account added and response sent successfully!' });
      console.log(data);
      console.log('account added');
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

app.delete('/api/v1/accounts/:id', validateAccessToken, async (req, res) => {
  const result = accountMutator.safeParse({
    user_id: req.auth?.payload.sub,
    account_id: req.params.id,
  });
  if (result.success) {
    try {
      const data = await db.accounts.remove(req.params.id);
      console.log('account removed');
      console.log(data);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

app.get('/api/v1/accounts', validateAccessToken, async (req, res) => {
  console.log('getting accounts');
  const result = accountMutator.safeParse({
    user_id: req.auth?.payload.sub,
  });
  if (result.success) {
    try {
      const user = await db.users.findOrAdd(req.auth?.payload.sub);
      console.log(user.user_id);
      const data = await db.accounts.find(user?.user_id);
      res.status(200).json({
        data: data,
        status: 'success',
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening on port 3000...'));

// res.status(200).json({
//   status: 'success',
//   data: [
//     {
//       account_id: '1',
//       account_name: 'Alex Santos',
//       email: 'email@email.com',
//       phone: '18081234567',
//     },
//     {
//       account_id: '2',
//       account_name: 'Viva Wittman',
//       email: 'email@email.com',
//       phone: '18081234567',
//     },
//     {
//       account_id: '3',
//       account_name: 'Cliff Pacheco',
//       email: 'email@email.com',
//       phone: '18081234567',
//     },
//     {
//       account_id: '4',
//       account_name: 'Dywane Wade',
//       email: 'email@email.com',
//       phone: '18081234567',
//     },
//   ],
// });
