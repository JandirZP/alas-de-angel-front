interface Props {
    historia: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const GinecoObsEdit = ({ historia, handleChange }: Props) => {
    return (
        <>

            {historia.paciente.sexo === "Femenino" && (
                <section className="bg-pink-50 p-6 sm:p-8 rounded-2xl shadow-sm border border-pink-200">
                    <h3 className="text-lg font-bold text-pink-800 mb-6 border-b border-pink-200 pb-3 flex items-center gap-2">
                        <i className="fa-solid fa-baby text-pink-500"></i> Gineco-Obstétrico
                    </h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-pink-100 shadow-sm">
                            <input type="checkbox" name="tuvoEmbarazos" checked={historia.tuvoEmbarazos} onChange={handleChange} className="w-5 h-5 text-pink-600 rounded border-pink-300 focus:ring-pink-500" />
                            <span className="font-semibold text-pink-900">Tuvo embarazos previos</span>
                        </label>

                        {historia.tuvoEmbarazos && (
                            <div className="space-y-4 p-4 bg-white rounded-xl border border-pink-100">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-pink-500 uppercase text-center mb-1">Gestaciones</label>
                                        <input type="number" name="cantidadGestaciones" value={historia.cantidadGestaciones} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-pink-500/50 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-pink-500 uppercase text-center mb-1">Partos</label>
                                        <input type="number" name="cantidadPartos" value={historia.cantidadPartos} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-pink-500/50 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-pink-500 uppercase text-center mb-1">Abortos</label>
                                        <input type="number" name="cantidadAbortos" value={historia.cantidadAbortos} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-center rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-pink-500/50 outline-none" />
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-pink-50">
                                    <label className="flex items-center gap-2 cursor-pointer mb-2">
                                        <input type="checkbox" name="huboComplicacionesParto" checked={historia.huboComplicacionesParto} onChange={handleChange} className="w-4 h-4 text-red-500 rounded border-red-300 focus:ring-red-500" />
                                        <span className="text-sm font-bold text-red-700">Hubo complicaciones</span>
                                    </label>
                                    {historia.huboComplicacionesParto && (
                                        <textarea name="especifiqueComplicaciones" value={historia.especifiqueComplicaciones} onChange={handleChange} className="w-full text-sm bg-red-50 border border-red-200 text-red-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500/50 outline-none min-h-[60px]" placeholder="Detalle las complicaciones..." />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

        </>
    );
};