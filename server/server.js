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

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
