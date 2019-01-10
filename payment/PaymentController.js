const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Payment = require('./Payment');

// create a new payment
router.post('/', (req, res) => {
  const { name, description, due_date, status, amount } = req.body;
  Payment.create({
    name,
    description,
    due_date,
    status,
    amount
  }, (err, payment) => {
    if (err) {
      return res.status(500).send('There was a problem adding payment to the database!');
    }
    res.status(201).send(payment);
  });
});

// return all the payments in db
router.get('/', (req, res) => {
  Payment.find({}, (err, payments) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching payment!');
    }
    res.status(200).send(payments);
  });
});

//get a payment by id from db
router.get('/:id', (req, res) => {
  Payment.findById(req.params.id, (err, payment) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching payment!');
    }
    if (!payment) {
      return res.status(404).send("No payment found.");
    }
    res.status(200).send(payment);
  });
});

// delete a payment by id
router.delete('/:id', function (req, res) {
  Payment.findByIdAndRemove(req.params.id, function (err, payment) {
      if (err) return res.status(500).send("There was a problem deleting the payment!");
      res.status(200).send("payment "+ payment.name +" was deleted.");
  });
});

// updating a payment in db
router.put('/:id', function (req, res) {
  Payment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, payment) {
      if (err) return res.status(500).send("There was a problem updating the payment.");
      res.status(200).send(payment);
  });
});

module.exports = router;