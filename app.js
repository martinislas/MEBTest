import express from 'express';
import bodyParser from 'body-parser';
import gcloudstore from '@google-cloud/datastore';

import routes from './routes/index.js';

const app = express();

const datastore = new gcloudstore.Datastore();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes({datastore}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});