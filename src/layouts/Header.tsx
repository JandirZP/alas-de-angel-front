import { type ReactNode } from "react";

interface HeaderProps {
    children?: ReactNode;
}

export const Header = ({children}: HeaderProps) => {
    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center flex-wrap p-6 bg-gray-200 drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-center">
                <img className="w-20 h-20 drop-shadow-lg" src="/icono-hospital.svg" alt="Logo Hospital" />
                <div className="font-bold text-4xl font-sans italic text-emerald-600 [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">
                    Alas de Angel
                </div>
            </div>
            
            <div className="flex flex-row w-auto mt-0 gap-5">
                {children}
            </div>
                
        </nav>
    );
};