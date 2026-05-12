interface AnamensisProps {
    formData: any
    setFormData: (data: any) => void
}

export const Anamensis = ({ formData, setFormData }: AnamensisProps) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-comment-medical text-emerald-500"></i> Anamnesis y Evaluación
            </h2>

            <div className="space-y-5">
                <div className="w-full md:w-1/3">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Tipo de Evento / Atención <span className="text-red-500">*</span></label>
                    <select
                        name="tipoEvento"
                        value={formData.tipoEvento}
                        onChange={(e) => setFormData({ ...formData, tipoEvento: e.target.value })}

                        required
                        className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    >
                        <option value="Consulta Externa">Consulta Externa</option>
                        <option value="Emergencia">Emergencia</option>
                        <option value="Control">Control / Reevaluación</option>
                        <option value="Teleconsulta">Teleconsulta</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Descripción / Motivo de Consulta <span className="text-red-500">*</span></label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}

                        required
                        placeholder="Describa los síntomas, tiempo de evolución y detalles relevantes..."
                        className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500/50 outline-none min-h-[120px] resize-y"
                    />
                </div>
            </div>
        </section>
    );
};