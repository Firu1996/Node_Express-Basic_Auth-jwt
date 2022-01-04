const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const users = require('./route/userRoute');

app.use(express.json());
app.use(cookieParser());

app.use('/api', users);

module.exports = app;