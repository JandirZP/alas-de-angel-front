// ModalEditAppointment.tsx
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../../layouts/Modals";
import type { Cita } from "../../../../types/models";

// 1. Definimos las propiedades que el modal necesita recibir del padre
interface Props {
    visible: boolean;
    onClose: () => void;
    citaSeleccionada: Cita | null;
}

export const ModalEditAppointment = ({ visible, onClose, citaSeleccionada }: Props) => {
    const navigate = useNavigate();

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-8 w-full max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4 text-blue-600">
                    <i className="fa-solid fa-circle-info text-2xl"></i>
                    <h3 className="text-xl font-bold text-slate-800">Modificar Cita</h3>
                </div>
                <p className="text-slate-600 mb-4">Si decides editar el horario o la fecha, ten en cuenta:</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <li className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                        Si decides reprogramar la cita con mas de 24 horas de anticipacion no habra ningun cargo.
                    </li>
                    <li className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                        Si decides reprogramar la cita con menos de 24 horas de anticipacion se aplicara un cargo adicional del 15% por modificación.
                    </li>
                </ul>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            // Cerramos el modal primero
                            onClose();
                            // Navegamos pasando la cita por el React Router state
                            navigate('/ChangeValues', { state: { citaParaEditar: citaSeleccionada } });
                        }}
                        className="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 rounded-xl font-medium transition-all active:scale-95"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
