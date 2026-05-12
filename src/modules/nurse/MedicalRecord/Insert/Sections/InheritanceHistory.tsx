import React from 'react';

interface Props {
    tieneAntecedentesFamiliares: boolean;
    setTieneAntecedentesFamiliares: (val: boolean) => void;
    especifiqueAnteFamil: string;
    setEspecifiqueAnteFamil: (val: string) => void;
}

export const InheritanceHistory: React.FC<Props> = ({
    tieneAntecedentesFamiliares,
    setTieneAntecedentesFamiliares,
    especifiqueAnteFamil,
    setEspecifiqueAnteFamil
}) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <i className="fa-solid fa-dna text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Antecedentes Hereditarios</h2>
            </div>

            <div className="space-y-6">
                <label className="flex items-center cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={tieneAntecedentesFamiliares}
                            onChange={() => setTieneAntecedentesFamiliares(!tieneAntecedentesFamiliares)}
                        />
                        <div className={`block w-14 h-8 rounded-full transition-colors ${tieneAntecedentesFamiliares ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${tieneAntecedentesFamiliares ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div className="ml-4">
                        <span className="block text-sm font-bold text-slate-800">¿Tiene antecedentes familiares de importancia?</span>
                        <span className="block text-xs text-slate-500">Diabetes, Hipertensión, Cáncer, etc.</span>
                    </div>
                </label>

                {tieneAntecedentesFamiliares && (
                    <div className="space-y-2 animate-fade-in-down">
                        <label className="text-sm font-semibold text-slate-600">Especifique los antecedentes</label>
                        <textarea
                            value={especifiqueAnteFamil}
                            onChange={(e) => setEspecifiqueAnteFamil(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all min-h-[100px] resize-y"
                            placeholder="Ej. Padre con Hipertensión Arterial, Madre con Diabetes Tipo II..."
                        ></textarea>
                    </div>
                )}
            </div>
        </section>
    );
};
