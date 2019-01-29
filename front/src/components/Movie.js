import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";

import { deleteMovie } from "../actions/movieAction";

import "../scss/Movie.scss";

dateFormat.i18n = {
  dayNames: [
    "Dim",
    "Lun",
    "Mar",
    "Mer",
    "Jeu",
    "Ven",
    "Sam",
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
  ],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aut",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
};

class Movie extends Component {
  handleDeleteMovie = () => {
    const { data } = this.props;
    this.props.deleteMovie(data.id_movie);
    window.location.reload();
  };

  
      

  render() {
    const { data } = this.props;

    return (
      <div>
        <div className="card cardMovie">
          <img
            src={data.link_poster}
            className="card-img-top"
            alt="Movie poster"
            data-toggle="collapse"
            data-target={`#A${data.id_movie}`}
            aria-controls={`#A${data.id_movie}`}
            aria-expanded="false"
          />
          <div className="collapse" id={`A${data.id_movie}`} aria-labelledby={`A${data.id_movie}`} data-parent="#accordionExample">
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">{data.synopsis}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Category:</b> {data.name_category}
              </li>
              <li className="list-group-item">
                <b>Director:</b> {data.director}
              </li>
              <li className="list-group-item">
                <b>Release date:</b>
                {` ${dateFormat(data.release_date, "yyyy-mm-dd")}`}
              </li>
              <li className="list-group-item">
                <b>Duration:</b> {data.duration}
              </li>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteMovie }
)(Movie);
