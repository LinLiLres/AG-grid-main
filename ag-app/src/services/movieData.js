const movies = [
  {
    _id: "000",
    title: "CODA",
    numberInStock: 6,
    dailyRentalRate: 8.1,
  },
  {
    _id: "111",
    title: "Nomadland",
    numberInStock: 5,
    dailyRentalRate: 8.1
  },
  {
    _id: "222",
    title: "Parasite",
    numberInStock: 8,
    dailyRentalRate: 8.5
  },
  {
    _id: "333",
    title: "Green Book",
    numberInStock: 7,
    dailyRentalRate: 8.2
  },
  {
    _id: "444",
    title: "The Shape of Water",
    numberInStock: 7,
    dailyRentalRate: 7.3
  },
  {
    _id: "555",
    title: "Moonlight",
    numberInStock: 7,
    dailyRentalRate: 7.4
  },
  {
    _id: "666",
    title: "Spotlight",
    numberInStock: 7,
    dailyRentalRate: 8.1
  },
  {
    _id: "777",
    title: "12 Years a Slave",
    numberInStock: 4,
    dailyRentalRate: 8.1
  },
  {
    _id: "888",
    title: "Argo",
    numberInStock: 7,
    dailyRentalRate: 7.7
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }
console.log(movieInDb)
  return movieInDb;
}

