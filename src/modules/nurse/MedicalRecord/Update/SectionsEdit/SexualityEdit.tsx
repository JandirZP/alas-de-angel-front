interface Props {
    historia: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const SexualityEdit = ({ historia, handleChange }: Props) => {
    return (
        <section className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 ${historia.paciente.sexo === 'Masculino' ? 'lg:col-span-2' : ''}`}>
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-venus-mars text-purple-500"></i> Sexualidad
            </h3>
            <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <input type="checkbox" name="sexualmenteActivo" checked={historia.sexualmenteActivo} onChange={handleChange} className="w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500" />
                    <span className="font-semibold text-slate-700">Paciente sexualmente activo</span>
                </label>

                {historia.sexualmenteActivo && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Edad de Inicio</label>
                            <input type="number" name="edadInicioSexual" value={historia.edadInicioSexual} onChange={handleChange} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500/50 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Planificación / Método</label>
                            <input type="text" name="metodoPlanificacion" value={historia.metodoPlanificacion} onChange={handleChange} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="Ej: Preservativo" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};