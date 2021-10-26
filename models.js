//require mongoose
const mongoose = require('mongoose');

//creating movieSchema
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: { 
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

//creating userSchema
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date, 
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//creating genreSchema
let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

//creating directorSchema
let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birthdate: {type: Date, required: true},
    Death: String
});



let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = User;
module.exports.Director = User;