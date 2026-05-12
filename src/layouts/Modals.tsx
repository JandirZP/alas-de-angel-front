import { createPortal } from 'react-dom';

export interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    hideCloseButton?: boolean;
}

export const Modal = ({ visible, onClose, children, hideCloseButton = false }: ModalProps) => {
    // Usamos createPortal para que el modal se renderice como hijo directo del <body>
    // Esto lo saca de la jerarquía de DOM donde pudiese estar atrapado por otros z-index o animaciones (stacking contexts)
    return createPortal(
        <>
            <div
                className={`fixed inset-0 bg-black/20 z-90 transition-opacity duration-300
                ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={hideCloseButton ? undefined : onClose}
            />


            <div className={`flex flex-col w-[90%] max-w-3xl h-auto min-h-[200px] p-6 bg-emerald-200 rounded-xl shadow-2xl fixed left-1/2 z-100 transition-all duration-500
            ${visible ? "top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100" : "top-0 -translate-x-1/2 -translate-y-full opacity-0 pointer-events-none"}`}
            >
                <div className="flex justify-end h-16">
                    {!hideCloseButton && (
                        <button onClick={onClose} className="w-16 h-full flex items-center justify-center">
                            <i className="fa-solid fa-rectangle-xmark text-2xl text-blue-800 hover:text-3xl hover:text-blue-950 transition-all"></i>
                        </button>
                    )}
                </div>
                {children}
            </div>
        </>,
        document.body
    );
};
