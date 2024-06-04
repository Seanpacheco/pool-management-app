import express, { Request } from 'express';
import ViteExpress from 'vite-express';
import { validateAccessToken } from './middleware/auth0.middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { db } from './db/connection';
import { accountInitializer, accountMutator, account } from './db/schemas/public/Account';
import { siteInitializer, siteMutator, site } from './db/schemas/public/Site';
import { installationInitializer, installationMutator, installation } from './db/schemas/public/Installation';
import { chemLogInitializer, chemLogMutator, chemLog } from './db/schemas/public/ChemLog';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(cors<Request>());

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

//account endpoints
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
});

//site endpoints
app.get('/api/v1/sites/:id', validateAccessToken, async (req, res) => {
  console.log('getting sites');

  try {
    const data = await db.sites.find(req.params.id);
    res.status(200).json({
      data: data,
      status: 'success',
    });
  } catch (e) {
    console.log(e);
  }
});

app.post('/api/v1/sites', validateAccessToken, async (req, res) => {
  console.log('adding site');
  const result = siteInitializer.safeParse({
    account_id: req.body.account_id,
    address: req.body.address,
    postal_code: req.body.postal_code,
    email: req.body.email,
    phone: req.body.phone,
  });
  if (result.success) {
    try {
      const data = await db.sites.add({
        account_id: req.body.account_id,
        address: req.body.address,
        postal_code: req.body.postal_code,
        email: req.body.email,
        phone: req.body.phone,
      });
      res.status(200).json({ data: data, status: 'Site added and response sent successfully!' });
      console.log(data);
      console.log('site added');
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

app.delete('/api/v1/sites/:id', validateAccessToken, async (req, res) => {
  const result = siteMutator.safeParse({
    user_id: req.auth?.payload.sub,
    site_id: req.params.id,
  });
  if (result.success) {
    try {
      console.log(req.params.id);
      const data = await db.sites.remove(req.params.id);
      console.log('site removed');
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

//installation endpoints
app.post('/api/v1/installations', validateAccessToken, async (req, res) => {
  console.log('adding installation');
  const result = installationInitializer.safeParse({
    site_id: req.body.site_id,
    name: req.body.name,
    type: req.body.type,
    shape: req.body.shape,
    length: req.body.length,
    width: req.body.width,
    depth: req.body.depth,
    gallons: req.body.gallons,
  });
  if (result.success) {
    try {
      const data = await db.installations.add({
        site_id: req.body.site_id,
        name: req.body.name,
        type: req.body.type,
        shape: req.body.shape,
        length: req.body.length,
        width: req.body.width,
        depth: req.body.depth,
        gallons: req.body.gallons,
      });
      res.status(200).json({ data: data, status: 'Installation added and response sent successfully!' });
      console.log(data);
      console.log('installation added');
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

app.get('/api/v1/installations/:site_id', validateAccessToken, async (req, res) => {
  console.log('getting installations');
  console.log(req.params.site_id);
  const result = installationInitializer.safeParse({
    site_id: req.params.site_id,
  });
  if (result.success) {
    try {
      console.log(req.params.site_id);

      const data = await db.installations.find(req.params.site_id);
      console.log('db awaited');
      res.status(200).json({
        data: data,
        status: 'success',
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

//chemLog endpoints

app.post('/api/v1/chemLogs', validateAccessToken, async (req, res) => {
  console.log('adding chemLog');
  console.log(req.body);
  const result = chemLogInitializer.safeParse({
    installation_id: req.body.installation_id,
    log_date: req.body.log_date,
    sanitizer_level: req.body.sanitizer_level,
    sanitizer_type: req.body.sanitizer_type,
    ph_level: req.body.ph_level,
    alkalinity_level: req.body.alkalinity_level,
    calcium_level: req.body.calcium_level,
    total_dissolved_solids_level: req.body.total_dissolved_solids_level,
    cynauric_acid_level: req.body.cynauric_acid_level,
  });
  if (result.success) {
    try {
      const data = await db.chemLogs.add({
        installation_id: req.body.installation_id,
        log_date: req.body.log_date,
        sanitizer_level: req.body.sanitizer_level,
        sanitizer_type: req.body.sanitizer_type,
        ph_level: req.body.ph_level,
        alkalinity_level: req.body.alkalinity_level,
        calcium_level: req.body.calcium_level,
        total_dissolved_solids_level: req.body.total_dissolved_solids_level,
        cynauric_acid_level: req.body.cynauric_acid_level,
      });
      res.status(200).json({ data: data, status: 'ChemLog added and response sent successfully!' });
      console.log(data);
      console.log('chemLog added');
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

app.get('/api/v1/chemLogs/:installation_id', validateAccessToken, async (req, res) => {
  console.log('getting chemLogs');
  console.log(req.params.installation_id);
  const result = installationInitializer.safeParse({
    installation_id: req.params.installation_id,
  });
  if (result.success) {
    try {
      console.log(req.params.installation_id);

      const data = await db.chemLogs.find(req.params.installation_id);
      console.log('db awaited');
      res.status(200).json({
        data: data,
        status: 'success',
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400).json(result.error.formErrors.fieldErrors);
    console.log(result.error.formErrors.fieldErrors);
  }
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening on port 3000...'));
