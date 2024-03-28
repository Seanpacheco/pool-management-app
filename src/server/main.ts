import express, { Request } from 'express';
import ViteExpress from 'vite-express';
import { validateAccessToken } from './middleware/auth0.middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { db } from './db/connection';
import { account } from '@/client/types/Account';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors<Request>());

// app.use(
//   auth({
//     issuerBaseURL: domain,
//     audience: audience,
//   }),
// );

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

app.post('/api/v1/accounts', validateAccessToken, (req, res) => {
  console.log('adding account');
  db.accounts.add({
    user_id: req.auth?.payload.sub,
    account_name: req.body.data.account_name,
    email: req.body.data.email,
    phone: req.body.data.phone,
  });
  res.status(200);
});

app.get('/api/v1/accounts', validateAccessToken, async (req, res) => {
  console.log('getting accounts');
  console.log(req.auth?.payload);
  try {
    const user = await db.users.findOrAdd(req.auth?.payload.sub);
    console.log(user.user_id);
    const data = await db.accounts.find(user?.user_id);
    console.log(data);
    res.status(200).json({
      data: [data],
      status: 'success',
    });
  } catch (e) {
    console.log(e);
  }

  // res.status(200).json({
  //   status: 'success',
  //   // data: data,

  //   // data: [
  //   //   {
  //   //     id: '1',
  //   //     name: 'Alex Santos',
  //   //     state: 'HI',
  //   //     sites: 3,
  //   //   },
  //   //   {
  //   //     id: '2',
  //   //     name: 'Viva Wittman',
  //   //     state: 'HI',
  //   //     sites: 4,
  //   //   },
  //   //   {
  //   //     id: '3',
  //   //     name: 'Cliff Pacheco',
  //   //     state: 'HI',
  //   //     sites: 1,
  //   //   },
  //   //   {
  //   //     id: '4',
  //   //     name: 'Dywane Wade',
  //   //     state: 'HI',
  //   //     sites: 5,
  //   //   },
  //   // ],
  // });
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening on port 3000...'));
