import React, { useState, useEffect } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
} from 'google-maps-react';
import img from '../img/171453-32.png';

let gyms;

(async () => {
  const data = await fetch('https://ancient-ocean-16367.herokuapp.com/');
  const json = await data.json();

  gyms = json;

  markersData();
})();

const getCoordinates = async (postcode) => {
  const data = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
  return data.json();
};

const markersDataArray = [];

const markersData = () => gyms.forEach(async (gym) => {
  const { company, location, postcode, website } = gym;
  let lat;
  let lng;

  await getCoordinates(postcode)
    .then((data) => {
      lat = data.result.latitude;
      lng = data.result.longitude;
    });
  markersDataArray.push({
    company,
    location,
    lat,
    lng,
    website,
  });
});


const Results = ({ postcode, google }) => {
  const [lat, updateLat] = useState();
  const [lng, updateLng] = useState();
  const [showInfoWindow, toggleInfoWindow] = useState(false);
  const [activeMarker, changeActiveMarker] = useState({});
  const [selectedPlace, changeSelectedPlace] = useState({});

  useEffect(() => {
    // if (!gyms) {
    //   getGymData();
    // }
    // if (markersDataArray.length === 0 && gyms) {
    //   markersData();
    // }
    if (postcode) {
      getCoordinates(postcode)
        .then((json) => {
          updateLat(json.result.latitude);
          updateLng(json.result.longitude);
        });
    }
  });

  const mapStyles = {
    width: '100%',
    height: '70%',
  };
  const onMarkerClick = (props, marker, e) => {
    changeActiveMarker(marker);
    changeSelectedPlace(props);
    toggleInfoWindow(true);
  };


  if (lat && lng) {
    const Markers = markersDataArray.map(marker => (
      <Marker name={`${marker.company}, ${marker.location}`} position={{ lat: marker.lat, lng: marker.lng }} onClick={onMarkerClick} key={marker.lat} website={marker.website} />
    ));

    return (
      <Map
        google={google}
        zoom={15}
        style={mapStyles}
        initialCenter={{
          lat,
          lng,
        }}
        center={{
          lat,
          lng,
        }}
      >
        <Marker position={{ lat, lng }} icon={{ url: img }} />
        {Markers}
        <InfoWindow
          marker={activeMarker}
          visible={showInfoWindow}
        >
          <div>
            <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer" className="h5">{selectedPlace.name}</a>
          </div>
        </InfoWindow>
      </Map>
    );
  }
  return null;
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBXyBr0aRuW17PhrJ35hUS97EmKkyck9IY',
})(Results);

// export default Results;
