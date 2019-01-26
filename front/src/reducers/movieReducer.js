import {
  GET_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  GET_MOVIE_BY_CATEGORY,
  GET_MOVIE_BY_NAME,
  DELETE_MOVIE,
  GET_RANDOM_MOVIE
} from "../actions/types";

const initialState = {
  moviesList: [],
  categoriesList: [],
  movieByCategory: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.getMoviesList
      };
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.getCategoriesList
      };
    case GET_MOVIE_BY_CATEGORY:
      return {
        ...state,
        moviesList: action.getMovieByCategory
      };
    case GET_MOVIE_BY_NAME:
      return {
        ...state,
        moviesList: action.getMovieByName
      };
    case GET_RANDOM_MOVIE:
      return {
        ...state,
        moviesList: action.getRandomMovie
      };
    case DELETE_MOVIE:
      return {
        ...state
      };
    default:
      return state;
  }
}
