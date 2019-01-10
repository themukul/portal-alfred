const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const verifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Student = require('./Student');

//get a student by token from db
router.get('/profile', verifyToken,  (req, res) => {
  Student.findById(req.userId, (err, student) => {
    if (err) {
      return res.status(500).send('There was a problem in rwrewr fetching student!');
    }
    if (!student) {
      return res.status(404).send("No student found.");
    }
    res.status(200).send(student);
  });
});

// create a new student
router.post('/', (req, res) => {
  const { name, email, password, rollnumber, branch } = req.body;
  Student.create({
    name,
    email,
    password,
    rollnumber,
    branch
  }, (err, student) => {
    if (err) {
      return res.status(500).send('There was a problem adding student to the database!');
    }
    res.status(201).send(student);
  });
});

// return all the students in db
router.get('/', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching student!');
    }
    res.status(200).send(students);
  });
});

//get a student by id from db
router.get('/:id', (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching student!');
    }
    if (!student) {
      return res.status(404).send("No student found.");
    }
    res.status(200).send(student);
  });
});

// delete a student by id
router.delete('/:id', function (req, res) {
  Student.findByIdAndRemove(req.params.id, function (err, student) {
      if (err) return res.status(500).send("There was a problem deleting the student!");
      res.status(200).send("Student "+ student.name +" was deleted.");
  });
});

// updating a student in db
router.put('/:id', function (req, res) {
    
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, student) {
      if (err) return res.status(500).send("There was a problem updating the student.");
      res.status(200).send(student);
  });
});

module.exports = router;