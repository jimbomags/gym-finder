import React, { useState, useEffect, Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const gym = {
  company: "Gymbox",
  location: "Farringdon",
  streetName: "12A Leather Lane",
  postCode: "EC1N 7SS",
};

const getCoordinates = async (postCode) => {
  const data = await fetch(`https://api.postcodes.io/postcodes/${postCode}`);

  return data.json();
};

const Results = ({ postCode, google }) => {
  const [lat, updateLat] = useState();
  const [lng, updateLng] = useState();
  const [showInfoWindow, toggleInfoWindow] = useState(false);
  const [activeMarker, changeActiveMarker] = useState({});
  const [selectedPlace, changeSelectedPlace] = useState({});

  const mapStyles = {
    width: '50%',
    height: '50%',
  };
  const onMarkerClick = (props, marker, e) => {
    changeActiveMarker(marker);
    changeSelectedPlace(props);
    toggleInfoWindow(true);
  };
  const onMouseLeave = (props, marker, e) => {
    console.log("Mouse Leave Event Fired")
    changeActiveMarker(null);
    toggleInfoWindow(false);
  };

  getCoordinates(postCode)
    .then((json) => {
      updateLat(json.result.latitude);
      updateLng(json.result.longitude);
    });


  if (lat && lng) {
    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat,
          lng,
        }}
      >
        <Marker
          onMouseover={onMarkerClick}
          onMouseout={onMouseLeave}
          name="Gymbox, Farringdon"
        />
        <InfoWindow
          marker={activeMarker}
          visible={showInfoWindow}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  } else {
    return <h1>Loading...</h1>
  }
};

// const mapStyles = {
//   width: '50%',
//   height: '50%'
// };

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//          lat: -1.2884,
//          lng: 36.8233
//         }} >
//         <Marker />
//         <InfoWindow visible={true} marker={{}}>
//           <h1>Info Text</h1>
//         </InfoWindow>  
//       </Map>
//     );
//   }
// }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBXyBr0aRuW17PhrJ35hUS97EmKkyck9IY',
})(Results);

// export default Results;
