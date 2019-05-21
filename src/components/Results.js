import React, { useState, useEffect } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
} from 'google-maps-react';
import img from '../img/171453-32.png';

let gyms;
const markersDataArray = [];

const Results = ({ postcode, google }) => {
  const [lat, updateLat] = useState();
  const [lng, updateLng] = useState();
  const [showInfoWindow, toggleInfoWindow] = useState(false);
  const [activeMarker, changeActiveMarker] = useState({});
  const [selectedPlace, changeSelectedPlace] = useState({});
  const [finishedFetching, changeFinishedFetching] = useState(false);

  const getCoordinates = async (postcode) => {
    const data = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
    return data.json();
  };

  const markersData = () => gyms.forEach(async (gym, index) => {
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
    if (index === gyms.length - 1) {
      changeFinishedFetching(true);
    }
  });

  useEffect(() => {
    if (postcode) {
      getCoordinates(postcode)
        .then((json) => {
          updateLat(json.result.latitude);
          updateLng(json.result.longitude);
        });
    }
    if (!gyms) {
      (async () => {
        const data = await fetch('https://ancient-ocean-16367.herokuapp.com/');
        const json = await data.json();

        gyms = json;

        markersData();
      })();
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
    console.log(finishedFetching);
    
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
