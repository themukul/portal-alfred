const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Ta = require('./Ta');

// create a new ta
router.post('/', (req, res) => {
  const { Course, description, maxTa, faculty, enrolledStudents } = req.body;
  Ta.create({
    Course,
    description,
    maxTa,
    faculty,
    enrolledStudents
  }, (err, ta) => {
    if (err) {
      return res.status(500).send('There was a problem adding ta to the database!');
    }
    res.status(201).send(ta);
  });
});

// get all tas populated with faculty db!
router.get('/', (req, res) => {
  Ta.find({}).populate('faculty').exec((err, tas) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching tas!');
    }
    res.status(200).send(tas);
  });
});

//get a ta by id from db
router.get('/:id', (req, res) => {
  Ta.findById(req.params.id).populate('faculty').exec((err, ta) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching ta!');
    }
    if (!ta) {
      return res.status(404).send("No ta found.");
    }
    res.status(200).send(ta);
  });
});

// delete a ta by id
router.delete('/:id', function (req, res) {
  Ta.findByIdAndRemove(req.params.id, function (err, ta) {
      if (err) return res.status(500).send("There was a problem deleting the ta!");
      res.status(200).send("ta "+ ta.name +" was deleted.");
  });
});

// updating a ta in db
router.put('/:id', function (req, res) {
  Ta.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, ta) {
      if (err) return res.status(500).send("There was a problem updating the ta.");
      res.status(200).send(ta);
  });
});

// enroll in a ta
router.put('/enroll/:id', (req, res) => {
  Ta.findById(req.params.id, (err, ta) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching ta!');
    }
    if (!ta) {
      return res.status(404).send("No ta found.");
    }
    let enrolledStudents = ta.enrolledStudents;
    enrolledStudents.push(req.body.studentId);
    Ta.findByIdAndUpdate(req.params.id, {enrolledStudents: enrolledStudents}, {new: true}, function (err, ta) {
      if (err) return res.status(500).send("There was a problem enrolling in the ta.");
      res.status(200).send(ta);
    });
  });
});


module.exports = router;