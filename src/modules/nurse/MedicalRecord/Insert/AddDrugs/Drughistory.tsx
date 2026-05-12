import { useState } from "react";
import type { HistorialDrogas } from "../../../../../types/models";
import { Modal } from "../../../../../layouts/Modals";

interface addDrugsProps {
    visible: boolean,
    onClose: () => void,
    onAddDrug: (drug: Omit<HistorialDrogas, 'id' | 'historiaClinicaId'>) => void

}

export const Drughistory: React.FC<addDrugsProps> = ({ visible, onClose, onAddDrug }) => {
    const [nombreDroga, setNombreDroga] = useState("");
    const [frecuencia, setFrecuencia] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddDrug({ nombreDroga, frecuencia, observaciones });
        setNombreDroga("");
        setFrecuencia("");
        setObservaciones("");
        onClose();
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-red-300 pb-2">
                    <i className="fa-solid fa-hand-dots text-red-500 mr-2"></i> Agregar Droga Ilícita
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Droga</label>
                            <input
                                type="text" required
                                value={nombreDroga} onChange={(e) => setNombreDroga(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                                placeholder="Ej: Marihuana, Cocaína, Heroína, etc"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Frecuencia</label>
                            <input
                                type="text" required
                                value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                                placeholder="Ej: Diario, Semanal, Mensual, etc"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Observaciones</label>
                        <textarea
                            required
                            value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                            rows={3} placeholder="Es imperativo indicar si consumió o consume actualmente la droga"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-red-300">
                        <button type="button" onClick={onClose} className="px-5 py-2 font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                        <button type="submit" className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Guardar Alergia</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};