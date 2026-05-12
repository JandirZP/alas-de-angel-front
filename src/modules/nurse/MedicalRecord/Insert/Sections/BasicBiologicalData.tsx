import React from 'react';

interface Props {
    grupoSanguineo: string;
    setGrupoSanguineo: (val: string) => void;
    factorRH: string;
    setFactorRH: (val: string) => void;
}

export const BasicBiologicalData: React.FC<Props> = ({
    grupoSanguineo,
    setGrupoSanguineo,
    factorRH,
    setFactorRH
}) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                    <i className="fa-solid fa-droplet text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Datos Biológicos Básicos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Grupo Sanguíneo</label>
                    <select
                        value={grupoSanguineo}
                        onChange={(e) => setGrupoSanguineo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    >
                        <option value="" disabled>Seleccione grupo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Factor RH</label>
                    <select
                        value={factorRH}
                        onChange={(e) => setFactorRH(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    >
                        <option value="" disabled>Seleccione factor</option>
                        <option value="+">Positivo (+)</option>
                        <option value="-">Negativo (-)</option>
                    </select>
                </div>
            </div>
        </section>
    );
};
