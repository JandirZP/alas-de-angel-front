import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Alergias, AntecedentesPatologicos, AntecedentesQuirurgicos } from '../../../../../types/models';
import { AddPathology } from '../AddPathology/AddPathology';
import { AddSurgery } from '../AddSurgery/AddSurgery';
import { AddAllergy } from '../AddAllergy/AddAllergy';

interface DetailTablesProps {
    alergiasList: Alergias[];
    setAlergiasList: Dispatch<SetStateAction<Alergias[]>>;
    antecedentesPatologicosList: AntecedentesPatologicos[];
    setAntecedentesPatologicosList: Dispatch<SetStateAction<AntecedentesPatologicos[]>>;
    antecedentesQuirurgicosList: AntecedentesQuirurgicos[];
    setAntecedentesQuirurgicosList: Dispatch<SetStateAction<AntecedentesQuirurgicos[]>>;
}

export const DetailTables: React.FC<DetailTablesProps> = ({
    alergiasList,
    setAlergiasList,
    antecedentesPatologicosList,
    setAntecedentesPatologicosList,
    antecedentesQuirurgicosList,
    setAntecedentesQuirurgicosList
}) => {
    // Estados para controlar los modales
    const [isPathologyModalOpen, setIsPathologyModalOpen] = useState(false);
    const [isSurgeryModalOpen, setIsSurgeryModalOpen] = useState(false);
    const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);

    // Handlers para agregar elementos (asignando un ID temporal negativo si es necesario o manejado por backend)
    const handleAddPathology = (patologia: Omit<AntecedentesPatologicos, 'id' | 'historiaClinicaId'>) => {
        setAntecedentesPatologicosList(prev => [...prev, { ...patologia, id: -Date.now() } as AntecedentesPatologicos]);
    };

    const handleAddSurgery = (cirugia: Omit<AntecedentesQuirurgicos, 'id' | 'historiaClinicaId'>) => {
        setAntecedentesQuirurgicosList(prev => [...prev, { ...cirugia, id: -Date.now() } as AntecedentesQuirurgicos]);
    };

    const handleAddAllergy = (alergia: Omit<Alergias, 'id' | 'historiaClinicaId'>) => {
        setAlergiasList(prev => [...prev, { ...alergia, id: -Date.now() } as Alergias]);
    };

    // Funciones para eliminar de las listas
    const removePathology = (id: number) => {
        setAntecedentesPatologicosList(prev => prev.filter(item => item.id !== id));
    };

    const removeSurgery = (id: number) => {
        setAntecedentesQuirurgicosList(prev => prev.filter(item => item.id !== id));
    };

    const removeAllergy = (id: number) => {
        setAlergiasList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 relative">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Registros Clínicos Adicionales</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Patologías */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full">
                    <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-virus text-orange-500"></i> Enf. Patológicas
                    </h3>
                    <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-48 pr-1">
                        {antecedentesPatologicosList.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-slate-400 italic text-center">Sin registros patológicos</p>
                            </div>
                        ) : (
                            antecedentesPatologicosList.map(pat => (
                                <div key={pat.id} className="text-xs bg-orange-50 text-orange-800 p-2 rounded border border-orange-100 flex justify-between items-start">
                                    <div>
                                        <strong className="block">{pat.nombre}</strong>
                                        <span className="text-slate-500">Diag: {pat.fechaDiagnostico} {pat.enTratamiento && '- En tratam.'}</span>
                                    </div>
                                    <button type="button" onClick={() => removePathology(pat.id)} className="text-orange-400 hover:text-orange-700"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsPathologyModalOpen(true)}
                        className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                        + Agregar Patología
                    </button>
                </div>

                {/* Quirúrgicos */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full">
                    <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-scissors text-indigo-500"></i> Antecedentes Quirúrgicos
                    </h3>
                    <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-48 pr-1">
                        {antecedentesQuirurgicosList.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-slate-400 italic text-center">Sin registros quirúrgicos</p>
                            </div>
                        ) : (
                            antecedentesQuirurgicosList.map(cir => (
                                <div key={cir.id} className="text-xs bg-indigo-50 text-indigo-800 p-2 rounded border border-indigo-100 flex justify-between items-start">
                                    <div>
                                        <strong className="block">{cir.nombre}</strong>
                                        <span className="text-slate-500">Fecha: {cir.fecha} {cir.huboComplicaciones && '- Hubo comp.'}</span>
                                    </div>
                                    <button type="button" onClick={() => removeSurgery(cir.id)} className="text-indigo-400 hover:text-indigo-700"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSurgeryModalOpen(true)}
                        className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                        + Agregar Operación
                    </button>
                </div>

                {/* Alergias */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full">
                    <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-hand-dots text-red-500"></i> Alergias
                    </h3>
                    <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-48 pr-1">
                        {alergiasList.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-slate-400 italic text-center">Sin alergias registradas</p>
                            </div>
                        ) : (
                            alergiasList.map(aler => (
                                <div key={aler.id} className="text-xs bg-red-50 text-red-800 p-2 rounded border border-red-100 flex justify-between items-start">
                                    <div>
                                        <strong className="block">{aler.alergeno}</strong>
                                        <span className="text-slate-500">Reacción: {aler.reaccion}</span>
                                    </div>
                                    <button type="button" onClick={() => removeAllergy(aler.id)} className="text-red-400 hover:text-red-700"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsAllergyModalOpen(true)}
                        className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                        + Agregar Alergia
                    </button>
                </div>
            </div>

            {/* Modales */}
            <AddPathology
                visible={isPathologyModalOpen}
                onClose={() => setIsPathologyModalOpen(false)}
                onAdd={handleAddPathology}
            />

            <AddSurgery
                visible={isSurgeryModalOpen}
                onClose={() => setIsSurgeryModalOpen(false)}
                onAdd={handleAddSurgery}
            />

            <AddAllergy
                visible={isAllergyModalOpen}
                onClose={() => setIsAllergyModalOpen(false)}
                onAdd={handleAddAllergy}
            />
        </section>
    );
};
