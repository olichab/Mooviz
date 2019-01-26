import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteMovie } from "../actions/movieAction";

import "../scss/Movie.scss";

class Movie extends Component {
  handleDeleteMovie = () => {
    const { data } = this.props;
    this.props.deleteMovie(data.id_movie);
    window.location.reload();
  };
  render() {
    const { data } = this.props;

    return (
      <div className="card cardMovie">
        <img
          src={data.link_poster}
          className="card-img-top"
          alt="Movie poster"
          data-toggle="collapse"
          data-target={"#id" + data.id_movie}
          aria-expanded="false"
          aria-controls="collapseExample"
        />
        <div className="collapse" id={"id" + data.id_movie}>
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{data.synopsis}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: {data.name_category}</li>
            <li className="list-group-item">Director: {data.director}</li>
            <li className="list-group-item">
              Release date: {data.release_date}
            </li>
            <li className="list-group-item">Duration: {data.duration}</li>
          </ul>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={this.handleDeleteMovie}
            >
              Delete
            </button>
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
