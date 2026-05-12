import { Modal } from "../../../../layouts/Modals";

// 1. Definimos las propiedades que necesita
interface Props {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export const ModalCancelAppointment = ({ visible, onClose, onConfirm }: Props) => {
    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-8 w-full max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4 text-rose-600">
                    <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                    <h3 className="text-xl font-bold text-slate-800">Cancelar Cita</h3>
                </div>
                <p className="text-slate-600 mb-4">Políticas de cancelación:</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-8 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                    <li className="flex items-start gap-2">
                        <i className="fa-solid fa-minus text-rose-400 mt-1"></i>
                        Si decides cancelar la cita con más de 24 horas de anticipación y la cita ya estaba pagada podrás hacerlo y se te reembolsará el 100 % del monto pagado.
                    </li>
                    <li className="flex items-start gap-2">
                        <i className="fa-solid fa-minus text-rose-400 mt-1"></i>
                        Si decides cancelar la cita con menos de 24 horas de anticipación y la cita ya estaba pagada se te reembolsará el 50 % del monto pagado.
                    </li>
                </ul>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200 rounded-xl font-medium transition-all active:scale-95"
                    >
                        Sí, cancelar
                    </button>
                </div>
            </div>
        </Modal>
    );
};