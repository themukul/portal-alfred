const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Btp = require('./Btp');

// create a new Btp
router.post('/', (req, res) => {
  const { name, description, maxGroupSize, submissionDate, faculty, enrolledStudents } = req.body;
  Btp.create({
    name,
    description,
    maxGroupSize,
    submissionDate,
    faculty,
    enrolledStudents
  }, (err, btp) => {
    if (err) {
      return res.status(500).send('There was a problem adding btp to the database!');
    }
    res.status(201).send(btp);
  });
});

// get all btps populated with faculty db!
router.get('/', (req, res) => {
  Btp.find({}).populate('faculty').exec((err, btps) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching btps!');
    }
    res.status(200).send(btps);
  });
});

//get a btp by id from db
router.get('/:id', (req, res) => {
  Btp.findById(req.params.id).populate('faculty').exec((err, btp) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching btp!');
    }
    if (!btp) {
      return res.status(404).send("No btp found.");
    }
    res.status(200).send(btp);
  });
});

// delete a btp by id
router.delete('/:id', function (req, res) {
  Btp.findByIdAndRemove(req.params.id, function (err, btp) {
      if (err) return res.status(500).send("There was a problem deleting the btp!");
      res.status(200).send("btp "+ btp.name +" was deleted.");
  });
});

// updating a btp in db
router.put('/:id', function (req, res) {
  Btp.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, btp) {
      if (err) return res.status(500).send("There was a problem updating the btp.");
      res.status(200).send(btp);
  });
});

// enroll in a btp
router.put('/enroll/:id', (req, res) => {
  Btp.findById(req.params.id, (err, btp) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching btp!');
    }
    if (!btp) {
      return res.status(404).send("No btp found.");
    }
    let enrolledStudents = btp.enrolledStudents;
    enrolledStudents.push(req.body.studentId);
    Btp.findByIdAndUpdate(req.params.id, {enrolledStudents: enrolledStudents}, {new: true}, function (err, btp) {
      if (err) return res.status(500).send("There was a problem enrolling in the btp.");
      res.status(200).send(btp);
    });
  });
});


module.exports = router;