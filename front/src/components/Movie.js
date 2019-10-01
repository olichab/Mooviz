import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import convertMinsToHrsMins from "../helpers/convertMinsToHrsMins";

import { deleteMovie } from "../actions/movieAction";

import "../scss/Movie.scss";

class Movie extends Component {
  state = {
    showMore: false,
    classShowCard: ""
  };

  handleSeeMore = () => {
    const { showMore } = this.state;
    this.setState({
      showMore: !showMore
    });
  };

  handleDeleteMovie = () => {
    const { movie } = this.props;
    this.props.deleteMovie(movie.id_movie);
    window.location.reload();
  };

  handleOpenCard = () => {
    this.setState({
      classShowCard: "show"
    });
  };

  handleCloseCard = () => {
    this.setState({
      showMore: false,
      classShowCard: "hide"
    });
  };

  render() {
    const { movie } = this.props;
    const { showMore, classShowCard } = this.state;

    return (
      <div>
        <div className="card cardMovie">
          <img
            src={movie.link_poster}
            className="card-img"
            alt="Movie poster"
            movie-toggle="collapse"
            movie-target={`#A${movie.id_movie}`}
            aria-controls={`#A${movie.id_movie}`}
            aria-expanded="true"
            onClick={this.handleOpenCard}
          />
        </div>
        <div
          className={`collapse card-info ${classShowCard}`}
          id={`A${movie.id_movie}`}
          aria-labelledby={`A${movie.id_movie}`}
          movie-parent="#accordionMovie"
        >
          <div className="card-body justify-content-center">
            <h5 className="card-title">{movie.name}</h5>
            {!showMore && (
              <p className="card-text h-75">
                {movie.synopsis || "Synopsis not available"}
              </p>
            )}
            {showMore && (
              <ul className="list-group list-group-flush h-75 card-text">
                <li className="list-group-item">
                  <b>Category:</b> <br />
                  {movie.name_category}
                </li>
                <li className="list-group-item">
                  <b>Director:</b>
                  <br />
                  {movie.director || "N/A"}
                </li>
                <li className="list-group-item">
                  <b>Release date:</b>
                  <br />
                  {` ${
                    movie.release_date
                      ? dateFormat(movie.release_date, "yyyy-mm-dd")
                      : "N/A"
                  }`}
                </li>
                <li className="list-group-item">
                  <b>Duration:</b>
                  <br />
                  {convertMinsToHrsMins(movie.duration) || "N/A"}
                </li>
              </ul>
            )}

            <div className="row cardButton">
              <div className="col-4">
                {!showMore && (
                  <button
                    type="button"
                    className="btn"
                    onClick={this.handleSeeMore}
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="iconBrown"
                    />
                  </button>
                )}
                {showMore && (
                  <button
                    type="button"
                    className="btn"
                    onClick={this.handleSeeMore}
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="iconBrown"
                    />
                  </button>
                )}
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn"
                  onClick={this.handleDeleteMovie}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="iconRed" />
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn"
                  onClick={this.handleCloseCard}
                >
                  <FontAwesomeIcon icon={faTimesCircle} className="iconBrown" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteMovie }
)(Movie);
