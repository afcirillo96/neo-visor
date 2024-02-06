'use client';

import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';
import React from 'react';

export default function Layout() {
    return (
        React.createElement('div', null,
            React.createElement(motion.div, { className: `${styles.subMenu} ${styles.subMenuStandard}` },
                React.createElement('div', { className: 'grow' },
                    React.createElement('p', null, 'Fuentes')
                )
            )
        )
    );
}
