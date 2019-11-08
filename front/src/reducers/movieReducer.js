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
} from "../actions/types";

const initialState = {
  loading: true,
  moviesList: [],
  moviesListFiltered: [],
  categoriesList: [],
  movieByCategory: [],
  categoriesSelect: [],
  infosMovieByName: {},
  infosMovie: {},
  randomMovie: {},
  nameMovieSearch: "",
  nameMovieToAdd: "",
  toastMsg: { title: "", text: "" }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        loading: action.isLoading,
        moviesList: action.moviesList,
        moviesListFiltered: action.moviesList,
        categoriesSelect: []
      };
    case CLEAR_MOVIES_LIST:
      return {
        ...state,
        moviesListFiltered: [],
        categoriesSelect: action.categoriesSelect
      };
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.categoriesList
      };
    case GET_MOVIE_BY_CATEGORY:
      return {
        ...state,
        loading: action.loading,
        moviesListFiltered: action.moviesListFiltered
          ? action.moviesListFiltered
          : [],
        categoriesSelect: action.categoriesSelect
      };
    case GET_RANDOM_MOVIE:
      const randomMovie =
        state.moviesList[Math.floor(Math.random() * state.moviesList.length)];
      return {
        ...state,
        randomMovie: randomMovie
      };
    case GET_INFOS_MOVIE_BY_NAME:
      return {
        ...state,
        infosMovieByName: action.infosMovieByName
      };
    case GET_INFOS_MOVIE:
      return {
        ...state,
        infosMovie: action.infosMovie
      };
    case ADD_MOVIE:
      return {
        ...state,
        nameMovieToAdd: "",
        toastMsg: action.toastMsg ? action.toastMsg : { title: "", text: "" }
      };
    case DELETE_MOVIE:
      state.moviesList = state.moviesList.filter(
        e => e.id_movie !== action.idMovie
      );
      return {
        ...state,
        moviesListFiltered: state.moviesList,
        nameMovieSearch: "",
        toastMsg: action.toastMsg ? action.toastMsg : { title: "", text: "" }
      };
    case SEARCH_MOVIE_TO_ADD:
      return {
        ...state,
        nameMovieToAdd: action.nameMovieToAdd
      };
    case SEARCH_MOVIE_IN_COLLECTION:
      state.moviesListFiltered = state.moviesList.filter(movie =>
        movie.name.toLowerCase().includes(action.nameMovieSearch.toLowerCase())
      );
      return {
        ...state,
        moviesListFiltered: state.moviesListFiltered,
        categoriesSelect: action.categoriesSelect,
        nameMovieSearch: action.nameMovieSearch
      };
    case RESET_TOAST_MESSAGE:
      return {
        ...state,
        toastMsg: { title: "", text: "" }
      };
    default:
      return state;
  }
}
