interface Props {
    historia: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const BiologicalAndFamilyData = ({ historia, handleChange }: Props) => {
    return (
        <>
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <i className="fa-solid fa-droplet text-rose-500"></i> Datos Biológicos
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Grupo Sanguíneo</label>
                        <select name="grupoSanguineo" value={historia.grupoSanguineo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Factor RH</label>
                        <select name="factorRH" value={historia.factorRH} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                            <option value="+">Positivo (+)</option>
                            <option value="-">Negativo (-)</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <i className="fa-solid fa-dna text-blue-500"></i> Antecedentes Familiares
                </h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="antecedentesFamiliares" checked={historia.antecedentesFamiliares} onChange={handleChange} className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                        <span className="font-semibold text-slate-700">Presenta antecedentes de importancia</span>
                    </label>
                    {historia.antecedentesFamiliares && (
                        <textarea name="especifiqueAnteFamil" value={historia.especifiqueAnteFamil} onChange={handleChange} placeholder="Detalle los antecedentes..." className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none min-h-[80px]" />
                    )}
                </div>
            </section>

        </>
    );
};