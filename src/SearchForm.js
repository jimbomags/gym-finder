/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import isValid from 'uk-postcode-validator';

const SearchForm = ({ changePostcode }) => {
  const [value, setValue] = useState('');
  const handleChange = event => setValue(event.target.value);

  const handleSubmit = (e) => {
    if (isValid(value)) {
      changePostcode(value);
    }
    e.preventDefault();
  };

  const changeBorderColour = (isValidFunc) => {
    if (value.length === 0) {
      return null;
    }
    if (isValidFunc) {
      return { border: "solid green 2px" }
    }
    return { border: "solid red 2px" }
  };

  return (
    <div className="container">
      <h1 className="text-center py-5">London Gym Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={value} onChange={handleChange} placeholder="Please Enter Your Postcode" style={changeBorderColour(isValid(value))} />
        </label>
        <button type="submit" className="btn btn-success">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
