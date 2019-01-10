const express = require('express');
const app = express();
const morgan = require('morgan');

const db = require('./db');

app.use(morgan('tiny'));

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

const StudentController = require('./student/StudentController');
app.use('/api/student', StudentController);

const FacultyController = require('./faculty/FacultyController');
app.use('/api/faculty', FacultyController);

const BtpController = require('./btp/BtpController');
app.use('/api/btp', BtpController);

const MaterialController = require('./material/MaterialController');
app.use('/api/material', MaterialController);

const TaController = require('./ta/TaController');
app.use('/api/ta', TaController);

const NewsController = require('./news/NewsController');
app.use('/api/news', NewsController);

const PaymentController = require('./payment/PaymentController');
app.use('/api/payment', PaymentController);

const AppointmentController = require('./appointment/AppointmentController');
app.use('/api/appointment', AppointmentController);


module.exports = app;