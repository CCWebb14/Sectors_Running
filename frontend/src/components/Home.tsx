// src/components/Dashboard.tsx
import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import data from './data/local-area-boundary.json'

import WebPImage from "../assets/img/Vancouver.webp";

const Dashboard: React.FC = () => {

  const mapContainerStyle = {
    width: "80%",
    height: "500px",
    margin: "auto",
  };
  
  const center = {
    lat: 49.2827, // Latitude for Vancouver
    lng: -123.1207, // Longitude for Vancouver
  };
  
  // const postalCodePolygons = [
  //   {
  //     postalCode: "V6B",
  //     paths: [
  //       { lat: 49.280, lng: -123.120 },
  //       { lat: 49.285, lng: -123.115 },
  //       { lat: 49.290, lng: -123.120 },
  //       { lat: 49.285, lng: -123.125 },
  //     ],
  //     color: "#FF0000", // Red for this postal code
  //   },
  //   {
  //     postalCode: "V6C",
  //     paths: [
  //       { lat: 49.290, lng: -123.115 },
  //       { lat: 49.295, lng: -123.110 },
  //       { lat: 49.300, lng: -123.115 },
  //       { lat: 49.295, lng: -123.120 },
  //     ],
  //     color: "#0000FF", // Blue for this postal code
  //   },
  // ];

    const postalCodePolygons = data.map((area, index) => ({
      postalCode: area.name,
      paths: area.geom.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })), 
      color: "#0000FF", // or set a fixed color if preferred
    }));
  

    return (
      <LoadScript googleMapsApiKey="AIzaSyCZIW06LMeM9IsMGSLVuYDiYTkXvPKzxs0">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {postalCodePolygons.map((polygon, index) => (
            <Polygon
              key={index}
              paths={polygon.paths}
              options={{
                fillColor: polygon.color,
                fillOpacity: 0.4,
                strokeColor: polygon.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );

  
  // return (
  //   <main style={dashboardStyle}>
  //       <h2>Home page!</h2>
  //       <img src={WebPImage} alt="Example WebP" style={{ width: "50%" }}></img>
  //   </main>
  // );
};

const dashboardStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "20px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#ff6f61",
  border: "none",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;