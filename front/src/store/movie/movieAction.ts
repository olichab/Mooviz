import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

import {
  IMovie,
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
  DISPLAY_MODAL,
  DISPLAY_MODAL_RANDOM,
  DISPLAY_MODAL_ADD_MOVIE,
  HIDE_MODAL,
  RESET_TOAST_MESSAGE,
} from './types';

const domain = process.env.REACT_APP_DOMAIN_NAME;
const apiKey = process.env.REACT_APP_API_MOVIEDB;

export const getMoviesList = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch) => {
  const url = `${domain}/movies`;
  const token = localStorage.getItem('token') || '';
  axios({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_MOVIES_LIST,
        loading: false,
        moviesList: res.data,
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const clearMoviesList = () => ({
  type: CLEAR_MOVIES_LIST,
});

export const getRandomMovie = () => ({
  type: GET_RANDOM_MOVIE,
});

export const getCategoriesList = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch) => {
  const token = localStorage.getItem('token') || '';
  const url = `${domain}/categories`;
  axios({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES_LIST,
        categoriesList: res.data,
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const getMovieByCategory = (nameCategorySelect: string) => ({
  type: GET_MOVIE_BY_CATEGORY,
  nameCategorySelect,
});

export const getInfosMovieByName = (
  nameMovie: string,
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nameMovie}`;
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_INFOS_MOVIE_BY_NAME,
        infosMovieByName: res.data.results.map((movie) => ({
          id: movie.id,
          name: movie.original_title,
          linkPoster: movie.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : '',
        })),
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const getInfosMovie = (
  id: number,
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
  axios
    .get(url)
    .then((res) => {
      const director: string[] = [];
      // Search director name
      res.data.credits.crew.map((e) => (e.job === 'Director' ? director.push(e.name) : ''));
      dispatch({
        type: GET_INFOS_MOVIE,
        infosMovie: {
          name: res.data.original_title,
          director: director[0],
          synopsis: res.data.overview,
          linkPoster: `https://image.tmdb.org/t/p/original/${res.data.poster_path}`,
          releaseDate: res.data.release_date,
          duration: res.data.runtime,
          nameCategory: res.data.genres.length ? res.data.genres[0].name : '',
        },
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const addMovie = (
  movieInfos: IMovie,
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch,
  getState,
) => {
  const token = localStorage.getItem('token') || '';
  const url = `${domain}/movies/newmovie`;
  const {
    name,
    director,
    synopsis,
    linkPoster,
    releaseDate,
    duration,
    nameCategory,
  } = movieInfos;
  const body = {
    name,
    director,
    synopsis,
    linkPoster,
    releaseDate,
    duration,
    nameCategory,
  };
  const nameMovies = getState().movie.moviesList.map((e) => e.name.toLowerCase());
  // Check if movie is already in collection
  if (nameMovies.includes(movieInfos.name.toLowerCase())) {
    dispatch({
      type: ADD_MOVIE,
      toastMsg: {
        title: 'Sorry',
        text: 'This movie is already in your collection',
      },
    });
  } else {
    axios({
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    })
      .then((res) => {
        dispatch({
          type: ADD_MOVIE,
          toastMsg: {
            title: 'Successful',
            text: res.data && res.data.message,
          },
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }
};

export const deleteMovie = (
  idMovie: number,
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const token = localStorage.getItem('token') || '';
  const url = `${domain}/movies/deletemovie/${idMovie}`;
  axios({
    method: 'PUT',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: DELETE_MOVIE,
        idMovie: res.data.id,
        toastMsg: {
          title: 'Deleted',
          text: res.data && res.data.message,
        },
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const searchMovieToAdd = (nameMovieToAdd: string) => ({
  type: SEARCH_MOVIE_TO_ADD,
  nameMovieToAdd,
});

export const searchMovieInCollection = (nameMovieSearch: string) => ({
  type: SEARCH_MOVIE_IN_COLLECTION,
  nameMovieSearch,
});

export const displayModal = (movieToDisplay: IMovie) => ({
  type: DISPLAY_MODAL,
  movieToDisplay,
});

export const displayModalRandom = () => ({
  type: DISPLAY_MODAL_RANDOM,
});

export const displayModalAddMovie = () => ({
  type: DISPLAY_MODAL_ADD_MOVIE,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const resetToastMessage = () => ({
  type: RESET_TOAST_MESSAGE,
});
