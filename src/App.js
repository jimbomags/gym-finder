import React, { useState } from 'react';
import './css/App.css';
import SearchForm from './SearchForm';
import Results from './components/Results';

const gym = {
  company: "Gymbox",
  location: "Farringdon",
  streetName: "12A Leather Lane",
  postCode: "EC1N 7SS",
};

const App = () => {
  return (
    <div>
      <SearchForm />
      <Results postCode={gym.postCode} />
    </div>
  );
};

export default App;
 
 