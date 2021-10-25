const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
const { rest } = require('lodash');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));

let movies = [
  {
    title: 'Schindler’s List',
    director: 'Steven Spielberg'
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson'
  },
  {
    title: 'The Shining',
    director: 'Stanley Kubrick'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'Django Unchained',
    director: 'Quentin Tarantino'
  },
  {
    title: 'The Truman Show',
    director: 'Peter Weir'
  },
  {
    title: 'Mamma Mia!',
    director: 'Phyllida Lloyd'
  },
  {
    title: 'The Green Mile',
    director: 'Frank Darabont'
  },
  {
    title: 'The Hunger Games',
    director: 'Francis Lawrence'
  },
  {
    title: 'I am Legend',
    director: 'Francis Lawrence'
  }
];


// GET welcome message
app.get('/', (req, res) => {
  res.send('Welcome to my movie database!');
});

// GET list of all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

//GET data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title}));
});

//GET data about a genre by name
app.get('/genres/:name', (req, res) => {
  res.send('Successful GET request of all movie genres by name');
});

//GET data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send('Successful GET request of directors information by name');
});

//POST - add new user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//PUT - update user name
app.put('/users/:name', (req, res) => {
  res.send('user name has succesfully been updated')
});

app.put('/users/:name/favoriteList/:addFavorite', (req, res) => {
  res.send('movie from favorite list has succesfully been added')
});

//DELETE movie from favorite list of user

app.delete('/users/:name/favoriteList/:deleteFavorite', (req, res) => {
  res.send('movie from favorite list has succesfully been deleted')
});

//DELETE user

app.delete('/users/:name', (req, res) => {
  res.send('user has succesfully been deleted')
});

// USE requests

app.use('/documentation', express.static('public'));  

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
