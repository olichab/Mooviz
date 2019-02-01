import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import convertMinsToHrsMins from "../helpers/convertMinsToHrsMins";

import {
  getMoviesList,
  getCategoriesList,
  getPosterMovie,
  getInfosMovie,
  addMovie
} from "../actions/movieAction";

import "../scss/AddMovie.scss";

const apiKey = process.env.REACT_APP_API_MOVIEDB;

class AddMovie extends Component {
  state = {
    name: "",
    link_poster: "",
    category: "",
    synopsis: "",
    director: "",
    release_date: "",
    duration: "",
    msgMovieExist: "",
    showInfos: false
  };
  componentDidMount() {
    this.props.getCategoriesList();
    this.props.getMoviesList();
  }

  updateForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value.length > 2) {
      this.props.getPosterMovie(e.target.value);
    }
    if (e.target.value.length < 4) {
      this.setState({
        showInfos: false
      });
    }
  };

  // choosePoster = async e => {
  //   const { infosMovie } = this.props;
  //   const idMovie = e.target.id;
  //   const size = Object.keys(infosMovie).length;
  //   this.props.getInfosMovie(e.target.id);
  //   console.log(infosMovie);

  //   if (size > 0) {
  //     let directors = [];
  //     infosMovie.credits.crew.map(e => {
  //       if (e.job === "Director") {
  //         directors.push(e.name);
  //       }
  //     });
  //     this.setState({
  //       name: e.target.name,
  //       link_poster: e.target.src,
  //       synopsis: infosMovie.overview,
  //       director: directors[0],
  //       release_date: infosMovie.release_date,
  //       duration: convertMinsToHrsMins(infosMovie.runtime)
  //     });
  //   }
  // };

  choosePoster = e => {
    const poster_path = e.target.src;
    const idMovie = e.target.id;
    const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${apiKey}&append_to_response=credits`;
    axios.get(url).then(res => {
      const sizeResults = Object.keys(res.data).length;
      const results = res.data;

      if (sizeResults > 0) {
        let directors = [];
        res.data.credits.crew.map(e => {
          if (e.job === "Director") {
            directors.push(e.name);
          }
        });
        this.setState({
          name: results.title,
          link_poster: poster_path,
          synopsis: results.overview,
          director: directors[0],
          release_date: results.release_date,
          duration: convertMinsToHrsMins(results.runtime),
          category: results.genres[0] && results.genres[0].name,
          showInfos: true
        });
      }
    });
  };

  handleSubmit = async e => {
    const { addMovie, moviesList } = this.props;
    const { name, msgMovieExist } = this.state;
    let movieEx = false;
    // Check if movie exist
    moviesList.map(e => {
      if (name.toLowerCase() === e.name.toLowerCase()) {
        console.log("Film existant");
        movieEx = true;
        this.setState({
          msgMovieExist: "This movie is already in your video library"
        });
      }
    });
    if (!movieEx) {
      console.log("yep");
      addMovie(this.state);
      this.setState = {
        name: "",
        link_poster: "",
        category: "",
        synopsis: "",
        director: "",
        release_date: "",
        duration: "",
        category: "",
        msgMovieExist: ""
      };
      window.location.reload();
    }
  };

  render() {
    const { categoriesList, posterMovie } = this.props;
    const { name, category, msgMovieExist, showInfos } = this.state;
    console.log(posterMovie.results);

    return (
      <div className="add-movie container-fluid mt-4 mb-5">
        <div className="row justify-content-center">
          <div className="col col-sm-8 col-md-6">
            <form>
              <div className="form-group">
                <label htmlFor="form-nameMovie">Search a movie to add</label>
                <input
                  type="name"
                  className="form-control"
                  id="nameMovie"
                  name="name"
                  placeholder="Ex: Inception"
                  value={this.state.name}
                  onChange={this.updateForm}
                />
              </div>

              <div className="poster-movies-container row justify-content-around">
                {posterMovie.results &&
                  posterMovie.results.map(
                    e =>
                      e.poster_path &&
                      name.length > 2 && (
                        <div
                          className="col-6 col-md-3 col-lg-2 poster-movie"
                          key={e.id}
                          value={this.state.link_poster}
                          onClick={this.choosePoster}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${
                              e.poster_path
                            }`}
                            alt="Movie poster"
                            name={e.title}
                            id={e.id}
                          />
                        </div>
                      )
                  )}
              </div>
              {showInfos && (
                <div>
                  <div className="form-group">
                    <label htmlFor="select-category">Category</label>
                    <select
                      className="custom-select"
                      id="select-category"
                      aria-label="Example select with button addon"
                      name="category"
                      defaultValue={category}
                      // onChange={this.updateForm}
                    >
                      <option defaultValue>
                        {category !== "" ? category : "Choose a category..."}
                      </option>
                      {categoriesList.length &&
                        categoriesList.map(e => (
                          <option key={e.id_category} value={e.name_category}>
                            {e.name_category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="textarea-synopsis">Synopsis</label>
                    <textarea
                      className="form-control"
                      id="textarea-synopsis"
                      rows="4"
                      name="synopsis"
                      value={this.state.synopsis || ""}
                      onChange={this.updateForm}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-director">Director</label>
                    <input
                      type="name"
                      className="form-control"
                      id="input-director"
                      placeholder="Ex: Christopher Nolan"
                      name="director"
                      value={this.state.director || ""}
                      onChange={this.updateForm}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-date">Release date</label>
                    <input
                      type="name"
                      className="form-control"
                      id="input-date"
                      placeholder="Ex: 2019-01-23"
                      name="date"
                      value={this.state.release_date || ""}
                      onChange={this.updateForm}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-duration">Duration</label>
                    <input
                      type="name"
                      className="form-control"
                      id="input-duration"
                      placeholder="(in minutes)"
                      name="duration"
                      value={this.state.duration || ""}
                      onChange={this.updateForm}
                    />
                  </div>

                  {msgMovieExist !== "" && (
                    <div className="alert alert-danger" role="alert">
                      {msgMovieExist}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={this.handleSubmit}
                  >
                    Add new movie
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesList: state.movieReducer.moviesList,
  categoriesList: state.movieReducer.categoriesList,
  posterMovie: state.movieReducer.posterMovie,
  infosMovie: state.movieReducer.infosMovie
});

export default connect(
  mapStateToProps,
  {
    getMoviesList,
    getCategoriesList,
    getPosterMovie,
    getInfosMovie,
    addMovie
  }
)(AddMovie);
