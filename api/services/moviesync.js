import fetch from 'node-fetch';
import _ from 'lodash';
import { deepTrim } from './utils';
import genres from '../data/genres';
import config from '../../config';

// TODO use async await instead of promises then
// VARIABLES
const { API_KEY_KVIKMYNDIR, API_KEY_TMDB } = config;

/**
 * Adds tt before imdb id if not exist
 * @param {String} imdbId - IMDB id
 * @returns {String} imdb id formatted
 */
function formatImdbId(imdbId) {
  return imdbId.indexOf('tt') > -1 ? imdbId : `tt${imdbId}`;
}

/**
 * Makes get request to Kvikmyndir.is API to get movie showtimes
 * @returns {Promise} Promise - the promise object
 */
function getKvikmyndir() {
  return new Promise((resolve, reject) => {
    const movieArr = []; // Contains all movies for 5 days [[day0]], [day1]], [day2]], ...]
    const promises = [];

    for (let i = 0; i < 5; i++) {
      const url = `http://kvikmyndir.is/api/showtimes_by_date/?key=${API_KEY_KVIKMYNDIR}&dagur=${i}`;

      const request = fetch(url)
        .then(res => res.json())
        .then((data) => {
          movieArr.push({
            day: i,
            date: Date.now(),
            type: 'showtimes',
            data,
          });
        })
        .catch(error => reject(error));

      promises.push(request);
    }

    Promise.all(promises)
      .then(() => resolve(movieArr))
      .catch(error => reject(error));
  });
}

/**
 * Makes get request to Kvikmyndir.is API to get upcoming movies
 * @returns {Promise} Promise - the promise object
 */
function getUpcoming() {
  return new Promise((resolve, reject) => {
    const url = `http://kvikmyndir.is/api/movie_list_upcoming/?key=${API_KEY_KVIKMYNDIR}&count=100`;

    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

/**
 * Makes get request to Kvikmyndir.is API and gets additonal information about movie
 * Specifically gets plot for movie
 * @param {Array} movies - Array of movie objects
 * @returns {Promise} Promise - the promise object
 */
function getPlotForMovies(movies) {
  return new Promise((resolve, reject) => {
    const moviesWithPlot = [];
    const promises = [];

    movies.forEach((movie) => {
      if (movie.ids && movie.ids.imdb) {
        const url = `http://kvikmyndir.is/api/movie/?imdb=${movie.ids.imdb}&key=${API_KEY_KVIKMYNDIR}`;
        const request = fetch(url)
          .then(res => res.json())
          .then((data) => {
            if (data.plot && data.imdb) {
              moviesWithPlot.push({
                imdb: formatImdbId(data.imdb),
                text: data.plot,
              });
            }
          })
          .catch(error => reject(error));

        promises.push(request);
      }
    });

    Promise.all(promises)
      .then(() => resolve(moviesWithPlot))
      .catch(error => reject(error));
  });
}

/**
 * Gets trailers or videos for multiple movies from TMDB API
 * @param {Array} movies - Array of movie objects
 * @param {Function} fn - Function to run
 * @param {String} type - Request type in url videos or images
 * @returns {Promise} promise - When all promises have resolved then trailersArr is returned
 */
function getTmdbData(movies, fn, type) {
  return new Promise((resolve, reject) => {
    const dataArr = [];
    const promises = [];

    for (let i = 0, len = movies.length; i < len; i++) {
      const movie = movies[i];

      if (movie.ids && movie.ids.imdb) {
        const imdbId = formatImdbId(movie.ids.imdb);
        const url = `https://api.themoviedb.org/3/movie/${imdbId}/${type}?api_key=${API_KEY_TMDB}`;
        const delay = 400 * i; // TMDB has 30 request per 10 seconds

        const request = fn(url, imdbId, delay)
          .then((data) => {
            if (data) {
              dataArr.push(data);
            }
          })
          .catch(error => reject(error));
        promises.push(request);
      }
    }

    Promise.all(promises)
      .then(() => resolve(dataArr))
      .catch(error => reject(error));
  });
}

/**
 * Creates new trailer object from TMDB trailer object
 * @param {String} imdbId - Imdb id
 * @param {Array} trailers - Array of trailer objecs
 * @returns {Object} trailersObj - newly created trailer object
 */
function createTrailerObject(imdbId, trailers) {
  const trailersObj = {
    imdb: imdbId,
    data: [],
  };

  const trailer = t => ({
    id: t.id,
    url: `https://www.youtube.com/embed/${t.key}?rel=0`,
    size: t.size,
    name: t.name,
  });

  trailersObj.data = trailers.map(trailer);

  return trailersObj;
}

/**
 * Creates new images object from TMDB images object
 * @param {String} imdbId - Imdb id
 * @param {Object} images - Images object
 * @returns {Object} imagesObj - newly created images object
 */
function createImagesObject(imdbId, images) {
  const imagesObj = {
    imdb: imdbId,
    backdrops: [],
    posters: [],
  };

  const sizes = [300, 1920]; // also avaliable 500 and 1000

  if (images.backdrops && images.backdrops.length > 0) {
    imagesObj.backdrops = sizes.map(size =>
      images.backdrops.map(
        backdrop => `http://image.tmdb.org/t/p/w${size}${backdrop.file_path}`,
      ),
    );
  }

  if (images.posters && images.posters.length > 0) {
    imagesObj.posters = sizes.map(size =>
      images.posters.map(
        poster => `http://image.tmdb.org/t/p/w${size}${poster.file_path}`,
      ),
    );
  }

  return imagesObj;
}

/**
 * Gets trailers from TMDB service by specific imdbID
 * @param {String} url - url
 * @param {String} imdbId - IMDB id
 * @param {Int} delay - Delay in milliseconds
 * @returns {Promise} promise - Promise witch returns trailer object
 */
function getTrailersRequest(url, imdbId, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          if (data.status_code && data.status_code === 34 && !data.results) {
            // Status code for resource not be found.
            return resolve();
          }

          const trailersObj = createTrailerObject(imdbId, data.results);
          return resolve(trailersObj);
        })
        .catch(error => reject(error));
    }, delay);
  });
}

