import React from "react";
import { Map, TileLayer } from "react-leaflet";
import GeoJsonCluster from "react-leaflet-geojson-cluster";

const map = (
  <Map id="map" center={[30.25, -97.75]} zoom={13}>
    <TileLayer
      url="https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <GeoJsonCluster data={your_geojson} />
  </Map>
);

React.render(map, document.getElementById("map-container"));
