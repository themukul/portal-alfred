const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Appointment = require('./Appointment');

// create a new appointment
router.post('/', (req, res) => {
  const { date, name, description, appointment_by, appointment_for } = req.body;
  Appointment.create({
    date,
    name,
    description,
    appointment_by,
    appointment_for
  }, (err, appointment) => {
    if (err) {
      return res.status(500).send('There was a problem adding appointment to the database!');
    }
    res.status(201).send(appointment);
  });
});

// return all the appointment in db
router.get('/', (req, res) => {
  Appointment.find({}, (err, appointments) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching appointments!');
    }
    res.status(200).send(appointments);
  });
});

//get a appointment by id from db
router.get('/:id', (req, res) => {
  Appointment.findById(req.params.id, (err, appointment) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching appointment!');
    }
    if (!appointment) {
      return res.status(404).send("No appointment found.");
    }
    res.status(200).send(appointment);
  });
});

// delete a appointment by id
router.delete('/:id', function (req, res) {
  Appointment.findByIdAndRemove(req.params.id, function (err, appointment) {
      if (err) return res.status(500).send("There was a problem deleting the appointment!");
      res.status(200).send("appointment "+ appointment.name +" was deleted.");
  });
});

// updating a appointment in db
router.put('/:id', function (req, res) {
  Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, appointment) {
      if (err) return res.status(500).send("There was a problem updating the appointment.");
      res.status(200).send(appointment);
  });
});

module.exports = router;