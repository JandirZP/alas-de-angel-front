interface HabitsProps {
    historia: any
}
export const Habits = ({ historia }: HabitsProps) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <i className="fa-solid fa-wine-glass text-amber-500"></i> Hábitos y Estilo de Vida
            </h3>
            <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                        <span className="block text-sm font-semibold text-slate-700"><i className="fa-solid fa-beer-mug-empty w-5 text-slate-400"></i> Alcohol</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{historia.habitos.alcohol.estado}</span>
                    </div>
                    <span className="text-xs text-slate-500 pl-6">{historia.habitos.alcohol.frecuencia}</span>
                </li>
                <li className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                        <span className="block text-sm font-semibold text-slate-700"><i className="fa-solid fa-smoking w-5 text-slate-400"></i> Tabaco</span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{historia.habitos.tabaco.estado}</span>
                    </div>
                    <span className="text-xs text-slate-500 pl-6">{historia.habitos.tabaco.frecuencia}</span>
                </li>

                {/* Drogas con Observaciones */}
                {historia.habitos.drogas.length > 0 && (
                    <li className="pt-3 border-t border-slate-100">
                        <span className="block text-sm font-semibold text-slate-700 mb-3"><i className="fa-solid fa-pills w-5 text-slate-400"></i> Otras sustancias:</span>
                        <div className="space-y-2 pl-6">
                            {historia.habitos.drogas.map((droga: any, idx: any) => (
                                <div key={idx} className="bg-rose-50 border border-rose-100 p-2 rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-rose-800 text-xs">{droga.nombreDroga}</span>
                                        <span className="text-rose-600 text-[10px] bg-rose-100 px-2 py-0.5 rounded-full">{droga.frecuencia}</span>
                                    </div>
                                    {/* Mostrar observaciones si existen */}
                                    {droga.observaciones && (
                                        <p className="text-[11px] text-rose-700 italic border-l-2 border-rose-300 pl-2 mt-2 leading-tight">
                                            {droga.observaciones}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </li>
                )}
                {historia.habitos.drogas.length === 0 && (
                    <li className="pt-3 border-t border-slate-100">
                        <span className="block text-sm font-semibold text-slate-700 mb-3"><i className="fa-solid fa-pills w-5 text-slate-400"></i> Otras sustancias:</span>
                        <div className="space-y-2 pl-6">
                            <span className="text-xs text-slate-500 pl-6">No consume drogas</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};