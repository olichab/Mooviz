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
} from "../actions/types";

const initialState = {
  moviesList: [],
  categoriesList: [],
  movieByCategory: [],
  categoriesSelect: [],
  moviePoster: {},
  infosMovie: {},
  nameMovieSearch: "",
  nameMovieToAdd: "",
  msgAddMovie: { title: "", text: "" },
  showInfosMovie: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.getMoviesList,
        categoriesSelect: action.categoriesSelect
      };
    case CLEAR_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.moviesList,
        categoriesSelect: action.categoriesSelect
      };
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.getCategoriesList
      };
    case GET_MOVIE_BY_CATEGORY:
      return {
        ...state,
        moviesList: action.moviesList,
        categoriesSelect: action.categoriesSelect
      };
    case GET_RANDOM_MOVIE:
      return {
        ...state,
        moviesList: action.getRandomMovie
      };
    case GET_MOVIE_POSTER:
      return {
        ...state,
        moviePoster: action.getMoviePoster,
        showInfosMovie: action.showInfosMovie
      };
    case GET_INFOS_MOVIE:
      return {
        ...state,
        infosMovie: action.getInfosMovie,
        showInfosMovie: action.showInfosMovie
      };
    case ADD_MOVIE:
      return {
        ...state,
        msgAddMovie: action.msgAddMovie,
        nameMovieToAdd: action.nameMovieToAdd
      };
    case DELETE_MOVIE:
      return {
        ...state
      };
    case SEARCH_MOVIE_TO_ADD:
      return {
        ...state,
        msgAddMovie: action.msgAddMovie,
        nameMovieToAdd: action.nameMovieToAdd
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
