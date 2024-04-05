'use client'
import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
    const [primaryColor, setPrimaryColor] = useState('#ffffff');
    const [secondaryColor, setSecondaryColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#ffffff');
    const defaultPColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-default--color');
    const defaultSColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-default--color');
    const defaultTxtColor = getComputedStyle(document.documentElement).getPropertyValue('--text-default--color');

    useEffect(() => {// Al cargar la página, obtener el color de fondo inicial desde el localStorage
        const savedPrimaryColor = localStorage.getItem('primaryColor');
        const savedSecondaryColor = localStorage.getItem('secondaryColor');
        const savedTxtColor = localStorage.getItem('textColor');

        if (savedPrimaryColor) {
            setPrimaryColor(savedPrimaryColor);
            document.documentElement.style.setProperty('--primary--color', savedPrimaryColor);
        } else {
            setPrimaryColor(defaultPColor);
            document.documentElement.style.setProperty('--primary--color', defaultPColor);
        }
        if (savedSecondaryColor) {
            setSecondaryColor(savedSecondaryColor);
            document.documentElement.style.setProperty('--secondary--color', savedSecondaryColor);
        } else {
            setSecondaryColor(defaultSColor);
            document.documentElement.style.setProperty('--secondary--color', defaultSColor);
        }
        if (savedTxtColor) {
            setTextColor(savedTxtColor);
            document.documentElement.style.setProperty('--text--color', savedTxtColor);
        } else {
            setTextColor(defaultTxtColor);
            document.documentElement.style.setProperty('--text--color', defaultTxtColor);
        }
    }, []);

    //primaryColor
    const handleChangePColor = (e) => {
        const newColor = e.target.value;
        setPrimaryColor(newColor);
        localStorage.setItem('primaryColor', newColor);  // Guardar en el localStorage
        document.documentElement.style.setProperty('--primary--color', newColor);
    };
    const handleDefaultPColor = () => {
        document.documentElement.style.setProperty('--primary--color', defaultPColor);
        localStorage.setItem("primaryColor", defaultPColor);
        console.log("Se aplicó default!");
    };

    //secondaryColor
    const handleChangeSColor = (e) => {
        const newColor = e.target.value;
        setSecondaryColor(newColor);
        localStorage.setItem('secondaryColor', newColor);  // Guardar en el localStorage
        document.documentElement.style.setProperty('--secondary--color', newColor);
    };
    const handleDefaultSColor = () => {
        document.documentElement.style.setProperty('--secondary--color', defaultSColor);
        localStorage.setItem("secondaryColor", defaultSColor);
        console.log("Se aplicó default!");
    };

    //secondaryColor
    const handleChangeTxtColor = (e) => {
        const newColor = e.target.value;
        setTextColor(newColor);
        localStorage.setItem('textColor', newColor);
        document.documentElement.style.setProperty('--text--color', newColor);
    };
    const handleDefaultTxtColor = () => {
        document.documentElement.style.setProperty('--text--color', defaultTxtColor);
        localStorage.setItem("textColor", defaultTxtColor);
        console.log("Se aplicó default!");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>CONFIGURACIÓN DE ESTILOS</h1>
            <br/>
            <h1>Color de la Aplicación</h1>
            <form className={styles.formMain} onSubmit={handleSubmit}>
                <div className={styles.settingForm}>
                    <div >
                        <label htmlFor="primaryColor">Primario: </label>
                        <input
                            type="color"
                            id="primaryColor"
                            value={primaryColor}
                            onChange={handleChangePColor}
                        />
                    </div>
                    <button type="button" className={styles.buttonS} onClick={handleDefaultPColor}>Por Defecto</button>
                </div>

                <div className={styles.settingForm}>
                    <div >
                        <label htmlFor="primaryColor">Secundario: </label>
                        <input
                            type="color"
                            id="secondaryColor"
                            value={secondaryColor}
                            onChange={handleChangeSColor}
                        />
                    </div>
                    <button type="button" className={styles.buttonS} onClick={handleDefaultSColor}>Por Defecto</button>
                </div>

                <div className={styles.settingForm}>
                    <div >
                        <label htmlFor="primaryColor">Texto: </label>
                        <input
                            type="color"
                            id="textColor"
                            value={textColor}
                            onChange={handleChangeTxtColor}
                        />
                    </div>
                    <button type="button" className={styles.buttonS} onClick={handleDefaultTxtColor}>Por Defecto</button>
                </div>
            </form>

            <br/>
            <hr/>
            <h1>Usuario</h1>
            <form className={styles.formMain} onSubmit={handleSubmit}>
                <div className={styles.settingForm}>
                    <label htmlFor="textSize">WIP:</label>
                    <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                </div>

                <div className={styles.settingForm}>
                <label htmlFor="textSize">WIP:</label>
                    <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                </div>

                <div className={styles.settingForm}>
                <label htmlFor="textSize">WIP:</label>
                <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                </div>
            </form>
            
            <br/>
            <hr/>
            <br/>

            <button type="submit" className={styles.buttonS}>Guardar Cambios</button>
        </div>
    );

}
export default Settings;