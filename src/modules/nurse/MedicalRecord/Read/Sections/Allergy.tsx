interface AllergyProps {
    historia: any
}

export const Allergy = ({ historia }: AllergyProps) => {
    return (
        <div>
            <h4 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i> Alergias Registradas
            </h4>
            {historia.registros.alergias.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                    {historia.registros.alergias.map((alergia: any) => (
                        <div key={alergia.id} className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                <span className="block font-bold text-rose-900 text-lg">{alergia.alergeno}</span>
                                <span className="inline-block bg-white text-rose-700 text-xs px-2 py-1 rounded shadow-sm border border-rose-100 mt-1 sm:mt-0 font-medium">Reacción: {alergia.reaccion}</span>
                            </div>
                            {/* Sección de Observaciones */}
                            {alergia.observaciones && (
                                <p className="text-sm text-rose-800/80 italic bg-white/60 p-2 rounded border border-rose-100 mt-2">
                                    <strong className="not-italic text-rose-800">Obs:</strong> {alergia.observaciones}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">Sin alergias conocidas.</p>
            )}
        </div>
    );
};