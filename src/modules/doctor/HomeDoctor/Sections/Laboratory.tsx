interface Props {
    laboratorioSection: {
        id: number;
        paciente: string;
        examen: string;
        alerta: boolean;
    }[];
}

export const Laboratory = ({ laboratorioSection }: Props) => {
    return (
        <>

            {/* LABORATORIO */}
            <section className="bg-white rounded-2xl shadow-md border border-slate-100">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="bg-cyan-100 text-cyan-600 w-8 h-8 rounded-lg flex items-center justify-center"><i className="fa-solid fa-flask"></i></div>
                        Laboratorio - Recientes
                    </h2>
                    <button className="text-slate-400 hover:text-cyan-600"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
                <div className="p-5 space-y-4">
                    {laboratorioSection.map(lab => (
                        <div key={lab.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:shadow-sm transition-all bg-slate-50/50">
                            <div>
                                <span className="block font-bold text-slate-800 text-sm mb-1">{lab.paciente}</span>
                                <span className="block text-xs text-slate-500"><i className="fa-solid fa-vial text-cyan-500 mr-1"></i>{lab.examen}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {lab.alerta && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-1 rounded border border-rose-200" title="Valores fuera de rango">
                                        <i className="fa-solid fa-triangle-exclamation mr-1"></i> Anormal
                                    </span>
                                )}
                                <button className="bg-white border border-slate-200 text-cyan-700 hover:bg-cyan-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                    Revisar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};