import React, { useState } from 'react';
import { Modal } from '../../../../../layouts/Modals';
import type { AntecedentesQuirurgicos } from '../../../../../types/models';

interface AddSurgeryProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (cirugia: Omit<AntecedentesQuirurgicos, 'id' | 'historiaClinicaId'>) => void;
}

export const AddSurgery: React.FC<AddSurgeryProps> = ({ visible, onClose, onAdd }) => {
    const [nombreOperacion, setNombreOperacion] = useState("");
    const [fechaOperacion, setFechaOperacion] = useState("");
    const [huboComplicaciones, setHuboComplicaciones] = useState(false);
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            nombre: nombreOperacion,
            fecha: fechaOperacion.trim() === "" ? null : fechaOperacion,
            huboComplicaciones,
            observaciones: observaciones.trim() === "" ? null : observaciones.trim()
        });
        
        // Limpiar formulario y cerrar
        setNombreOperacion("");
        setFechaOperacion("");
        setHuboComplicaciones(false);
        setObservaciones("");
        onClose();
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-indigo-300 pb-2">
                    <i className="fa-solid fa-scalpel text-indigo-500 mr-2"></i> Agregar Cirugía
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre de Operación</label>
                        <input 
                            type="text" required
                            value={nombreOperacion} onChange={(e) => setNombreOperacion(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                            placeholder="Ej: Apendicectomía"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Fecha de Operación</label>
                            <input 
                                type="date" 
                                value={fechaOperacion} onChange={(e) => setFechaOperacion(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={huboComplicaciones} onChange={(e) => setHuboComplicaciones(e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm font-semibold text-slate-700">Hubo complicaciones</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Observaciones</label>
                        <textarea 
                            value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                            rows={3} placeholder={huboComplicaciones ? "Especifique las complicaciones..." : "Detalles adicionales..."}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-indigo-300">
                        <button type="button" onClick={onClose} className="px-5 py-2 font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                        <button type="submit" className="px-5 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar Cirugía</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};