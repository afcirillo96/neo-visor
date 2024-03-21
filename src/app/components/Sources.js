'use client'
import React, { useState } from 'react';

const  Sources = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
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
    );
  }
  
export default Sources;