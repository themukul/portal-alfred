const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Material = require('./Material');

// create a new material
router.post('/', (req, res) => {
  const { name, description, uploaded_by, url, department } = req.body;
  Material.create({
    name,
    description,
    uploaded_by,
    url,
    department
  }, (err, material) => {
    if (err) {
      return res.status(500).send('There was a problem adding material to the database!');
    }
    res.status(201).send(material);
  });
});

// get all materials populated with faculty db!
router.get('/', (req, res) => {
  Material.find({}).populate('faculty').exec((err, materials) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching materials!');
    }
    res.status(200).send(materials);
  });
});

//get a material by id from db
router.get('/:id', (req, res) => {
  Material.findById(req.params.id).populate('faculty').exec((err, material) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching material!');
    }
    if (!material) {
      return res.status(404).send("No material found.");
    }
    res.status(200).send(material);
  });
});

// delete a material by id
router.delete('/:id', function (req, res) {
  Material.findByIdAndRemove(req.params.id, function (err, material) {
      if (err) return res.status(500).send("There was a problem deleting the material!");
      res.status(200).send("material "+ material.name +" was deleted.");
  });
});

// updating a material in db
router.put('/:id', function (req, res) {
  Material.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, material) {
      if (err) return res.status(500).send("There was a problem updating the material.");
      res.status(200).send(material);
  });
});

module.exports = router;