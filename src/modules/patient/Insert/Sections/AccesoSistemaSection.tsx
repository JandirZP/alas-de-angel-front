interface Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const AccesoSistemaSection = ({ formData, handleChange }: Props) => {
    return (
        <section className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-600 pb-3 flex items-center gap-2 relative z-10">
                <i className="fa-solid fa-shield-halved text-emerald-400"></i> Acceso al Sistema
            </h3>

            <div className="space-y-5 relative z-10">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1">Correo Electrónico <span className="text-rose-400">*</span></label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} required placeholder="correo@ejemplo.com" className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none placeholder:text-slate-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1">Nombre de Usuario <span className="text-rose-400">*</span></label>
                    <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required placeholder="ej: jperez93" className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none placeholder:text-slate-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1">Contraseña Temporal <span className="text-rose-400">*</span></label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none placeholder:text-slate-500" />
                </div>
            </div>
        </section>
    );
};
