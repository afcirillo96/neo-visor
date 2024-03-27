'use client'
import React, { useState, useEffect } from 'react';

function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" placeholder="Buscar..." />
      <button type="submit">Buscar</button>
    </div>
  );
}

export default SearchBar;
