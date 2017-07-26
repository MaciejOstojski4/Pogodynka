// komentarze zbędne
/* global google */
import { default as React, Component } from "react";

import {
  withGoogleMap,
  GoogleMap,
  GeojsonToComponent
} from "react-google-maps";

// komentarze zbędne
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap defaultZoom={5} defaultCenter={{ lat: 50, lng: 20 }} />
);

// komentarze zbędne
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {
  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `600px` }} />}
      />
    );
  }
}
