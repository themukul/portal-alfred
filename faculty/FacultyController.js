const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const verifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Faculty = require('./Faculty');

// get a faculty by token from db
router.get('/profile', verifyToken, (req, res) => {
  Faculty.findById(req.userId, (err, faculty) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching faculty!');
    }
    if (!faculty) {
      return res.status(404).send("No faculty found.");
    }
    res.status(200).send(faculty);
  });
});

// create a new faculty
router.post('/', (req, res) => {
  const { name, email, password, department } = req.body;
  Faculty.create({
    name,
    email,
    password,
    department
  }, (err, faculty) => {
    if (err) {
      return res.status(500).send('There was a problem adding faculty to the database!');
    }
    res.status(201).send(faculty);
  });
});

// return all the faculties in db
router.get('/', (req, res) => {
  Faculty.find({}, (err, faculties) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching faculties!');
    }
    res.status(200).send(faculties);
  });
});

// get a faculty by id from db
router.get('/:id', (req, res) => {
  Faculty.findById(req.params.id, (err, faculty) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching faculty!');
    }
    if (!faculty) {
      return res.status(404).send("No faculty found.");
    }
    res.status(200).send(faculty);
  });
});

// delete a faculty by id
router.delete('/:id', function (req, res) {
  Faculty.findByIdAndRemove(req.params.id, function (err, faculty) {
      if (err) return res.status(500).send("There was a problem deleting the faculty!");
      res.status(200).send("faculty "+ faculty.name +" was deleted.");
  });
});

// updating a faculty in db
router.put('/:id', function (req, res) {
  Faculty.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, faculty) {
      if (err) return res.status(500).send("There was a problem updating the faculty.");
      res.status(200).send(faculty);
  });
});

module.exports = router;