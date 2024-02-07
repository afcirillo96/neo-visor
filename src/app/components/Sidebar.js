'use client'
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    BsSearch,
    BsQuestionSquareFill ,
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsLayersFill,
    BsMapFill
} from 'react-icons/bs';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { MdSource } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaCog } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [sideBarActive, setSideBarActive] = useState(false);
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
                { id: '1', title: 'Config', icon: FaCog, href: '/dashboard/customization' },
                { id: '2', title: 'Fuentes', icon: MdSource, href: '/dashboard/sources' },
                { id: '3', title: 'Capas', icon: BsLayersFill, href: '/dashboard/layers' },
                { id: '4', title: 'Ayuda', icon: BsQuestionSquareFill, href: '/dashboard/help' },
                { id: '5', title: 'Mapas', icon: BsMapFill, href: '/dashboard/maps' },
                { id: '6', title: 'Historial', icon: FaHistory, href: '/dashboard/history' },
                { id: '7', title: 'Buscador', icon: BsSearch, href: '/dashboard/searcher' },
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
            // transition: { delay: 0.3 },
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

    const [buttonActive, setButtonActive] = useState('');

    const toggleButtons = (id) => {
        if (buttonActive === id) {
            setButtonActive('');
            router.push('/')
        } else {
            setButtonActive(id);
        }
    };

    // How to start the sidebar
    useEffect(() => {
        showMore();
    }, []);

    return (
        <div>
            <motion.div animate={controls} className={styles.sidebar}>
                {/* Sidebar Show/Hide Button */}
                <button className={`${styles.sidebarButton} ${sideBarActive ? styles.sidebarButtonOpen : styles.sidebarButtonClosed}`} onClick={toggleSidebar}>
                    {sideBarActive ? (
                        <Link href={'/'}>
                            <BsFillArrowLeftSquareFill/>
                        </Link>
                    ) : (
                        <BsFillArrowRightSquareFill/>
                    )}
                </button>

                {/* Menu Buttons */}
                <div className='grow'>
                    {pagesData.map((group, index) => (
                        <div key={index} className='my-2'>

                            {/* Menu Title */}
                            <motion.p animate={controlTitleText} className={styles.sidebarTitleText}>
                                {group.name}
                            </motion.p>

                            {/* Buttons */}
                            {group.items.map((item, index2) => (
                                <button onClick={() => {
                                    toggleButtons(item.id);
                                    showMore();
                                }} key={index2}> {/* button added to fix routes issue */}
                                    <Link href={item.href}  >
                                        <div className={styles.menuButton} >
                                            <item.icon className={`${pathname == item.href ? styles.buttonIconActive : styles.buttonIcon}`}/>
                                            <motion.p animate={controlText} className={`${pathname == item.href ? styles.buttonTextActive : styles.buttonText}`}>
                                                {' '}
                                                {item.title}
                                            </motion.p>
                                        </div>
                                    </Link>
                                </button>
                            ))}

                        </div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default Sidebar;