/**
 * Gets images from TMDB service by specific imdbID
 * @param {String} url - url
 * @param {String} imdbId - IMDB id
 * @param {Int} delay - Delay in milliseconds
 * @returns {Promise} promise - Promise witch returns images object
 */
function getImagesRequest(url, imdbId, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          if (data.status_code && data.status_code === 34 && !data.results) {
            // Status code for resource not be found.
            return resolve();
          }

          const imagesObj = createImagesObject(imdbId, data);
          return resolve(imagesObj);
        })
        .catch(error => reject(error));
    }, delay);
  });
}

/**
 * Iterates movies objects and make request to OMDB API for each movie
 * Creates a omdb array to store the omdb API data
 * @param {Array} movies - Array of movie objects
 * @returns {Promise} promise - When all promises have resolved then omdbArr is returned
 */
function getOmdbData(movies) {
  return new Promise((resolve, reject) => {
    const omdbArr = []; // Contains all trailers object
    const promises = [];

    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];

      if (movie.ids && movie.ids.imdb) {
        const imdbId = formatImdbId(movie.ids.imdb);
        const url = `http://www.omdbapi.com/?i=${imdbId}&plot=true&tomatoes=true&r=json`;

        const request = fetch(url)
          .then(res => res.json())
          .then((data) => {
            omdbArr.push({ imdb: data.imdbID, data });
          })
          .catch(error => reject(error));

        promises.push(request);
      }
    }

    Promise.all(promises)
      .then(() => resolve(omdbArr))
      .catch(error => reject(error));
  });
}

/**
 * Iterates array of arrays, and puts those object into new array
 * @param {Array} array
 * @returns {Array} newArray
 */
function mergeMovieArrays(array) {
  const newArray = [];

  // Push each movie into array
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].data.length; j++) {
      newArray.push(array[i].data[j]);
    }
  }

  return newArray;
}

