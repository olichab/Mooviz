export interface IMovie {
  idMovie?: number;
  name: string;
  director: string;
  synopsis: string;
  linkPoster: string;
  releaseDate: Date | null;
  duration: number | null;
  nameCategory: string;
}

export interface ICategorie {
  idCategory: number;
  nameCategory: string;
}

export interface IInfosMovieByName {
  id: number;
  name: string;
  linkPoster: string;
}

export interface IToastMsg {
  title: string;
  text: string;
}

export interface IMovieState {
  loading: boolean;
  moviesList: IMovie[];
  moviesListFiltered: IMovie[];
  categoriesList: ICategorie[];
  categoriesSelected: string[];
  infosMovieByName: IInfosMovieByName[];
  infosMovie: IMovie;
  randomMovie: IMovie;
  showModal: boolean;
  showModalRandom: boolean;
  showModalAddMovie: boolean;
  nameMovieSearch: string;
  nameMovieToAdd: string;
  toastMsg: IToastMsg;
}

export const GET_MOVIES_LIST = 'GET_MOVIES_LIST';
export const CLEAR_MOVIES_LIST = 'CLEAR_MOVIES_LIST';
export const GET_CATEGORIES_LIST = 'GET_CATEGORIES_LIST';
export const GET_MOVIE_BY_CATEGORY = 'GET_MOVIE_BY_CATEGORY';
export const GET_RANDOM_MOVIE = 'GET_RANDOM_MOVIE';
export const GET_INFOS_MOVIE_BY_NAME = 'GET_INFOS_MOVIE_BY_NAME';
export const GET_INFOS_MOVIE = 'GET_INFOS_MOVIE';
export const ADD_MOVIE = 'ADD_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const SEARCH_MOVIE_TO_ADD = 'SEARCH_MOVIE_TO_ADD';
export const SEARCH_MOVIE_IN_COLLECTION = 'SEARCH_MOVIE_IN_COLLECTION';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const DISPLAY_MODAL_RANDOM = 'DISPLAY_MODAL_RANDOM';
export const DISPLAY_MODAL_ADD_MOVIE = 'DISPLAY_MODAL_ADD_MOVIE';
export const HIDE_MODAL = 'HIDE_MODAL';
export const RESET_TOAST_MESSAGE = 'RESET_TOAST_MESSAGE';

interface IGetMoviesListAction {
  type: typeof GET_MOVIES_LIST;
  loading: boolean;
  moviesList: IMovie[];
  moviesListfiltered: IMovie[];
  categoriesSelected: string[];
}

interface IClearMoviesListAction {
  type: typeof CLEAR_MOVIES_LIST;
  moviesListfiltered: IMovie[];
  categoriesSelected: string[];
}

interface IGetCategoriesListAction {
  type: typeof GET_CATEGORIES_LIST;
  categoriesList: ICategorie[];
}

interface IGetMovieByCategoryAction {
  type: typeof GET_MOVIE_BY_CATEGORY;
  nameCategorySelect: string;
  categoriesSelected: string[];
}

interface IGetRandomMovieAction {
  type: typeof GET_RANDOM_MOVIE;
  randomMovie: IMovie;
}

interface IGetInfosMovieByNameAction {
  type: typeof GET_INFOS_MOVIE_BY_NAME;
  infosMovieByName: IInfosMovieByName[];
}

interface IGetInfosMovieAction {
  type: typeof GET_INFOS_MOVIE;
  infosMovie: IMovie;
}

interface IAddMovieAction {
  type: typeof ADD_MOVIE;
  nameMovieToAdd: string;
  infosMovieByName: IInfosMovieByName[];
  toastMsg: IToastMsg;
}

interface IDeleteMovieAction {
  type: typeof DELETE_MOVIE;
  idMovie: number;
  moviesListFiltered: IMovie[];
  nameMovieSearch: string;
  toastMsg: IToastMsg;
}

interface ISearchMovieToAddAction {
  type: typeof SEARCH_MOVIE_TO_ADD;
  nameMovieToAdd: string;
}

interface ISearchMovieInCollectionAction {
  type: typeof SEARCH_MOVIE_IN_COLLECTION;
  moviesListFiltered: IMovie[];
  categoriesSelected: string[];
  nameMovieSearch: string;
}

interface IDisplayModal {
  type: typeof DISPLAY_MODAL;
  showModal: boolean;
  movieToDisplay: IMovie;
}

interface IDisplayModalRandom {
  type: typeof DISPLAY_MODAL_RANDOM;
  showModalRandom: boolean;
}

interface IDisplayModalAddMovie {
  type: typeof DISPLAY_MODAL_ADD_MOVIE;
  showModalAddMovie: boolean;
}

interface IHideModal {
  type: typeof HIDE_MODAL;
  showModal: boolean;
}

interface IResetToastMessageAction {
  type: typeof RESET_TOAST_MESSAGE;
  toastMsg: IToastMsg;
}

export type MovieActionTypes =
  | IGetMoviesListAction
  | IClearMoviesListAction
  | IGetCategoriesListAction
  | IGetMovieByCategoryAction
  | IGetRandomMovieAction
  | IGetInfosMovieByNameAction
  | IGetInfosMovieAction
  | IAddMovieAction
  | IDeleteMovieAction
  | ISearchMovieToAddAction
  | ISearchMovieInCollectionAction
  | IDisplayModal
  | IDisplayModalRandom
  | IDisplayModalAddMovie
  | IHideModal
  | IResetToastMessageAction;
