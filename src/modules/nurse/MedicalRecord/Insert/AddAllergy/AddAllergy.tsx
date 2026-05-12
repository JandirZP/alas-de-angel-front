import React, { useState } from 'react';
import { Modal } from '../../../../../layouts/Modals';
import type { Alergias } from '../../../../../types/models';

interface AddAllergyProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (alergia: Omit<Alergias, 'id' | 'historiaClinicaId'>) => void;
}

export const AddAllergy: React.FC<AddAllergyProps> = ({ visible, onClose, onAdd }) => {
    const [alergeno, setAlergeno] = useState("");
    const [reaccion, setReaccion] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            alergeno,
            reaccion: reaccion.trim() === "" ? null : reaccion.trim(),
            observaciones: observaciones.trim() === "" ? null : observaciones.trim()
        });
        
        // Limpiar formulario y cerrar
        setAlergeno("");
        setReaccion("");
        setObservaciones("");
        onClose();
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-red-300 pb-2">
                    <i className="fa-solid fa-hand-dots text-red-500 mr-2"></i> Agregar Alergia
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Alérgeno (Causa)</label>
                            <input 
                                type="text" required
                                value={alergeno} onChange={(e) => setAlergeno(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                                placeholder="Ej: Penicilina, Maní"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Reacción</label>
                            <input 
                                type="text" required
                                value={reaccion} onChange={(e) => setReaccion(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                                placeholder="Ej: Shock anafiláctico, Urticaria"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Observaciones</label>
                        <textarea 
                            value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                            rows={3} placeholder="Instrucciones en caso de exposición, severidad..."
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