import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import ReactHover from "react-hover";
import InfoPopup from "./user-interface/InfoPopup";

export class Search extends Component {
  onSubmit = e => {
    e.preventDefault();
  };

  showPopup = () => {};

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4 text-center">
          <form>
            <div className="form-group">
              <label>Search</label>
              <ReactHover options={REACT_HOVER_OPTS}>
                <ReactHover.Trigger>
                  <input className="form-control" placeholder="Search" />
                </ReactHover.Trigger>
                <ReactHover.Hover>
                  <InfoPopup text={SEARCH_INPUT_POPUP_TEXT} />
                </ReactHover.Hover>
              </ReactHover>
            </div>
            <div className="form-group">
              <button onClick={this.onSubmit} onMouseOver={this.showPopup}>
                Ok
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const REACT_HOVER_OPTS = {
  followCursor: true,
  shiftX: -60,
  shiftY: 0,
};

const SEARCH_INPUT_POPUP_TEXT =
  "Search by city name or by latitude and longitude (lat:lon)";

export default Search;
