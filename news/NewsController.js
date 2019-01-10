const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const News = require('./News');

// create a new News
router.post('/', (req, res) => {
  const { heading, description, added_by, likes } = req.body;
  News.create({
    heading,
    description,
    added_by,
    likes,
  }, (err, news) => {
    if (err) {
      return res.status(500).send('There was a problem adding news to the database!');
    }
    res.status(201).send(news);
  });
});

// get all news populated with faculty db!
router.get('/', (req, res) => {
  News.find({}).populate('faculty').exec((err, news) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching btps!');
    }
    res.status(200).send(news);
  });
});

//get a news by id from db
router.get('/:id', (req, res) => {
  News.findById(req.params.id).populate('faculty').exec((err, news) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching news!');
    }
    if (!news) {
      return res.status(404).send("No news found.");
    }
    res.status(200).send(news);
  });
});

// delete a news by id
router.delete('/:id', function (req, res) {
  News.findByIdAndRemove(req.params.id, function (err, news) {
      if (err) return res.status(500).send("There was a problem deleting the news!");
      res.status(200).send("news "+ news.name +" was deleted.");
  });
});

// updating a news in db
router.put('/:id', function (req, res) {
  News.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, news) {
      if (err) return res.status(500).send("There was a problem updating the news.");
      res.status(200).send(news);
  });
});

// like a news
router.put('/like/:id', (req, res) => {
  News.findById(req.params.id, (err, news) => {
    if (err) {
      return res.status(500).send('There was a problem in fetching news!');
    }
    if (!news) {
      return res.status(404).send("No news found.");
    }
    let likes = news.likes;
    likes += 1;
    News.findByIdAndUpdate(req.params.id, {likes: likes}, {new: true}, function (err, news) {
      if (err) return res.status(500).send("There was a problem in liking!");
      res.status(200).send(news);
    });
  });
});


module.exports = router;