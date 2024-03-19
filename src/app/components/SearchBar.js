'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';

function SearchBar() {
  return (
    <motion.div className={`${styles.subMenu} ${styles.subMenuStandard}`}>
      <div className="search-container">
        <input type="text" placeholder="Buscar..." />
        <button type="submit">Buscar</button>
      </div>
    </motion.div>

  );
}

export default SearchBar;
