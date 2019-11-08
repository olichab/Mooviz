import axios from "axios";

import {
  GET_MOVIES_LIST,
  CLEAR_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  GET_MOVIE_BY_CATEGORY,
  GET_RANDOM_MOVIE,
  GET_INFOS_MOVIE_BY_NAME,
  GET_INFOS_MOVIE,
  ADD_MOVIE,
  DELETE_MOVIE,
  SEARCH_MOVIE_TO_ADD,
  SEARCH_MOVIE_IN_COLLECTION,
  RESET_TOAST_MESSAGE
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;
const apiKey = process.env.REACT_APP_API_MOVIEDB;

export const getMoviesList = () => dispatch => {
  const url = `${domain}/movies`;
  const token = localStorage.token;

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
        loading: false,
        moviesList: res.data
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
    categoriesSelect: categoriesListName
  });
};

export const getRandomMovie = () => dispatch => {
  dispatch({
    type: GET_RANDOM_MOVIE
  });
};

export const getCategoriesList = () => dispatch => {
  const token = localStorage.token;
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
  const token = localStorage.token;
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
        categoriesSelect: categoriesListName
      });
    }
  }
};

export const getInfosMovieByName = name => dispatch => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`;
  if (name.length > 2) {
    axios.get(url).then(res => {
      dispatch({
        type: GET_INFOS_MOVIE_BY_NAME,
        infosMovieByName: res.data.results.map(res => ({
          id: res.id,
          name: res.original_title,
          link_poster: res.poster_path
            ? `https://image.tmdb.org/t/p/original/${res.poster_path}`
            : ""
        }))
      });
    });
  }
  if (name.length < 3) {
    dispatch({
      type: GET_INFOS_MOVIE_BY_NAME,
      infosMovieByName: {}
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
      infosMovie: {
        name: res.data.original_title,
        director: director[0],
        synopsis: res.data.overview,
        link_poster: `https://image.tmdb.org/t/p/original/${res.data.poster_path}`,
        release_date: res.data.release_date,
        duration: res.data.runtime,
        name_category: res.data.genres.length ? res.data.genres[0].name : ""
      }
    });
  });
};

export const addMovie = (state, moviesList) => dispatch => {
  const token = localStorage.token;
  const {
    name,
    director,
    synopsis,
    link_poster,
    release_date,
    duration,
    name_category
  } = state;
  const url = `${domain}/movies/newmovie`;
  const body = {
    name,
    director,
    synopsis,
    link_poster,
    release_date,
    duration,
    name_category
  };
  const nameMovies = moviesList.map(e => e.name.toLowerCase());
  // Check if movie is already in collection
  if (nameMovies.includes(state.name.toLowerCase())) {
    dispatch({
      type: ADD_MOVIE,
      toastMsg: {
        title: "Sorry",
        text: "This movie is already in your collection"
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
    }).then(res => {
      dispatch({
        type: ADD_MOVIE,
        toastMsg: {
          title: "Successful",
          text: res.data ? res.data.message : "Toto"
        }
      });
    });
  }
};

export const deleteMovie = idMovie => dispatch => {
  const token = localStorage.token;
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
      idMovie: res.data ? res.data.id : "" ,
      toastMsg: {
        title: "Deleted",
        text: res.data ? res.data.message : ""
      }
    });
  });
};

export const searchMovieToAdd = nameMovieToAdd => dispatch => {
  dispatch({
    type: SEARCH_MOVIE_TO_ADD,
    nameMovieToAdd: nameMovieToAdd
  });
};

export const searchMovieInCollection = nameMovieSearch => dispatch => {
  dispatch({
    type: SEARCH_MOVIE_IN_COLLECTION,
    nameMovieSearch: nameMovieSearch,
    categoriesSelect: []
  });
};

export const resetToastMessage = () => dispatch => {
  dispatch({
    type: RESET_TOAST_MESSAGE
  });
};
