import React, { useState, type Dispatch, type SetStateAction } from 'react';
import type { HistorialDrogas } from '../../../../../types/models';
import { Drughistory } from '../AddDrugs/Drughistory';

interface Props {
    estadoAlcohol: number;
    setEstadoAlcohol: (val: number) => void;
    frecuenciaAlcohol: string;
    setFrecuenciaAlcohol: (val: string) => void;
    estadoTabaco: number;
    setEstadoTabaco: (val: number) => void;
    frecuenciaTabaco: string;
    setFrecuenciaTabaco: (val: string) => void;
    consumeDrogas: boolean;
    setConsumeDrogas: (val: boolean) => void;
    drogasList: HistorialDrogas[];
    setDrogasList: Dispatch<SetStateAction<HistorialDrogas[]>>;
}

export const HabitsAndLifestyle: React.FC<Props> = ({
    estadoAlcohol,
    setEstadoAlcohol,
    frecuenciaAlcohol,
    setFrecuenciaAlcohol,
    estadoTabaco,
    setEstadoTabaco,
    frecuenciaTabaco,
    setFrecuenciaTabaco,
    consumeDrogas,
    setConsumeDrogas,
    drogasList,
    setDrogasList
}) => {

    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);

    const handleAddDrug = (drug: Omit<HistorialDrogas, 'id' | 'historiaClinicaId'>) => {
        setDrogasList(prev => [...prev, { ...drug, id: -Date.now() } as HistorialDrogas]);
    };

    const removeDrug = (id: number) => {
        setDrogasList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                    <i className="fa-solid fa-wine-glass text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Hábitos y Estilo de Vida</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Alcohol */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2"><i className="fa-solid fa-beer-mug-empty mr-2 text-slate-400"></i>Consumo de Alcohol</h3>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</label>
                        <select
                            value={estadoAlcohol}
                            onChange={(e) => setEstadoAlcohol(Number(e.target.value))}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value={0}>Nunca</option>
                            <option value={1}>Ex consumidor</option>
                            <option value={2}>Activo</option>
                        </select>
                    </div>
                    <div className={`space-y-2 transition-opacity ${estadoAlcohol === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Frecuencia</label>
                        <input
                            type="text"
                            value={frecuenciaAlcohol}
                            onChange={(e) => setFrecuenciaAlcohol(e.target.value)}
                            disabled={estadoAlcohol === 0}
                            placeholder={estadoAlcohol === 0 ? "" : "Ej: Fines de semana"}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500/50"
                        />
                    </div>
                </div>

                {/* Tabaco */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2"><i className="fa-solid fa-smoking mr-2 text-slate-400"></i>Consumo de Tabaco</h3>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</label>
                        <select
                            value={estadoTabaco}
                            onChange={(e) => setEstadoTabaco(Number(e.target.value))}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value={0}>Nunca</option>
                            <option value={1}>Ex consumidor</option>
                            <option value={2}>Activo</option>
                        </select>
                    </div>
                    <div className={`space-y-2 transition-opacity ${estadoTabaco === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Frecuencia</label>
                        <input
                            type="text"
                            value={frecuenciaTabaco}
                            onChange={(e) => setFrecuenciaTabaco(e.target.value)}
                            disabled={estadoTabaco === 0}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500/50"
                            placeholder={estadoTabaco === 0 ? "N/A" : "Ej: 5 a la semana"}
                        />
                    </div>
                </div>
            </div>

            {/* Historial Drogas */}
            <div className="mt-8 border-t border-slate-100 pt-6">
                <label className="flex items-center cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={consumeDrogas}
                            onChange={() => setConsumeDrogas(!consumeDrogas)}
                        />
                        <div className={`block w-14 h-8 rounded-full transition-colors ${consumeDrogas ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${consumeDrogas ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div className="ml-4">
                        <span className="block text-sm font-bold text-slate-800">¿Consume drogas?</span>

                    </div>



                </label>

                {consumeDrogas && (

                    <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full mt-4">
                        <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-cannabis text-emerald-500"></i> Historial de Drogas
                        </h3>
                        <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-48 pr-1">
                            {drogasList.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-sm text-slate-400 italic text-center">Sin registros de drogas</p>
                                </div>
                            ) : (
                                drogasList.map(dr => (
                                    <div key={dr.id} className="text-xs bg-indigo-50 text-indigo-800 p-2 rounded border border-indigo-100 flex justify-between items-start">
                                        <div>
                                            <strong className="block">{dr.nombreDroga}

                                            </strong>
                                            <div className="flex gap-2">
                                                <span className="text-slate-500 font-medium">Frecuencia: {dr.frecuencia}</span>
                                                <span className="text-slate-500 font-medium">Obvservaciones: {dr.observaciones}</span>
                                            </div>

                                        </div>
                                        <button type="button" onClick={() => removeDrug(dr.id)} className="text-indigo-400 hover:text-indigo-700"><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                ))
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsDrugModalOpen(true)}
                            className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                            + Agregar Droga Ilícita
                        </button>
                    </div>

                )}
            </div>
            <Drughistory
                visible={isDrugModalOpen}
                onClose={() => setIsDrugModalOpen(false)}
                onAddDrug={handleAddDrug}
            />
        </section>
    );
};
