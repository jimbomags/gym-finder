import React, { useState } from 'react';
import './css/App.css';
import SearchForm from './SearchForm';
import Results from './components/Results';

const App = () => {
  const [postcode, changePostcode] = useState('');

  return (
    <div>
      <SearchForm changePostcode={changePostcode} />
      <Results postcode={postcode} />
    </div>
  );
};


export default App;
