// Importamos tus nuevas herramientas

import { useNavbarLogic } from "../../hooks/landing";
import { handleSmoothScroll } from "../../events/landing";
import { Link } from "react-router-dom";

export const Navbar = () => {
    // 1. Usamos el Hook para obtener el estado y la función del menú
    const { toggleMenu } = useNavbarLogic(); // Si necesitaras 'isOpen', lo extraes aquí también

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center flex-wrap p-6 bg-gray-200 drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-center">
                <img className="w-20 h-20 drop-shadow-lg" src="/icono-hospital.svg" alt="Logo Hospital" />
                <div className="font-bold text-4xl font-sans italic text-emerald-600 [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">
                    Alas de Angel
                </div>
            </div>

            <div className="flex flex-row w-auto mt-0 gap-5">
                <a className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic" href="#home" onClick={(e) => handleSmoothScroll(e, toggleMenu)}>Inicio</a>

                {/* 2. Conectamos el evento con la lógica del hook */}
                <a
                    className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic cursor-pointer"
                    href="#aboutus"
                    // Pasamos el evento 'e' y la función 'toggleMenu' que viene del Hook
                    onClick={(e) => handleSmoothScroll(e, toggleMenu)}
                >
                    Sobre Nosotros
                </a>

                <a className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic" href="#specialities" onClick={(e) => handleSmoothScroll(e, toggleMenu)}>Especialidades</a>
                <Link
                    to="/login"
                    className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic"

                >
                    Iniciar Sesión

                </Link>

            </div>

        </nav>
    );
};