import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }

  handleDeleteMovie = () => {
    const { data } = this.props;
    this.props.deleteMovie(data.id_movie);
    window.location.reload();
  };

  handleMore = () => {
    const { showMore } = this.state;
    this.setState({
      showMore: !showMore
    });
  };

  render() {
    const { data } = this.props;
    const { showMore } = this.state;

    return (
      <div>
        <div className="card cardMovie">
          {data && (
            <img
              src={data.link_poster}
              className="card-img-top"
              alt="Movie poster"
              data-toggle="collapse"
              data-target={`#A${data.id_movie}`}
              aria-controls={`#A${data.id_movie}`}
              aria-expanded="true"
            />
          )}
        </div>
        {data && (
          <div
            className="collapse card-info"
            id={`A${data.id_movie}`}
            aria-labelledby={`A${data.id_movie}`}
            data-parent="#accordionExample"
          >
            <div className="card-body justify-content-center">
              <h5 className="card-title">{data.name}</h5>

              {!showMore && <p className="card-text h-75">{data.synopsis}</p>}
              {showMore && (
                <ul className="list-group list-group-flush h-75 card-text">
                  <li className="list-group-item">
                    <b>Category:</b> <br />
                    {data.name_category}
                  </li>
                  <li className="list-group-item">
                    <b>Director:</b>
                    <br />
                    {data.director}
                  </li>
                  <li className="list-group-item">
                    <b>Release date:</b>
                    <br />
                    {` ${dateFormat(data.release_date, "yyyy-mm-dd")}`}
                  </li>
                  <li className="list-group-item">
                    <b>Duration:</b>
                    <br />
                    {data.duration}
                  </li>
                </ul>
              )}

              <div className="row cardButton">
                <div className="col-6">
                  {!showMore && (
                    <button
                      type="button"
                      className="btn"
                      onClick={this.handleMore}
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="iconBrown" />
                    </button>
                  )}
                  {showMore && (
                    <button
                      type="button"
                      className="btn"
                      onClick={this.handleMore}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="iconBrown" />
                    </button>
                  )}
                </div>
                <div className="col-6">
                  <button type="button" className="btn" onClick={this.handleDeleteMovie}>
                    <FontAwesomeIcon icon={faTrashAlt} className="iconRed" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteMovie }
)(Movie);