/**
 * Extends movie objects with plots, trailers, images and omdb objects
 * also refactors movie objects from kvikmyndir.is
 * @param {Array} movies - Array of movie objects
 * @param {Array} plots - Array of plot objects
 * @param {Array} trailers - Array of trailers objects
 * @param {Array} images - Array of images objects
 * @param {Array} omdb - Array of omdb objects
 * @returns {Array} movies - Array of extended movie objects
 */
function extendMoviesObjects(
  movies,
  plots,
  trailers,
  images,
  omdb,
  propsToDelete,
) {
  movies.forEach((movie) => {
    const imdbId = formatImdbId(movie.ids.imdb);

    // Create kvikmyndir object
    movie.kvikmyndir = {
      id: movie.id ? movie.id : '',
      url: movie.id ? `http://kvikmyndir.is/mynd/?id=${movie.id}` : '',
    };

    // Create rated object
    movie.rated = {
      is: movie.certificateIS ? movie.certificateIS : '',
      en: '',
    };

    // IMDB
    movie.imdb = {
      id: imdbId,
      rating: movie && movie.ratings && movie.ratings.imdb,
      url: `http://www.imdb.com/title/${imdbId}/`,
      votes: '',
    };

    // OMDB
    if (omdb && omdb.length > 0) {
      const omdbObj = _.find(omdb, o => o.imdb === imdbId);
      const omdbProps = ['Country', 'Awards', 'Website'];

      if (omdbObj && omdbObj.data) {
        // Create Rotten Tomatos object
        movie.rottenTomatoes = {};

        Object.keys(omdbObj.data).forEach((key) => {
          // Check if property is not inherited from prototype
          if (Object.prototype.hasOwnProperty.call(omdbObj.data, key)) {
            // Add all tomato keys to rottenTomatoes object
            if (key.includes('tomato')) {
              movie.rottenTomatoes[key] = omdbObj.data[key] !== 'N/A'
                ? omdbObj.data[key]
                : '';
            }

            // Add keys in omdbProps array to movie object
            for (let i = 0; i < omdbProps.length; i++) {
              if (omdbProps[i] === key) {
                movie[omdbProps[i].toLowerCase()] = omdbObj.data[key] !== 'N/A'
                  ? omdbObj.data[key]
                  : '';
              }
            }

            // Rated
            const rated = omdbObj.data.Rated;
            if (rated && rated !== 'N/A') {
              movie.rated.en = rated;
            }

            // IMDB rating
            const rating = omdbObj.data.imdbRating;
            if (rating && rating !== 'N/A') {
              movie.imdb.rating = rating;
            }

            // IMDB votes
            const votes = omdbObj.data.imdbVotes;
            if (votes && votes !== 'N/A') {
              movie.imdb.votes = votes;
            }
          }
        });

        // If not tomatoRating
        if (
          movie.rottenTomatoes.tomatoRating === '' &&
          movie.ids &&
          movie.ids.rotten !== ''
        ) {
          movie.rottenTomatoes.tomatoRating = movie.ids.rotten;
        }
      }
    }

    // GENRES
    if (movie.genres) {
      const tempGenres = {
        is: [],
        en: [],
      };

      _.forEach(movie.genres, (genreId) => {
        const genreObj = _.find(genres, o => o.ID === genreId);
        tempGenres.is.push(genreObj.Name);
        tempGenres.en.push(genreObj.NameEN);
      });

      movie.genres = tempGenres;
    }

    // PLOTS
    if (plots && plots.length > 0) {
      const matchedPlot = _.find(plots, p => p.imdb === imdbId);
      movie.plot = {
        is: matchedPlot && matchedPlot.text ? matchedPlot.text : '',
        en: omdb && omdb.data && omdb.data.Plot ? omdb.data.Plot : '',
      };
    }

    // TRAILERS
    if (trailers && trailers.length > 0) {
      const matchedTrailer = _.find(
        trailers,
        trailer => trailer.imdb === imdbId,
      );
      if (matchedTrailer && matchedTrailer.data) {
        movie.trailers = matchedTrailer.data;
      }
    }

    // IMAGES
    if (images && images.length > 0) {
      const matchedImages = _.find(images, image => image.imdb === imdbId);

      if (matchedImages && matchedImages.backdrops && matchedImages.posters) {
        movie.images = {
          backdrops: matchedImages.backdrops,
          posters: matchedImages.posters,
        };
      }
    }

    // ACTORS
    if (movie.actors_abridged && movie.actors_abridged.length > 0) {
      const getActorName = d => d.name;
      movie.actors = movie.actors_abridged.map(getActorName);
    }

    // DIRECTORS
    if (movie.directors_abridged && movie.directors_abridged.length > 0) {
      const getDirectorName = d => d.name;
      movie.directors = movie.directors_abridged.map(getDirectorName);
    }

    // DELETE props from object
    const deleteItem = (item) => {
      if (movie[item]) delete movie[item];
    };

    propsToDelete.map(deleteItem);

    // Deep trims every property and its children
    /* eslint-disable no-param-reassign*/
    movie = deepTrim(movie);
  });

  return movies;
}

