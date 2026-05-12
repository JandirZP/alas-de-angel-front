interface AllergiesDoctorProps {
    mockAllergies: any
}

export const AllergiesDoctor = ({ mockAllergies }: AllergiesDoctorProps) => {
    return (
        <section className="bg-rose-50 p-5 rounded-2xl shadow-sm border border-rose-200 h-fit">
            <h3 className="font-bold text-rose-800 mb-3 flex items-center gap-2 border-b border-rose-200 pb-2 uppercase tracking-wide text-sm">
                <i className="fa-solid fa-triangle-exclamation"></i> Alergias Registradas
            </h3>
            {mockAllergies.registros.alergias.length > 0 ? (
                <ul className="space-y-2">
                    {mockAllergies.registros.alergias.map((alergia: any) => (
                        <li key={alergia.id} className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                            <span className="block font-bold text-rose-900">{alergia.alergeno}</span>
                            <span className="block text-xs text-rose-700">Rx: {alergia.reaccion}</span>
                            {alergia.observaciones && <span className="block text-[11px] text-rose-600/80 italic mt-1 border-t border-rose-50 pt-1 leading-snug">{alergia.observaciones}</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-rose-600/70 text-sm italic py-2 text-center bg-white/50 rounded-lg border border-rose-100/50">Sin alergias conocidas.</p>
            )}
        </section>
    );
};