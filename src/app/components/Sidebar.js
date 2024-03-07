'use client'
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    BsSearch,
    BsQuestionSquareFill,
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsLayersFill,
    BsMapFill
} from 'react-icons/bs';
import { MdSource } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaCog } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from './Sidebar.module.css';

const Sidebar = () => {
    const [sideBarActive, setSideBarActive] = useState(false);
    const [activeDivId, setActiveDivId] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const controls = useAnimation();
    const controlText = useAnimation();
    const controlTitleText = useAnimation();

    const pagesData = [
        {
            name: 'Neo Visor',
            href: '/',
            items: [
                { id: '1', title: 'Config', icon: FaCog },
                { id: '2', title: 'Fuentes', icon: MdSource },
                { id: '3', title: 'Capas', icon: BsLayersFill },
                { id: '4', title: 'Ayuda', icon: BsQuestionSquareFill },
                { id: '5', title: 'Mapas', icon: BsMapFill },
                { id: '6', title: 'Historial', icon: FaHistory },
                { id: '7', title: 'Buscador', icon: BsSearch },
            ],
        },
    ];

    const showMore = () => {
        controls.start({
            width: '168px',
            transition: { duration: 0.101 },
        });
        controlText.start({
            opacity: 1,
            display: 'block',
        });
        controlTitleText.start({
            opacity: 1,
            transition: { delay: 0.3 },
        });
        setSideBarActive(true);
    };

    const showLess = () => {
        controls.start({
            width: '55px',
            transition: { duration: 0.101 },
        });

        controlText.start({
            opacity: 0,
            display: 'none',
        });

        controlTitleText.start({
            opacity: 0,
        });
        setSideBarActive(false);
    };

    const toggleSidebar = () => {
        setSideBarActive(!sideBarActive);
        if (!sideBarActive) {
            showMore();
        } else {
            showLess();
        }
    };

    const toggleSubMenu = (id) => {
        setActiveDivId(activeDivId === id ? '' : id); // Toggle active div id
        const url = activeDivId === id ? '' : id; // Modifying URL based on submenu state
        history.pushState({}, '', '#' + url);
    };

    const activateDivFromUrl = () => {
        const hash = window.location.hash.substr(1); // Get fragment from URL without #
        setActiveDivId(hash);
    };

    useEffect(() => {
        activateDivFromUrl();
    }, []);

    useEffect(() => {
        window.onhashchange = () => {
            activateDivFromUrl();
        };
    }, []);

    return (
        <div>
            <motion.div animate={controls} className={styles.sidebar}>
                <button className={`${styles.sidebarButton} ${sideBarActive ? styles.sidebarButtonOpen : styles.sidebarButtonClosed}`} onClick={toggleSidebar}>
                    {sideBarActive ? (
                        <BsFillArrowLeftSquareFill />
                    ) : (
                        <BsFillArrowRightSquareFill />
                    )}
                </button>

                <div className='grow'>
                    {pagesData.map((group, index) => (
                        <div key={index} className='my-2'>
                            <motion.p animate={controlTitleText} className={styles.sidebarTitleText}>
                                {group.name}
                            </motion.p>
                            {group.items.map((item, index2) => (
                                <button key={index2} onClick={() => toggleSubMenu(item.id)}>
                                    <div className={styles.menuButton}>
                                        <item.icon className={`${styles.buttonIcon}`} />
                                        <motion.p animate={controlText} className={`${styles.buttonText}`}>
                                            {item.title}
                                        </motion.p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

            </motion.div>

            <div>
                {pagesData.map((group, index) => (
                    <div key={index}>
                        {group.items.map((item, index2) => (
                            <div key={index2} className={`${styles.subMenu} ${styles.subMenuStandard}`} id={item.id} style={{ display: activeDivId === item.id ? 'block' : 'none' }}>
                                <div className='grow'>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;