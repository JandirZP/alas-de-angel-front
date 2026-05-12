interface SurgeriesDoctorProps {
    mockSurgeries: any
}

export const SurgeriesDoctor = ({ mockSurgeries }: SurgeriesDoctorProps) => {
    return (
        <section className="bg-indigo-50 p-5 rounded-2xl shadow-sm border border-indigo-200 h-fit">
            <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2 border-b border-indigo-200 pb-2 uppercase tracking-wide text-sm">
                <i className="fa-solid fa-scalpel"></i> Cirugías Realizadas
            </h3>
            {mockSurgeries.registros.quirurgicos.length > 0 ? (
                <ul className="space-y-3">
                    {mockSurgeries.registros.quirurgicos.map((quir: any) => (
                        <li key={quir.id} className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                            <div className="mb-1">
                                <span className="block font-bold text-indigo-900 text-sm leading-tight">{quir.nombre}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-indigo-700/80"><i className="fa-regular fa-calendar-days mr-1"></i>{quir.fecha}</span>
                                {quir.huboComplicaciones && (
                                    <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-red-200 flex items-center gap-1">
                                        <i className="fa-solid fa-triangle-exclamation"></i>Complicación
                                    </span>
                                )}
                            </div>
                            {quir.observaciones && <p className="text-[11px] text-indigo-800 italic mt-2 border-t border-indigo-50 pt-1.5 leading-snug">{quir.observaciones}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-indigo-600/70 text-sm italic py-2 text-center bg-white/50 rounded-lg border border-indigo-100/50">Sin cirugías registradas.</p>
            )}
        </section>
    );
};