import {
  GET_MOVIES_LIST,
  CLEAR_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  GET_MOVIE_BY_CATEGORY,
  GET_RANDOM_MOVIE,
  GET_POSTER_MOVIE,
  GET_INFOS_MOVIE,
  ADD_MOVIE,
  DELETE_MOVIE,
  SEARCH_MOVIE_IN_COLLECTION
} from "../actions/types";

const initialState = {
  moviesList: [],
  categoriesList: [],
  movieByCategory: [],
  posterMovie: {},
  infosMovie: {},
  nameMovieSearch: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.getMoviesList
      };
    case CLEAR_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.clearMoviesList
      };
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.getCategoriesList.map(n => n.name_category)
      };
    case GET_MOVIE_BY_CATEGORY:
      return {
        ...state,
        moviesList: action.getMovieByCategory
      };
    case GET_RANDOM_MOVIE:
      return {
        ...state,
        moviesList: action.getRandomMovie
      };
    case GET_POSTER_MOVIE:
      return {
        ...state,
        posterMovie: action.getPosterMovie
      };
    case GET_INFOS_MOVIE:
      return {
        ...state,
        infosMovie: action.getInfosMovie
      };
    case ADD_MOVIE:
      return {
        ...state
      };
    case DELETE_MOVIE:
      return {
        ...state
      };
    case SEARCH_MOVIE_IN_COLLECTION:
      return {
        ...state,
        nameMovieSearch: action.nameMovieSearch
      };
    default:
      return state;
  }
}
