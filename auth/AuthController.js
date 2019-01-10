const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Student = require('../student/Student');
const Faculty = require('../faculty/Faculty');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.post('/register/student', function(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  Student.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
    rollnumber: req.body.rollnumber,
    branch: req.body.branch
  },
  (err, student) => {
    if (err) return res.status(500).send("There was a problem registering the student.")
    // create a token
    const token = jwt.sign({ id: student._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.post('/register/faculty', function(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  Faculty.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
    department: req.body.department
  },
  (err, faculty) => {
    if (err) return res.status(500).send("There was a problem registering the faculty.")
    // create a token
    const token = jwt.sign({ id: faculty._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.post('/login/student', function(req, res) {
  Student.findOne({ email: req.body.email }, (err, student) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!student) return res.status(404).send('No student found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, student.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: student._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.post('/login/faculty', function(req, res) {
  Faculty.findOne({ email: req.body.email }, (err, faculty) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!faculty) return res.status(404).send('No faculty found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, faculty.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: faculty._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

module.exports = router;