interface Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DatosPersonalesSection = ({ formData, handleChange }: Props) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-regular fa-id-badge text-emerald-500"></i> Datos Personales
            </h3>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Nombres <span className="text-rose-500">*</span></label>
                    <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required placeholder="Ej. Carlos Arturo" className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Apellido Paterno <span className="text-rose-500">*</span></label>
                        <input type="text" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required placeholder="Pérez" className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Apellido Materno <span className="text-rose-500">*</span></label>
                        <input type="text" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required placeholder="Gómez" className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Fecha de Nacimiento <span className="text-rose-500">*</span></label>
                        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Sexo biológico <span className="text-rose-500">*</span></label>
                        <select name="sexo" value={formData.sexo} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                            <option value="true">Masculino</option>
                            <option value="false">Femenino</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
};
