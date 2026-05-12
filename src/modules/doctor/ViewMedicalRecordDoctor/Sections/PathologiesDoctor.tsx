interface PathologiesDoctorProps {
    mockPathologies: any
}

export const PathologiesDoctor = ({ mockPathologies }: PathologiesDoctorProps) => {
    return (
        <section className="bg-orange-50 p-5 rounded-2xl shadow-sm border border-orange-200 h-fit">
            <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2 border-b border-orange-200 pb-2 uppercase tracking-wide text-sm">
                <i className="fa-solid fa-virus"></i> Patologías Previas
            </h3>
            {mockPathologies.registros.patologias.length > 0 ? (
                <ul className="space-y-3">
                    {mockPathologies.registros.patologias.map((pat: any) => (
                        <li key={pat.id} className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm relative">
                            <div className="flex justify-between items-start mb-1 pr-16">
                                <span className="block font-bold text-orange-900 text-sm leading-tight">{pat.nombre}</span>
                            </div>
                            {pat.enTratamiento && (
                                <span className="absolute top-3 right-3 text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-orange-200">
                                    En Tratam.
                                </span>
                            )}
                            <span className="block text-xs text-orange-700/80 mb-1">
                                <i className="fa-regular fa-calendar-days mr-1"></i>Diag: {pat.fechaDiagnostico}
                            </span>
                            {pat.observaciones && <p className="text-[11px] text-orange-800 italic mt-2 border-t border-orange-50 pt-1.5 leading-snug">{pat.observaciones}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-orange-600/70 text-sm italic py-2 text-center bg-white/50 rounded-lg border border-orange-100/50">Sin patologías registradas.</p>
            )}
        </section>
    );
};