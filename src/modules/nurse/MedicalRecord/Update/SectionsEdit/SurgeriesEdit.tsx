interface Props {
    historia: any;
    handleDeleteQuirurgico: (idOperacion: number) => void;
    handleQuirurgicoChange: (idOperacion: number, field: string, value: any) => void;
    handleAddQuirurgico: (e: React.MouseEvent) => void;
}

export const SurgeriesEdit = ({ historia, handleDeleteQuirurgico, handleQuirurgicoChange, handleAddQuirurgico }: Props) => {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col h-full">
            <h4 className="font-bold text-sm text-indigo-600 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <i className="fa-solid fa-scalpel"></i> Cirugías
            </h4>
            <div className="flex-1 space-y-3 mb-4">
                {historia.quirurgicos.length > 0 ? historia.quirurgicos.map((item: any) => (
                    <div key={item.id} className="bg-white border border-indigo-200 rounded-lg p-3 shadow-sm relative">
                        <button type="button" onClick={() => handleDeleteQuirurgico(item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
                        <input
                            type="text"
                            value={item.nombre || ''}
                            onChange={(e) => handleQuirurgicoChange(item.id, 'nombre', e.target.value)}
                            className="font-bold text-slate-800 text-sm border-b border-dashed border-indigo-300 w-[85%] focus:outline-none focus:border-indigo-500 mb-1"
                            placeholder="Nombre de operación..."
                        />
                        <div className="flex gap-2 mb-2">
                            <input
                                type="date"
                                value={item.fecha || ''}
                                onChange={(e) => handleQuirurgicoChange(item.id, 'fecha', e.target.value)}
                                className="text-xs text-slate-500 border border-slate-200 rounded px-1.5 w-1/2 focus:outline-none focus:border-indigo-400"
                            />
                            <label className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 rounded border border-indigo-100 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.huboComplicaciones || false}
                                    onChange={(e) => handleQuirurgicoChange(item.id, 'huboComplicaciones', e.target.checked)}
                                    className="rounded-sm text-indigo-500"
                                /> Complic.
                            </label>
                        </div>
                        <textarea
                            value={item.observaciones || ''}
                            onChange={(e) => handleQuirurgicoChange(item.id, 'observaciones', e.target.value)}
                            className="w-full text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                            placeholder="Observaciones..."
                        />
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-center p-4 text-sm italic text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-white">
                        <i className="fa-solid fa-check text-emerald-400 text-xl mb-1"></i>
                        El paciente no tiene intervenciones quirúrgicas.
                    </div>
                )}
            </div>
            <button type="button" onClick={handleAddQuirurgico} className="w-full py-2 bg-white border border-indigo-300 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 shadow-sm transition-colors cursor-pointer">
                + Agregar Cirugía
            </button>
        </div>
    )
}