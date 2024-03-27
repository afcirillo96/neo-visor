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
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import Settings from './Settings';
import SearchBar from './SearchBar';

const Sidebar = () => {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();
  const router = useRouter();

  const pagesData = [
    {
      name: 'Neo Visor',
      href: '/',
      items: [
        //si tiene component se renderiza. Si no tiene component renderiza un div standard
        { id: '1-Buscador', title: 'Buscador', icon: BsSearch, component: <SearchBar />, compStyles: styles.subMenuStandard },
        { id: '2-Capas', title: 'Capas', icon: BsLayersFill, },
        { id: '3-Fuentes', title: 'Fuentes', icon: MdSource, },
        { id: '4-Mapas', title: 'Mapas', icon: BsMapFill, },
        { id: '5-Historial', title: 'Historial', icon: FaHistory, },
        { id: '6-Ayuda', title: 'Ayuda', icon: BsQuestionSquareFill, },
        { id: '7-Config', title: 'Config', icon: FaCog, component: <Settings />, compStyles: styles.subMenuConfig },
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
    document.getElementById('subMenu').style.display = "none";
  };

  const toggleSideBar = () => {   //Show/Hide SideBar
    setSideBarActive(!sideBarActive);
    if (!sideBarActive) {
      showMore();
    } else {
      showLess();
      router.push('/');
      setActiveSubMenu(''); //Resets hook
    }
  };

  const toggleSubMenu = (id) => { //Show/Hide SubMenu
    setActiveSubMenu(activeSubMenu === id ? '' : id);   //Toggle active div id
    const url = activeSubMenu === id ? '' : id;         //Modifying URL based on submenu state
    history.pushState({}, '', '#' + url);               //Push to new URL
    document.getElementById('subMenu').style.display = "";
  };

  const getActualURL = () => {  //Modifica la URL
    const hash = window.location.hash.substr(1);    //Get fragment from URL without #
    setActiveSubMenu(hash);
    if (hash != '') {
      showMore();
    }
    // console.log("se modifico la url:", hash)
  };

  useEffect(() => {   //Toma la URL actual
    getActualURL();
  }, []);


  return (
    <div>
      <motion.div animate={controls} className={styles.sidebar}>
        {/* Sidebar Show/Hide Button */}
        <button className={`${styles.sidebarButton} ${sideBarActive ? styles.sidebarButtonOpen : styles.sidebarButtonClosed}`} onClick={toggleSideBar}>
          {sideBarActive ? (
            <BsFillArrowLeftSquareFill />
          ) : (
            <BsFillArrowRightSquareFill />
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
                  showMore();
                  toggleSubMenu(item.id);
                }} key={index2}> {/* button added to fix routes issue */}
                  <div className={styles.menuButton}>
                    <item.icon className={`${styles.buttonIcon}`} />
                    <motion.p animate={controlText} className={`${history == item.href ? styles.buttonTextActive : styles.buttonText}`}>
                      {item.title}
                    </motion.p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

      </motion.div>

      {/* SubMenu */}
      <div id='subMenu'>
        {pagesData.map((group, index) => (
          <div key={index}>
            {group.items.map((item, index2) => (

              item.component ? (
                <div
                  id={item.id}
                  key={index2}
                  className={`${styles.subMenu} ${item.compStyles}`}
                  style={{ display: activeSubMenu === item.id ? 'block' : 'none' }}
                >
                  {item.component}
                </div>
              ) : (
                <div
                  id={item.id}
                  key={index2}
                  className={`${styles.subMenu} ${styles.subMenuStandard}`}
                  style={{ display: activeSubMenu === item.id ? 'block' : 'none' }}
                >
                  <p>{item.title}</p>
                </div>
              )

            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;