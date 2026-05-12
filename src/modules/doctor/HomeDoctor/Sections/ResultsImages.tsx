interface Props {
    imagenesSection: {
        id: number;
        paciente: string;
        examen: string;
        area: string;
        fecha: string;
        estado: string;
    }[];
}

export const ResultsImages = ({ imagenesSection }: Props) => {
    return (
        <>

            {/* IMÁGENES (RAYOS X, RESONANCIA) */}
            <section className="bg-white rounded-2xl shadow-md border border-slate-100">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-lg flex items-center justify-center"><i className="fa-solid fa-x-ray"></i></div>
                        Imágenes Diagnósticas
                    </h2>
                    <button className="text-slate-400 hover:text-purple-600"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
                <div className="p-5 space-y-4">
                    {imagenesSection.map(img => (
                        <div key={img.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:shadow-sm transition-all bg-slate-50/50">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-800 text-sm">{img.paciente}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{img.area}</span>
                                </div>
                                <span className="block text-xs text-slate-500"><i className="fa-regular fa-image text-purple-500 mr-1"></i>{img.examen}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                    <i className="fa-solid fa-circle-check"></i> Listo
                                </span>
                                <button className="bg-white border border-slate-200 text-purple-700 hover:bg-purple-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                    Ver Placas
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </>
    );
};