interface Props {
    citasHoySection: {
        id: number;
        hora: string;
        paciente: string;
        motivo: string;
        estado: boolean;
    }[];
    isLoading: boolean;
}

export const TodaysMedicalAppointments = ({ citasHoySection, isLoading }: Props) => {
    // ELIMINADO: useState y useEffect que duplicaban citasHoySection en citasData.
    // Esto es un anti-patrón de React. Si unas Prop no van a cambiar desde
    // adentro de este componente (como en un formulario), 
    // JAMAS debes duplicarlas en un useState. Simplemente úsalas directamente.

    return (
        <>


            {/* CITAS DEL DÍA */}
            <section className="bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col h-full">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center"><i className="fa-solid fa-calendar-check"></i></div>
                        Próximas Citas Hoy
                    </h2>
                    <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Ver agenda completa &rarr;</button>
                </div>



                {isLoading && (
                    <div className="p-5 flex-1 space-y-4 flex items-center justify-center">
                        <div className="text-center">
                            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-emerald-600 mb-2"></i>
                            <p className="text-slate-500">Cargando citas del día...</p>
                        </div>
                    </div>
                )}

                {!isLoading && citasHoySection.length > 0 && (
                    <div className="p-5 flex-1 space-y-4">
                        {citasHoySection.map((cita) => (
                            <div key={cita.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                <div className="bg-slate-100 text-slate-800 font-bold px-3 py-2 rounded-lg text-center min-w-[70px]">
                                    <span className="block text-lg">{cita.hora}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800">{cita.paciente}</h3>
                                    <p className="text-sm text-slate-500">{cita.motivo}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${cita.estado === true ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {cita.estado === true ? "Activo" : "Inactivo"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && citasHoySection.length === 0 && (
                    <div className="p-5 flex-1 space-y-4 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2"><i className="fa-solid fa-calendar-check text-slate-400"></i></div>
                            <p className="text-slate-500">No hay citas hoy</p>
                        </div>
                    </div>
                )}

            </section>

        </>
    );
};