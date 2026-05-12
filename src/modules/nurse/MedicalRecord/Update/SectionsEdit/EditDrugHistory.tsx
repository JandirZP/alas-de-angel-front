interface Props {
    historia: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleDeleteDroga: (idDrogas: number) => void;
    handleDrogaChange: (idDrogas: number, field: string, value: any) => void;
    handleAddDroga: (e: React.MouseEvent) => void;
}

export const EditDrugHistory = ({ historia, handleChange, handleDeleteDroga, handleDrogaChange, handleAddDroga }: Props) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-wine-glass text-amber-500"></i> Hábitos y Estilo de Vida
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Alcohol */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2"><i className="fa-solid fa-beer-mug-empty mr-2 text-slate-400"></i>Alcohol</h4>
                    <select name="estadoAlcohol" value={historia.estadoAlcohol} onChange={handleChange} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none">
                        <option value="0">Nunca</option>
                        <option value="1">Ex consumidor</option>
                        <option value="2">Activo</option>
                    </select>
                    <input type="text" name="frecuenciaAlcohol" value={historia.frecuenciaAlcohol} onChange={handleChange} placeholder="Frecuencia..." disabled={historia.estadoAlcohol === "0"} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none disabled:opacity-50 disabled:bg-slate-100" />
                </div>
                {/* Tabaco */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2"><i className="fa-solid fa-smoking mr-2 text-slate-400"></i>Tabaco</h4>
                    <select name="estadoTabaco" value={historia.estadoTabaco} onChange={handleChange} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none">
                        <option value="0">Nunca</option>
                        <option value="1">Ex consumidor</option>
                        <option value="2">Activo</option>
                    </select>
                    <input type="text" name="frecuenciaTabaco" value={historia.frecuenciaTabaco} onChange={handleChange} placeholder="Frecuencia..." disabled={historia.estadoTabaco === "0"} className="w-full bg-white border border-slate-300 text-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none disabled:opacity-50 disabled:bg-slate-100" />
                </div>
            </div>

            {/* SECCIÓN DROGAS */}
            <div className="border border-rose-200 rounded-xl overflow-hidden">
                <div className={`p-4 flex items-center justify-between transition-colors ${historia.consumeDrogas ? 'bg-rose-50 border-b border-rose-200' : 'bg-slate-50'}`}>
                    <div>
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <i className="fa-solid fa-pills text-rose-500"></i> Estupefacientes / Drogas Ilegales
                        </h4>
                        {!historia.consumeDrogas && (
                            <p className="text-sm text-slate-500 mt-1 italic">El paciente no consume ni consumía drogas.</p>
                        )}
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="consumeDrogas" checked={historia.consumeDrogas} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                </div>

                {/* Listado de Drogas */}
                {historia.consumeDrogas && (
                    <div className="p-5 bg-white space-y-4">
                        {historia.drogas.map((droga: any) => (
                            <div key={droga.id} className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 border border-slate-200 rounded-lg hover:border-rose-300 hover:shadow-sm transition-all bg-slate-50/50">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="text" 
                                            value={droga.nombreDroga || ''} 
                                            onChange={(e) => handleDrogaChange(droga.id, 'nombreDroga', e.target.value)}
                                            className="font-bold text-slate-800 bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-rose-500 outline-none w-1/3" 
                                            placeholder="Nombre Droga..."
                                        />
                                        <input 
                                            type="text" 
                                            value={droga.frecuencia || ''} 
                                            onChange={(e) => handleDrogaChange(droga.id, 'frecuencia', e.target.value)}
                                            className="text-slate-600 bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-rose-500 outline-none w-2/3" 
                                            placeholder="Frecuencia..."
                                        />
                                    </div>
                                    <textarea 
                                        value={droga.observaciones || ''} 
                                        onChange={(e) => handleDrogaChange(droga.id, 'observaciones', e.target.value)}
                                        placeholder="Observaciones..." 
                                        className="w-full text-sm text-slate-600 bg-white border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-rose-500 outline-none resize-none min-h-[40px]" 
                                    />
                                </div>
                                <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-3">
                                    <button type="button" onClick={() => handleDeleteDroga(droga.id)} className="text-slate-400 hover:text-red-600 bg-white border border-slate-200 p-2 rounded shadow-sm transition-colors" title="Eliminar"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        ))}

                        <button type="button" onClick={handleAddDroga} className="w-full py-3 border-2 border-dashed border-rose-300 text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-plus"></i> Agregar Sustancia
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};