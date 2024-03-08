import express, { Request } from 'express';
import ViteExpress from 'vite-express';
import { validateAccessToken } from './middleware/auth0.middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

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

app.get('/api/v1/accounts', validateAccessToken, (req, res) => {
  console.log('getting accounts');
  res.status(200).json({
    status: 'success',
    data: [
      {
        id: '1',
        name: 'Alex Santos',
        state: 'HI',
        sites: 3,
      },
      {
        id: '2',
        name: 'Viva Wittman',
        state: 'HI',
        sites: 4,
      },
      {
        id: '3',
        name: 'Cliff Pacheco',
        state: 'HI',
        sites: 1,
      },
      {
        id: '4',
        name: 'Dywane Wade',
        state: 'HI',
        sites: 5,
      },
    ],
  });
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening on port 3000...'));
