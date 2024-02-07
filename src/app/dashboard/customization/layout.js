'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/components/Sidebar.module.css';

export default function Layout() {
    const [colorFondo, setColorFondo] = useState('#ffffff'); // Estado para el color de fondo

    useEffect(() => {
        // Al cargar la página, obtener el color de fondo inicial desde el localStorage
        const colorFondoGuardado = localStorage.getItem('colorFondoGlobal');
        if (colorFondoGuardado) {
            setColorFondo(colorFondoGuardado);
            // Aplicar el color de fondo guardado a toda la aplicación
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
            <motion.div className={`${styles.subMenu} ${styles.subMenuConfig}`}>
                <div className='grow'>

                    <form onSubmit={handleSubmit}>
                        <h1>Configuración de Estilos</h1>
                        <div className="form-group">
                            <label htmlFor="colorFondo">Color de fondo de la aplicación:</label>
                            <input
                                type="color"
                                id="colorFondo"
                                value={colorFondo}
                                onChange={handleChangeColorFondo}
                            />
                            <button type="button" onClick={handleDefaultColorClick}>Color por Defecto</button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="textSize">Tamaño del texto:</label>
                            <input type="number" id="textSize" name="textSize" min="8" max="72" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="textColor">Color del texto:</label>
                            <input type="color" id="textColor" name="textColor" required />
                        </div>
                        <button type="submit">Guardar cambios</button>
                    </form>

                </div>
            </motion.div>
        </div>
    );
}
