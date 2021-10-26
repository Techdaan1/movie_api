//importing required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { rest } = require('lodash');

//importing models from models.js
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//connection database with connection URI
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//calling express
const app = express();

//activating morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//activating morgan
app.use(morgan('common'));

// GET welcome message
app.get('/', (req, res) => {
  res.send('Welcome to my movie database!');
});

// GET list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
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

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET a user by username
app.get('/users/:username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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

//PUT - Update a user's info, by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.put('/users/:username/favoriteList/:addFavorite', (req, res) => {
  res.send('movie from favorite list has succesfully been added')
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//DELETE movie from favorite list of user

app.delete('/users/:username/favoriteList/:deleteFavorite', (req, res) => {
  res.send('movie from favorite list has succesfully been deleted')
});

//DELETE user

app.delete('/users/:username', (req, res) => {
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
