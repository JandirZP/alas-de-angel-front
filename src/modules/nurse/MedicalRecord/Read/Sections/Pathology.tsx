interface PathologyProps {
    historia: any
}

export const Pathology = ({ historia }: PathologyProps) => {
    return (
        <div>
            <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-virus"></i> Antecedentes Patológicos
            </h4>
            {historia.registros.patologias.length > 0 ? (
                <ul className="space-y-3">
                    {historia.registros.patologias.map((pat: any) => (
                        <li key={pat.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-bold text-slate-800 text-base block">{pat.nombre}</span>
                                    <span className="text-xs text-slate-500"><i className="fa-regular fa-calendar mr-1"></i>Diag: {pat.fechaDiagnostico}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${pat.enTratamiento ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-600'}`}>
                                    {pat.enTratamiento ? 'En tratamiento' : 'Sin tratamiento'}
                                </span>
                            </div>
                            {/* Sección de Observaciones */}
                            {pat.observaciones && (
                                <div className="mt-3 bg-slate-50 p-3 rounded-lg border-l-2 border-orange-300">
                                    <p className="text-sm text-slate-600 italic">
                                        <span className="font-semibold not-italic text-slate-700 mr-1">Observaciones:</span>
                                        {pat.observaciones}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">Sin enfermedades crónicas o patologías previas registradas.</p>
            )}
        </div>
    );
};