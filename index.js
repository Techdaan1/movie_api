const express = require('express'),
  morgan = require('morgan');
const { rest } = require('lodash');

const app = express();

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
    director: 'Frank Dabrabont'
  },
  {
    title: 'The Hunger Games',
    director: 'Francis Lawrence'
  },
  {
    title: 'The Conjuring',
    director: 'James wan'
  }
];

app.use(morgan('common'));

// GET welcome message
app.get('/', (req, res) => {
  res.send('Welcome to my movie database!');
});

// GET list of all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

//GET data about a single movie by title
app.get('movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title}));
});

//GET data about a genre by name
app.get('genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
  { return genre.name === req.params.name }));
});

//GET data about a director by name
app.get('directors/:name', (req, res) => {
  res.json(directors.find((director) =>
  { return director.name === req.params.name }));
});

//POST - add new user

app.post('/users', (req, res) => {
let newUser = req.body;

if (!newUser.name) {
  const message = 'Missing name in request body';
  rest.status(400).send(message);
} else {
  users.push(newUser);
  res.status(201).send(newUser);
}
});

//PUT - update user name

app.put('/users/:name', (req, res) => {
  let user = user.find((user) => { return user.name === req.params.name});
  res.send('user name has been updated')
});

app.put('/users/:name/favoriteList', (req, res) => {
  res.send('movie from favorite list has been succesfully added')
});

//DELETE movie from favorite list of user

app.delete('/users/:name/favoriteList', (req, res) => {
  res.send('movie from favorite list has been succesfully deleted')
});

//DELETE user

app.delete('/users/:name', (req, res) => {
  res.send('user has been succesfully deleted')
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