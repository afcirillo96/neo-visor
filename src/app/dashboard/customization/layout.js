'use client';

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

    const valorVariableCSS = getComputedStyle(document.documentElement).getPropertyValue('--background--color');
    localStorage.setItem('backgroundColor', valorVariableCSS);


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
        React.createElement('div', null,
            React.createElement(motion.div, { className: `${styles.subMenu} ${styles.subMenuConfig}` },
                React.createElement('div', { className: 'grow' },

                    React.createElement('form', { onSubmit: handleSubmit },
                        React.createElement('h1', null, 'Configuración de Estilos'),
                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "colorFondo" }, 'Color de fondo de la aplicación:'),
                            React.createElement('input', {
                                type: "color",
                                id: "colorFondo",
                                value: colorFondo,
                                onChange: handleChangeColorFondo
                            }),
                            React.createElement('button', { type: "button", onClick: handleDefaultColorClick }, 'Color por Defecto')
                        ),

                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "textSize" }, 'Tamaño del texto:'),
                            React.createElement('input', { type: "number", id: "textSize", name: "textSize", min: "8", max: "72", required: true })
                        ),
                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "textColor" }, 'Color del texto:'),
                            React.createElement('input', { type: "color", id: "textColor", name: "textColor", required: true })
                        ),
                        React.createElement('button', { type: "submit" }, 'Guardar cambios')
                    )

                )
            )
        )
    );
}
