import {
  IMovieState,
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
  MovieActionTypes,
} from './types';

const initialState: IMovieState = {
  loading: true,
  moviesList: [],
  moviesListFiltered: [],
  categoriesList: [],
  categoriesSelected: [],
  infosMovieByName: [],
  infosMovie: {
    name: '',
    director: '',
    synopsis: '',
    linkPoster: '',
    releaseDate: null,
    duration: null,
    nameCategory: '',
  },
  randomMovie: {
    name: '',
    director: '',
    synopsis: '',
    linkPoster: '',
    releaseDate: null,
    duration: null,
    nameCategory: '',
  },
  showModal: false,
  showModalRandom: false,
  showModalAddMovie: false,
  nameMovieSearch: '',
  nameMovieToAdd: '',
  toastMsg: { title: '', text: '' },
};

export default function movieReducer(
  state = initialState,
  action: MovieActionTypes,
): IMovieState {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        loading: action.loading,
        moviesList: action.moviesList,
        moviesListFiltered: action.moviesList,
        categoriesSelected: [],
      };
    case CLEAR_MOVIES_LIST:
      return {
        ...state,
        moviesListFiltered: state.moviesList,
        categoriesSelected: state.categoriesList.map((cat) => cat.nameCategory),
      };
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.categoriesList,
      };
    case GET_MOVIE_BY_CATEGORY:
      return {
        ...state,
        categoriesSelected:
          state.categoriesSelected.indexOf(action.nameCategorySelect) > -1
            ? state.categoriesSelected.filter(
              (cat) => cat !== action.nameCategorySelect,
            )
            : [...state.categoriesSelected, action.nameCategorySelect],
      };
    case GET_RANDOM_MOVIE:
      return {
        ...state,
        randomMovie:
          state.moviesList[Math.floor(Math.random() * state.moviesList.length)],
      };

    case GET_INFOS_MOVIE_BY_NAME:
      return {
        ...state,
        infosMovieByName: action.infosMovieByName,
      };
    case GET_INFOS_MOVIE:
      return {
        ...state,
        infosMovie: action.infosMovie,
      };
    case ADD_MOVIE:
      return {
        ...state,
        nameMovieToAdd: '',
        infosMovieByName: [],
        toastMsg: action.toastMsg,
      };
    case DELETE_MOVIE: {
      // eslint-disable-next-line no-param-reassign
      state.moviesList = state.moviesList.filter(
        (e) => e.idMovie !== action.idMovie,
      );
      return {
        ...state,
        moviesListFiltered: state.moviesList,
        nameMovieSearch: '',
        toastMsg: action.toastMsg,
      };
    }
    case SEARCH_MOVIE_TO_ADD:
      return {
        ...state,
        nameMovieToAdd: action.nameMovieToAdd,
      };
    case SEARCH_MOVIE_IN_COLLECTION: {
      // eslint-disable-next-line no-param-reassign
      state.moviesListFiltered = state.moviesList.filter((movie) => movie.name.toLowerCase().includes(action.nameMovieSearch.toLowerCase()),);
      return {
        ...state,
        moviesListFiltered: state.moviesListFiltered,
        categoriesSelected: [],
        nameMovieSearch: action.nameMovieSearch,
      };
    }
    case DISPLAY_MODAL:
      return {
        ...state,
        showModal: true,
        infosMovie: action.movieToDisplay,
      };
    case DISPLAY_MODAL_RANDOM:
      return {
        ...state,
        showModalRandom: true,
      };
    case DISPLAY_MODAL_ADD_MOVIE:
      return {
        ...state,
        showModalAddMovie: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        showModalRandom: false,
        showModalAddMovie: false,
      };
    case RESET_TOAST_MESSAGE:
      return {
        ...state,
        toastMsg: { title: '', text: '' },
      };
    default:
      return state;
  }
}
