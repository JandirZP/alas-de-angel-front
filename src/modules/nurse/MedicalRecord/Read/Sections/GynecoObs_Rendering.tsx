interface GynecoObs_RenderingProps {
    historia: any
}

export const GynecoObs_Rendering = ({ historia }: GynecoObs_RenderingProps) => {
    return (
        <>

            {historia.paciente.sexo === 'Femenino' && (
                <section className="bg-pink-50 p-6 rounded-2xl shadow-sm border border-pink-100 h-fit">
                    <h3 className="font-bold text-pink-800 mb-4 flex items-center gap-2 border-b border-pink-200 pb-3">
                        <i className="fa-solid fa-baby text-pink-500"></i> Gineco-Obstétrico
                    </h3>

                    {historia.gineco.embarazos ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2 text-center bg-white p-3 rounded-xl border border-pink-100 shadow-sm">
                                <div>
                                    <span className="block text-[10px] font-bold text-pink-500 uppercase tracking-wide">Gestaciones</span>
                                    <span className="block text-xl font-black text-pink-700">{historia.gineco.gestaciones}</span>
                                </div>
                                <div className="border-x border-pink-50">
                                    <span className="block text-[10px] font-bold text-pink-500 uppercase tracking-wide">Partos</span>
                                    <span className="block text-xl font-black text-pink-700">{historia.gineco.partos}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-pink-500 uppercase tracking-wide">Abortos</span>
                                    <span className="block text-xl font-black text-pink-700">{historia.gineco.abortos}</span>
                                </div>
                            </div>

                            {historia.gineco.huboComplicaciones && (
                                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                    <span className="block text-xs font-bold text-red-700 mb-1 items-center gap-1">
                                        <i className="fa-solid fa-triangle-exclamation"></i> Complicaciones Previas
                                    </span>
                                    <p className="text-sm text-red-800 leading-snug">
                                        {historia.gineco.complicaciones}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-pink-600/70 text-sm italic text-center py-2">Sin antecedentes de embarazos.</p>
                    )}
                </section>
            )}

        </>
    );
};