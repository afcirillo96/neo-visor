'use client';

import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';
import React from 'react';

export default function Layout() {
    return (
        <div>
            <motion.div className={`${styles.subMenu} ${styles.subMenuStandard}`}>
                <div className='grow'>
                    <p>Historial</p>
                </div>
            </motion.div>
        </div>
    );
}
