const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [
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

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 movies!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
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