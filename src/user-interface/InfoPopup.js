/**
 * Created by react on 13.07.17.
 */
import React from "react";

class InfoPopup extends React.Component {

  render() {
    return (
      <div style={{
        "border-radius": "25px",
        "border-style": "solid",
        "border-color": "#deb887",
        "background-color": "#faebd7",
        "padding": "5px",
      }}>
        {this.props.text}
      </div>
    )
  }
}

export default InfoPopup;
