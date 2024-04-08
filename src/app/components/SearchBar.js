'use client'
import React, { useState, useEffect } from 'react';
import styles from './Components.module.css';
 
function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" placeholder="Buscar..." />
      <button type="submit" className={styles.buttonS}>Buscar</button>
    </div>
  );
}

export default SearchBar;
