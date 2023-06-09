import React from "react";
import Map, { Marker, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "!mapbox-gl";
import { HiMapPin } from "react-icons/hi2";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
// console.log(TOKEN);

export const MapLocation = ({ branch }) => {
  return (
    <div>
      <div>
        <p>Location</p>
        {branch?.id >= 0 && (
          <div className="w-full mb-2 p-4 flex justify-center">
            <Map
              initialViewState={{
                longitude: branch?.longitude,
                latitude: branch?.latitude,
                zoom: 10,
                bearing: 0,
                pitch: 0,
              }}
              dragEnabled={false}
              style={{ width: 500, height: 300 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={TOKEN}
            >
              <ScaleControl />
              <Marker longitude={branch?.longitude} latitude={branch?.latitude}>
                <HiMapPin size={30} className="text-primary" />
              </Marker>
            </Map>
          </div>
        )}
      </div>
    </div>
  );
};
