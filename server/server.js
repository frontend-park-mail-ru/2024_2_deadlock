'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'images')));
app.use(express.static(path.resolve(__dirname, '..', 'components')));

const router = express.Router();

router.get('/auth', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'auth.html'));
});

router.get('/reg', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'reg.html'));
});

app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
