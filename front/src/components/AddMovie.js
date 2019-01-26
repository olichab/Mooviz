import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategoriesList } from "../actions/movieAction";

import "../scss/AddMovie.scss";

class AddMovie extends Component {
  componentDidMount() {
    this.props.getCategoriesList();
  }
  render() {
    const { categoriesList } = this.props;

    return (
      <div className="AddMovie container p-5">
        <div className="row justify-content-center">
          <div className="col col-md-5">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ex: Dunkerque"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Movie poster</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Category</label>
                <select
                  className="custom-select"
                  id="inputGroupSelect04"
                  aria-label="Example select with button addon"
                  onChange={this.handleSortByCategory}
                >
                  <option defaultValue>Choose a category...</option>
                  {categoriesList.length &&
                    categoriesList.map(e => (
                      <option key={e.id_category} value={e.name_category}>
                        {e.name_category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Synopsis</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Director</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ex: Christopher Nolan"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Release date</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ex: 2019-01-23"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Duration</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ex: 1H50"
                />
              </div>
              <button type="button" className="btn btn-outline-success">
                Add new movie
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.movieReducer.categoriesList
});

export default connect(
  mapStateToProps,
  {
    getCategoriesList
  }
)(AddMovie);
