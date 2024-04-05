'use client'
import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
    const [colorFondo, setColorFondo] = useState('#ffffff');

    useEffect(() => {// Al cargar la página, obtener el color de fondo inicial desde el localStorage
        const colorFondoGuardado = localStorage.getItem('colorFondoGlobal');
        if (colorFondoGuardado) {
            setColorFondo(colorFondoGuardado);// Aplicar el color de fondo guardado a toda la aplicación
            document.documentElement.style.setProperty('--background--color', colorFondoGuardado);
        }
    }, []);

    // Función para manejar el cambio en el color de fondo
    const handleChangeColorFondo = (e) => {
        const nuevoColorFondo = e.target.value;
        setColorFondo(nuevoColorFondo);
        // Guardar en el localStorage
        localStorage.setItem('colorFondoGlobal', nuevoColorFondo);
        // Aplicar el nuevo color de fondo a toda la aplicación
        document.documentElement.style.setProperty('--background--color', nuevoColorFondo);
    };

    // Función para manejar el clic del botón de color por defecto
    const handleDefaultColorClick = () => {
        // Finalmente, actualiza el valor en el localStorage utilizando setItem()
        // localStorage.setItem("colorFondoGlobal", valorVariableCSS);
        // console.log("Limpiar localStorage");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Puedes agregar lógica adicional aquí si es necesario al enviar el formulario
    };

    return (
        <div>
            <h1>CONFIGURACIÓN DE ESTILOS</h1>
            <br/>
            <h1>Color de la Aplicación</h1>
            <form className={styles.formMain} onSubmit={handleSubmit}>
                <div className={styles.settingForm}>
                    <div >
                        <label htmlFor="colorFondo">Color Primario: </label>
                        <input
                            type="color"
                            id="colorFondo"
                            value={colorFondo}
                            onChange={handleChangeColorFondo}
                        />
                    </div>
                    <button type="button" className={styles.buttonS} onClick={handleDefaultColorClick}>Por Defecto</button>
                </div>

                <div className={styles.settingForm}>
                    <div >
                        <label htmlFor="colorFondo">Color Secundario: </label>
                        <input
                            type="color"
                            id="colorFondo"
                            value={colorFondo}
                            onChange={handleChangeColorFondo}
                        />
                    </div>
                    <button type="button" className={styles.buttonS} onClick={handleDefaultColorClick}>Por Defecto</button>
                </div>

                <div className={styles.settingForm}>
                    <label htmlFor="textColor">Color del Texto:</label>
                    <input type="color" id="textColor" name="textColor" required />
                </div>
            </form>

            <br/>
            <hr/>
            <h1>Usuario</h1>
            <form className={styles.formMain} onSubmit={handleSubmit}>
                <div className={styles.settingForm}>
                    <label htmlFor="textSize">Tamaño del Texto:</label>
                    <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                </div>

                <div className={styles.settingForm}>
                    <label htmlFor="textSize">Tamaño del Texto:</label>
                    <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                </div>

                <div className={styles.settingForm}>
                    <label htmlFor="textColor">Color del Texto:</label>
                    <input type="color" id="textColor" name="textColor" required />
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