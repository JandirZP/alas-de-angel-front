import React, { useState } from 'react';
import { Modal } from '../../../../../layouts/Modals';
import type { AntecedentesPatologicos } from '../../../../../types/models';

interface AddPathologyProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (patologia: Omit<AntecedentesPatologicos, 'id' | 'historiaClinicaId'>) => void;
}

export const AddPathology: React.FC<AddPathologyProps> = ({ visible, onClose, onAdd }) => {
    const [nombreEnfermedad, setNombreEnfermedad] = useState("");
    const [fechaDiagnostico, setFechaDiagnostico] = useState("");
    const [estaEnTratamiento, setEstaEnTratamiento] = useState(false);
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            nombre: nombreEnfermedad,
            fechaDiagnostico: fechaDiagnostico.trim() === "" ? null : fechaDiagnostico,
            enTratamiento: estaEnTratamiento,
            observaciones: observaciones.trim() === "" ? null : observaciones.trim()
        });
        
        // Limpiar formulario y cerrar
        setNombreEnfermedad("");
        setFechaDiagnostico("");
        setEstaEnTratamiento(false);
        setObservaciones("");
        onClose();
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-emerald-300 pb-2">
                    <i className="fa-solid fa-virus text-orange-500 mr-2"></i> Agregar Patología
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Enfermedad</label>
                        <input 
                            type="text" required
                            value={nombreEnfermedad} onChange={(e) => setNombreEnfermedad(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                            placeholder="Ej: Asma Bronquial"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Fecha Diagnóstico</label>
                            <input 
                                type="date" 
                                value={fechaDiagnostico} onChange={(e) => setFechaDiagnostico(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                            />
                        </div>
                        <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={estaEnTratamiento} onChange={(e) => setEstaEnTratamiento(e.target.checked)}
                                    className="w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                                />
                                <span className="text-sm font-semibold text-slate-700">En tratamiento actual</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Observaciones</label>
                        <textarea 
                            value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                            rows={3} placeholder="Detalles adicionales..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-emerald-300">
                        <button type="button" onClick={onClose} className="px-5 py-2 font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
                        <button type="submit" className="px-5 py-2 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Guardar Patología</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};