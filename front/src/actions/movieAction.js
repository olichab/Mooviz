import axios from "axios";

import {
  GET_MOVIES_LIST,
  CLEAR_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  GET_MOVIE_BY_CATEGORY,
  GET_RANDOM_MOVIE,
  GET_MOVIE_POSTER,
  GET_INFOS_MOVIE,
  ADD_MOVIE,
  DELETE_MOVIE,
  SEARCH_MOVIE_TO_ADD,
  SEARCH_MOVIE_IN_COLLECTION
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;
const apiKey = process.env.REACT_APP_API_MOVIEDB;

export const getMoviesList = () => dispatch => {
  const url = `${domain}/movies`;
  const token = localStorage.getItem("token");

  axios({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: GET_MOVIES_LIST,
        moviesList: res.data,
        categoriesSelect: []
      });
    })
    .catch(error => {
      console.error(error.response);
    });
};

export const clearMoviesList = categoriesList => dispatch => {
  const categoriesListName = categoriesList.map(cat => cat.name_category);
  dispatch({
    type: CLEAR_MOVIES_LIST,
    moviesListFiltered: [],
    categoriesSelect: categoriesListName
  });
};

export const getRandomMovie = () => dispatch => {
  const token = localStorage.getItem("token");
  const url = `${domain}/movies/random`;
  axios({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: GET_RANDOM_MOVIE,
        moviesListFiltered: res.data
      });
    })
    .catch(error => {
      console.error(error.response);
    });
};

export const getCategoriesList = () => dispatch => {
  const token = localStorage.getItem("token");
  const url = `${domain}/categories`;
  axios({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    dispatch({
      type: GET_CATEGORIES_LIST,
      categoriesList: res.data
    });
  });
};

export const getMovieByCategory = (
  nameCategorySelect,
  categoriesList,
  categoriesSelect
) => dispatch => {
  const token = localStorage.getItem("token");
  const categoriesListName = categoriesList.map(cat => cat.name_category);
  // if nameCategory is in categoriesSelect, filtered array
  if (categoriesSelect.indexOf(nameCategorySelect) > -1) {
    // Remove the category
    categoriesSelect = categoriesSelect.filter(
      cat => cat !== nameCategorySelect
    );
    if (categoriesListName.length !== categoriesSelect.length) {
      const categories = categoriesListName.filter(
        cat => !categoriesSelect.includes(cat)
      );
      const url = `${domain}/categories/filtered?categories=${categories}`;
      axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        dispatch({
          type: GET_MOVIE_BY_CATEGORY,
          moviesListFiltered: res.data,
          categoriesSelect: categoriesSelect
        });
      });
    }
  } else {
    // if nameCategory is NOT in categoriesSelect, add category
    //Add the category
    categoriesSelect = [...categoriesSelect, nameCategorySelect];
    if (categoriesListName.length !== categoriesSelect.length) {
      const categories = categoriesListName.filter(
        cat => !categoriesSelect.includes(cat)
      );
      const url = `${domain}/categories/filtered?categories=${categories}`;
      axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        dispatch({
          type: GET_MOVIE_BY_CATEGORY,
          moviesListFiltered: res.data,
          categoriesSelect: categoriesSelect
        });
      });
    } else {
      dispatch({
        type: GET_MOVIE_BY_CATEGORY,
        moviesListFiltered: [],
        categoriesSelect: categoriesListName
      });
    }
  }
};

export const getMoviePoster = name => dispatch => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`;
  if (name.length > 2) {
    axios.get(url).then(res => {
      dispatch({
        type: GET_MOVIE_POSTER,
        getMoviePoster: res.data.results
      });
    });
  }
  if (name.length < 3) {
    dispatch({
      type: GET_MOVIE_POSTER,
      getMoviePoster: {},
      showInfosMovie: false
    });
  }
};

export const getInfosMovie = id => dispatch => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;

  axios.get(url).then(res => {
    let director = [];
    //Search director name
    res.data.credits.crew.map(e =>
      e.job === "Director" ? director.push(e.name) : ""
    );
    dispatch({
      type: GET_INFOS_MOVIE,
      getInfosMovie: {
        name: res.data.original_title,
        director: director[0],
        synopsis: res.data.overview,
        link_poster: `https://image.tmdb.org/t/p/original/${
          res.data.poster_path
        }`,
        release_date: res.data.release_date,
        duration: res.data.runtime,
        category: res.data.genres.length ? res.data.genres[0].name : ""
      },
      showInfosMovie: true
    });
  });
};

export const addMovie = (state, moviesList) => dispatch => {
  const token = localStorage.getItem("token");
  const {
    name,
    director,
    synopsis,
    link_poster,
    release_date,
    duration,
    category
  } = state;
  const url = `${domain}/movies/newmovie`;
  const body = {
    name,
    director,
    synopsis,
    link_poster,
    release_date,
    duration,
    category
  };
  const nameMovies = moviesList.map(e => e.name.toLowerCase());
  // Check if movie is already in collection
  if (nameMovies.includes(state.name.toLowerCase())) {
    dispatch({
      type: ADD_MOVIE,
      nameMovieToAdd: "",
      msgAddMovie: {
        title: "Sorry",
        text:
          "This movie is already in your collection. You can add another movie"
      }
    });
  } else {
    axios({
      method: "POST",
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: body
    }).then(() => {
      dispatch({
        type: ADD_MOVIE,
        nameMovieToAdd: "",
        msgAddMovie: {
          title: "Successful",
          text: "The movie has been added"
        }
      });
    });
  }
};

export const deleteMovie = idMovie => dispatch => {
  const token = localStorage.getItem("token");
  const url = `${domain}/movies/deletemovie/${idMovie}`;
  axios({
    method: "PUT",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    dispatch({
      type: DELETE_MOVIE,
      msgDeletedMovie: {
        title: "Deleted",
        text: "The movie has been deleted"
      },
      idMovie: res.data
    });
  });
};

export const searchMovieToAdd = nameMovieToAdd => dispatch => {
  dispatch({
    type: SEARCH_MOVIE_TO_ADD,
    nameMovieToAdd: nameMovieToAdd,
    msgAddMovie: {
      title: "",
      text: ""
    }
  });
};

export const searchMovieInCollection = nameMovieSearch => dispatch => {
  dispatch({
    type: SEARCH_MOVIE_IN_COLLECTION,
    nameMovieSearch: nameMovieSearch,
    categoriesSelect: []
  });
};
