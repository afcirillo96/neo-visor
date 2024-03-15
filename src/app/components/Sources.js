'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';

const  Sources = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <motion.div className={`${styles.subMenu} ${styles.subMenuStandard}`}>
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={toggleMenu}>
                Toggle Dropdown
                </button>
                {isOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-item">Option 1</button>
                    <button className="dropdown-item">Option 2</button>
                    <button className="dropdown-item">Option 3</button>
                </div>
                )}
            </div>
        </motion.div>
    );
  }
  
export default Sources;