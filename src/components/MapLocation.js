import React from "react";
import Map, { Marker, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { HiMapPin } from "react-icons/hi2";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
// console.log(TOKEN);

export const MapLocation = ({ mockStore }) => {
  return (
    <div>
      <div>
        <p>Location</p>
        <div className="w-full mt-2 flex justify-center">
          <Map
            initialViewState={{
              longitude: mockStore[3]?.longitude,
              latitude: mockStore[3]?.latitude,
              zoom: 10,
              bearing: 0,
              pitch: 0,
            }}
            dragEnabled={false}
            style={{ width: 375, height: 375 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={TOKEN}
          >
            <ScaleControl />
            <Marker
              longitude={mockStore[3]?.longitude}
              latitude={mockStore[3]?.latitude}
            >
              <HiMapPin size={30} className="text-primary" />
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
};