export default (callback) => {
  // Contains all movies for 5 days in one big array [movie1, movie2, movie2, ...]
  let allMovies = [];
  // Contains all movies for 5 days [[day0]], [day1]], [day2]], ...]
  let moviesByDay = [];
  // allMovies array merged into uniqe movie array
  let mergedList = [];
  // Contains upcoming movies { ... ,data: [movie1, movie2, movie2, ...] }
  const upcomingMovies = {
    date: null,
    type: 'upcoming',
    data: [],
  };
  // Array of movie plots object [{imdb:'tt0317248',text: 'This is movie plot
  // text'}, ...]
  let plotsArr = [];
  // Array of trailer information for movie [{imdb:'tt0317248',data: [{...},
  // {...}, ...]]
  let trailersArr = [];
  // Array of omdb information for movie [{imdb:'tt0317248',data: {...}, ...]
  let omdbArr = [];
  // Array of images objects [{imdb:'tt0317248',data: {...}, ...]
  let imagesArr = [];

  getKvikmyndir()
    .then((data) => {
      moviesByDay = data;
      allMovies = mergeMovieArrays(data);
      mergedList = _.uniqBy(allMovies, 'id'); // Find uniqe movies by id in array,

      return getUpcoming();
    })
    .then((data) => {
      upcomingMovies.date = Date.now();
      upcomingMovies.data = data;
      mergedList = _.unionBy(mergedList, data, 'id');

      return getPlotForMovies(mergedList); // Get plot for each movie in array
    })
    .then((plots) => {
      plotsArr = plots;

      return getTmdbData(mergedList, getTrailersRequest, 'videos'); // Get trailers for each movie in array
    })
    .then((trailersData) => {
      trailersArr = trailersData;

      return getTmdbData(mergedList, getImagesRequest, 'images'); // Get trailers for each movie in array
    })
    .then((imagesData) => {
      imagesArr = imagesData;

      return getOmdbData(mergedList); // Get omdb information for each movie in array
    })
    .then((omdbData) => {
      omdbArr = omdbData;

      const propsToDelete = [
        'directors_abridged',
        'actors_abridged',
        'alternativeTitles',
        'alternative_titles',
        'ids',
        'id',
        'certificateImg',
        'certificateIS',
        'ratings',
      ];

      moviesByDay.forEach((day) => {
        day.data = extendMoviesObjects(
          day.data,
          plotsArr,
          trailersArr,
          imagesArr,
          omdbArr,
          propsToDelete,
        );
      });

      upcomingMovies.data = extendMoviesObjects(
        upcomingMovies.data,
        plotsArr,
        trailersArr,
        imagesArr,
        omdbArr,
        propsToDelete,
      );
    })
    .catch(error => callback(error));
};
