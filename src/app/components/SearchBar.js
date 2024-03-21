'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';

function SearchBar() {
  return (
      <div className="search-container">
        <input type="text" placeholder="Buscar..." />
        <button type="submit">Buscar</button>
      </div>
  );
}

export default SearchBar;
