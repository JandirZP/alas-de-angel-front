import { useState } from 'react';

// Custom Hook para controlar la lógica del Navbar
export const useNavbarLogic = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Retornamos lo que la vista necesita
    return {
        isOpen,
        toggleMenu
    };
};


//Hook para controlar el carrusel de la landing page y si se puede en otros componentes

export const useCarouselLogic = (totalItems: number) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        // (Actual + 1) % Total -> Si llega al final, vuelve a 0
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    };

    const prevSlide = () => {
        // (Actual - 1 + Total) % Total -> Si está en 0, va al último
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    return {
        currentIndex,
        nextSlide,
        prevSlide
    };
};