import { type ReactNode } from "react";

export interface LateralBarProps {
  children?: ReactNode;
  onClose: () => void;
  visible: boolean;
}

export const LateralBar = ({ children, onClose, visible }: LateralBarProps) => {
  return (
    <>
      {/* 1. EL FONDO (Overlay) */}
      {/* AHORA TIENE LÓGICA: Si no es visible, usa opacity-0 y pointer-events-none */}
      <div 
        className={`fixed inset-0 bg-black/20 z-90 transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={onClose} 
      />

      {/* 2. LA BARRA LATERAL */}
      {/* Usamos translate-x para que se deslice desde la derecha */}
      <div 
        className={`flex flex-col w-1/6 h-screen p-4 bg-emerald-200 fixed top-0 right-0 z-100 transition-transform duration-300
        ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="w-16 h-16">
            <i className="fa-solid fa-rectangle-xmark text-2xl text-blue-800 hover:text-3xl hover:text-blue-950"></i>
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
