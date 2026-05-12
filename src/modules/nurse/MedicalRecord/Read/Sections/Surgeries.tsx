interface SurgeriesProps {
    historia: any
}

export const Surgeries = ({ historia }: SurgeriesProps) => {
    return (
        <div>
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-scalpel"></i> Antecedentes Quirúrgicos
            </h4>
            {historia.registros.quirurgicos.length > 0 ? (
                <ul className="space-y-3">
                    {historia.registros.quirurgicos.map((quir: any) => (
                        <li key={quir.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-bold text-slate-800 text-base block">{quir.nombre}</span>
                                    <span className="text-xs text-slate-500"><i className="fa-regular fa-calendar mr-1"></i>Fecha: {quir.fecha}</span>
                                </div>
                                {quir.huboComplicaciones && (
                                    <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                                        Hubo complicaciones
                                    </span>
                                )}
                            </div>
                            {/* Sección de Observaciones */}
                            {quir.observaciones && (
                                <div className="mt-3 bg-slate-50 p-3 rounded-lg border-l-2 border-indigo-300">
                                    <p className="text-sm text-slate-600 italic">
                                        <span className="font-semibold not-italic text-slate-700 mr-1">Reporte:</span>
                                        {quir.observaciones}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-slate-400 text-sm font-medium"><i className="fa-solid fa-check text-emerald-400 mr-2"></i>El paciente no ha tenido intervenciones quirúrgicas.</span>
                </div>
            )}
        </div>
    );
};