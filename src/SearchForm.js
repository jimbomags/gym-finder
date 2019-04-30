/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';

const SearchForm = ({ changePostcode }) => {
  const [value, setValue] = useState('');
  const handleChange = event => setValue(event.target.value);

  return (
    <div className="container">
      <h1 className="text-uppercase text-center py-5">Gym Search</h1>
      <form onSubmit={(e) => { changePostcode(value); e.preventDefault(); }}>
        <label>
          <input type="text" value={value} onChange={handleChange} placeholder="Enter Your Address" />
        </label>
        <button type="submit" className="btn btn-success">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
