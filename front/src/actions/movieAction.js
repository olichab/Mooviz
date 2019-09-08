import axios from "axios";
import {
  GET_MOVIES_LIST,
  CLEAR_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_CHOOSE,
  DELETE_MOVIE,
  GET_MOVIE_BY_CATEGORY,
  GET_RANDOM_MOVIE,
  GET_MOVIE_BY_NAME,
  GET_POSTER_MOVIE,
  GET_INFOS_MOVIE,
  ADD_MOVIE
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;
const apiKey = process.env.REACT_APP_API_MOVIEDB;

export const getMoviesList = () => dispatch => {
  const url = `${domain}/movies`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_MOVIES_LIST,
      getMoviesList: res.data
    });
  });
};

export const clearMoviesList = () => dispatch => {
  dispatch({
    type: CLEAR_MOVIES_LIST,
    clearMoviesList: []
  });
};

export const getRandomMovie = () => dispatch => {
  const url = `${domain}/movies/random`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_RANDOM_MOVIE,
      getRandomMovie: res.data
    });
  });
};

export const getCategoriesList = () => dispatch => {
  const url = `${domain}/categories`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_CATEGORIES_LIST,
      getCategoriesList: res.data.map(n =>
        n.name_category)
    });
  });
};

export const getMovieByName = nameMovie => dispatch => {
  const url = `${domain}/movies/movie/${nameMovie}`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_MOVIE_BY_NAME,
      getMovieByName: res.data
    });
  });
};

export const getMovieByCategory = categories => dispatch => {
  const url = `${domain}/categories/${categories}`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_MOVIE_BY_CATEGORY,
      getMovieByCategory: res.data
    });
  });
};

export const getPosterMovie = name => dispatch => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_POSTER_MOVIE,
      getPosterMovie: res.data
    });
  });
};

export const getInfosMovie = id => dispatch => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_INFOS_MOVIE,
      getInfosMovie: res.data
    });
  });
};

export const addMovie = state => dispatch => {
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
  axios({
    method: "POST",
    url,
    data: body
  }).then(() => {
    dispatch({
      type: ADD_MOVIE
    });
  });
};

export const deleteMovie = idMovie => dispatch => {
  const url = `${domain}/movies/deletemovie/${idMovie}`;
  axios.put(url).then(() => {
    dispatch({
      type: DELETE_MOVIE
    });
  });
};
