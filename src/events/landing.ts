import type { MouseEvent } from 'react';

//  Maneja el scroll suave y ejecuta una acción opcional (como cerrar menú).
//  @param e - Evento del mouse
//  @param callback - (Opcional) Función a ejecutar tras el click (ej: toggleMenu)
export const handleSmoothScroll = (
    e: MouseEvent<HTMLAnchorElement>,
    callback?: () => void
) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute("href");

    if (href) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Si nos pasaron la función para cerrar el menú, la ejecutamos
    if (callback) {
        callback();
    }
};