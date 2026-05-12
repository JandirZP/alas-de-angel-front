interface Props {
    historia: any;
    handleDeletePatologia: (idPatologia: number) => void;
    handlePatologiaChange: (idPatologia: number, field: string, value: any) => void;
    handleAddPatologia: (e: React.MouseEvent) => void;
}

export const PathologyEdit = ({ historia, handleDeletePatologia, handlePatologiaChange, handleAddPatologia }: Props) => {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col h-full">
            <h4 className="font-bold text-sm text-orange-600 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <i className="fa-solid fa-virus"></i> Patologías
            </h4>
            <div className="flex-1 space-y-3 mb-4">
                {historia.patologias.length > 0 ? historia.patologias.map((item: any) => (
                    <div key={item.id} className="bg-white border border-orange-200 rounded-lg p-3 shadow-sm relative">
                        <button type="button" onClick={() => handleDeletePatologia(item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
                        <input
                            type="text"
                            value={item.nombre || ''}
                            onChange={(e) => handlePatologiaChange(item.id, 'nombre', e.target.value)}
                            className="font-bold text-slate-800 text-sm border-b border-dashed border-orange-300 w-[85%] focus:outline-none focus:border-orange-500 mb-1"
                            placeholder="Nombre de la enfermedad..."
                        />
                        <div className="flex gap-2 mb-2">
                            <input
                                type="date"
                                value={item.fechaDiagnostico || ''}
                                onChange={(e) => handlePatologiaChange(item.id, 'fechaDiagnostico', e.target.value)}
                                className="text-xs text-slate-500 border border-slate-200 rounded px-1.5 w-1/2 focus:outline-none focus:border-orange-400"
                            />
                            <label className="flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-50 px-1.5 rounded border border-orange-100 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.enTratamiento || false}
                                    onChange={(e) => handlePatologiaChange(item.id, 'enTratamiento', e.target.checked)}
                                    className="rounded-sm text-orange-500"
                                /> Tratam.
                            </label>
                        </div>
                        <textarea
                            value={item.observaciones || ''}
                            onChange={(e) => handlePatologiaChange(item.id, 'observaciones', e.target.value)}
                            className="w-full text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            placeholder="Observaciones..."
                        />
                    </div>
                )) : (
                    <div className="text-center py-6 text-sm italic text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-white">No hay patologías registradas.</div>
                )}
            </div>
            <button type="button" onClick={handleAddPatologia} className="w-full py-2 bg-white border border-orange-300 text-orange-600 rounded-lg text-sm font-bold hover:bg-orange-50 shadow-sm transition-colors cursor-pointer">
                + Agregar Patología
            </button>
        </div>
    )
}