interface DiagnosticProps {
    formData: any
    setFormData: (data: any) => void

}

export const Diagnostic = ({ formData, setFormData }: DiagnosticProps) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-500"></div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-user-doctor text-amber-500"></i> Diagnóstico Médico
            </h2>

            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Diagnóstico (CIE-10 o Detallado) <span className="text-red-500">*</span></label>
                <textarea
                    name="diagnostico"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}

                    required
                    placeholder="Ej: Faringoamigdalitis Aguda (J03.9)"
                    className="w-full bg-amber-50/30 border border-amber-200 text-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500/50 outline-none min-h-[100px] resize-y font-medium"
                />
            </div>
        </section>
    );
};