interface MedicalTreatmentProps {
    formData: any
    setFormData: (data: any) => void

}

export const MedicalTreatment = ({ formData, setFormData }: MedicalTreatmentProps) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-pills text-indigo-500"></i> Plan de Tratamiento y Receta
            </h2>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1 items-center gap-2"><i className="fa-solid fa-prescription text-slate-400"></i> Medicamentos (Receta Médica)</label>
                    <textarea
                        name="medicamentos"
                        value={formData.medicamentos}
                        onChange={(e) => setFormData({ ...formData, medicamentos: e.target.value })}

                        placeholder="Detalle medicamento, concentración, dosis y duración..."
                        className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 outline-none min-h-[100px] resize-y"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1 items-center gap-2"><i className="fa-solid fa-apple-whole text-slate-400"></i> Indicaciones de Dieta</label>
                        <textarea
                            name="dieta"
                            value={formData.dieta}
                            onChange={(e) => setFormData({ ...formData, dieta: e.target.value })}

                            placeholder="Ej: Dieta blanda, evitar grasas..."
                            className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500/50 outline-none min-h-[80px]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1 items-center gap-2"><i className="fa-solid fa-clipboard-list text-slate-400"></i> Recomendaciones Generales</label>
                        <textarea
                            name="recomendaciones"
                            value={formData.recomendaciones}
                            onChange={(e) => setFormData({ ...formData, recomendaciones: e.target.value })}

                            placeholder="Reposo, signos de alarma, próxima cita..."
                            className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500/50 outline-none min-h-[80px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};