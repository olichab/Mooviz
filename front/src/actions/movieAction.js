import axios from "axios";
import {
  GET_MOVIES_LIST,
  GET_CATEGORIES_LIST,
  DELETE_MOVIE,
  GET_MOVIE_BY_CATEGORY,
  GET_RANDOM_MOVIE,
  GET_MOVIE_BY_NAME
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;

export const getMoviesList = () => dispatch => {
  const url = `${domain}/movies`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_MOVIES_LIST,
      getMoviesList: res.data
    });
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
      getCategoriesList: res.data
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

export const getMovieByCategory = category => dispatch => {
  const url = `${domain}/categories/${category}`;
  axios.get(url).then(res => {
    dispatch({
      type: GET_MOVIE_BY_CATEGORY,
      getMovieByCategory: res.data
    });
  });
};

export const deleteMovie = idMovie => dispatch => {
  const url = `${domain}/movies/deletemovie/${idMovie}`;
  axios.put(url).then(res => {
    dispatch({
      type: DELETE_MOVIE
    });
  });
};

// export const postNewOffer = values => dispatch => {
//   const { title, contract_type, place, description, is_published } = values;
//   const questionsList = [];
//   for (let prop in values) {
//     if (prop.includes("question") && values[prop]) {
//       questionsList.push(prop.substr(8));
//     }
//   }
//   const body = {
//     title,
//     contract_type,
//     place,
//     description,
//     is_published
//   };
//   const url = `${domain}api/offers?questions=${questionsList}`;
//   axios({
//     method: "POST",
//     url,
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     data: body
//   })
//     .then(() => {
//       dispatch({
//         type: POST_NEW_OFFER
//       });
//     })
//     .catch(err => {
//       throw err;
//     });
// };
