//importing required modules
const express = require('express');
const morgan = require('morgan');

//importing models from models.js
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
// You dont need this
// const Genres = Models.Genre;
// const Directors = Models.Director;

//connection database with connection URI
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//calling express
const app = express();

//activating morgan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//GET a list of all genres
app.get('/genres', (req,res) => {
  Movies.find({}, "Genre")
  .then(genres => {
    res.status(201).json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//GET data about a genre by name
app.get('/genres/:Name', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name})
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//GET list of all directors
app.get('/directors', (req,res) => {
  Movies.find({}, "Director")
  .then((directors) => {
    res.status(200).json(directors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//GET data about a director by name
app.get('/directors/:Name', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.name})
  .then((director) => {
    res.status(200).json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST - register new user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        // I think you should return the user details instead of this
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
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    },
  },
  { new: true })
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
    }).catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
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
  // Change the above code to use a promise
});

//DELETE user by username

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndDelete({ Username: req.params.Username})
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found.');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send('Error: ' + err);
  });
});

//DELETE movie from favorite list of user

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
     $pull: { FavoriteMovies: req.params.MovieID }
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
  // Change the above code to use a promise
});

// USE requests, error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
