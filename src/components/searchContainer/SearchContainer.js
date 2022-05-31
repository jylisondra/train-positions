import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

import img from '../../assets/tom-grunbauer-8_9Rix4OvrM---unsplash.png';
import styles from './SearchContainer.module.css';

export const SearchContainer = () => {
  const {
    searchDestination,
    direction,
    lineColor,
    serviceType,
    carCount,
    handleSearch,
    clearFilter,
  } = useAppContext();

  const handleChange = (e) => {
    handleSearch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilter();
  };
  return (
    <div className={styles.search_container}>
      <div className={styles.blur}></div>
      <form className={styles.search_form}>
        <label>
          Direction
          <select name="direction" value={direction} onChange={handleChange}>
            <option selected value=""></option>
            <option value="1">Northbound</option>
            <option value="2">Southbound</option>
          </select>
        </label>
        <label>
          Line Color
          <select name="lineColor" value={lineColor} onChange={handleChange}>
            <option selected key={0} value=""></option>
            <option value="RD">Red</option>
            <option value="GR">Green</option>
            <option value="BL">Blue</option>
            <option value="SV">Silver</option>
            <option value="YL">Yellow</option>
            <option value="OR">Orange</option>
          </select>
        </label>
        <label>
          Service Type
          <select
            name="serviceType"
            value={serviceType}
            onChange={handleChange}
          >
            <option selected name="all-types" value=""></option>
            <option value="Normal">Normal</option>
            <option value="NoPassengers">Non-Passenger</option>
            <option value="Unknown">Unknown</option>
          </select>
        </label>
        <button className={styles.btn_clear} onClick={handleSubmit}>
          Clear Filters
        </button>
      </form>
    </div>
  );
};
