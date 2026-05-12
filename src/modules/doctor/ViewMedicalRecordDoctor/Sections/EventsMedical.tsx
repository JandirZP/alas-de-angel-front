interface EventsMedicalProps {
    mockEventsMedical: any
}

export const EventsMedical = ({ mockEventsMedical }: EventsMedicalProps) => {

    const fechaYHora = (fecha: string) => {
        const fechaObj = new Date(fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const horaFormateada = fechaObj.toLocaleTimeString('es-PE', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${fechaFormateada} a las ${horaFormateada}`;
    }
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 shrink-0">
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <i className="fa-solid fa-folder-open text-emerald-500"></i> Historial de Atenciones Clínicas
                </h3>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                    {mockEventsMedical.eventosMedicos.length} Eventos
                </span>
            </div>

            {/* Contenedor con Scroll para el historial */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">

                {mockEventsMedical.eventosMedicos.length > 0 ? (
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 before:to-transparent">

                        {mockEventsMedical.eventosMedicos.map((evento: any) => (
                            <div key={evento.idEvento} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                {/* Icono del Timeline */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <i className={`fa-solid ${evento.tipoEvento === 'Emergencia' ? 'fa-truck-medical text-rose-500' : 'fa-user-doctor'}`}></i>
                                </div>

                                {/* Tarjeta del Evento */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group-hover:border-emerald-200">

                                    {/* Header de la Tarjeta */}
                                    <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2">
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${evento.tipoEvento === 'Emergencia' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {evento.tipoEvento}
                                            </span>
                                            <span className="block text-xs text-slate-500 mt-1"><i className="fa-regular fa-calendar-check mr-1"></i>{fechaYHora(evento.fechaHora)}</span>
                                        </div>
                                        <span className="text-slate-300 text-xs">#{evento.idEvento}</span>
                                    </div>

                                    {/* Triaje Resumen */}
                                    <div className="bg-slate-50 p-2 rounded border border-slate-100 mb-3 text-[11px] text-slate-600 font-mono tracking-tight leading-relaxed">
                                        <strong className="text-slate-500 font-sans uppercase tracking-wider text-[9px] block mb-1">Triaje</strong>
                                        {evento.peso} kg | {evento.altura} cm | {evento.presionArterial} mmHg | {evento.temperatura} °C | {evento.tieneFiebre ? 'Fiebre' : 'Sin Fiebre'}
                                        {/* Si el paciente fuera mujer */}
                                        {evento.sexoPaciente === 'Femenino' && (
                                            <>
                                                | Ultima regla: {fechaYHora(evento.fechaUltimaRegla)} | {evento.estaEmbarazada ? 'Embarazada' : 'No Embarazada'} | {evento.semanasGestacion} semanas
                                            </>
                                        )}
                                    </div>

                                    {/* Cuerpos Clínico */}
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <strong className="block text-xs text-slate-500 mb-0.5"><i className="fa-solid fa-comment-medical text-slate-400"></i> Motivo / Descripción</strong>
                                            <p className="text-slate-700 leading-snug">{evento.descripcion}</p>
                                        </div>
                                        <div>
                                            <strong className="block text-xs text-slate-500 mb-0.5"><i className="fa-solid fa-file-waveform text-emerald-500"></i> Diagnóstico Médico</strong>
                                            <p className="font-bold text-slate-800 leading-snug">{evento.diagnostico}</p>
                                        </div>

                                        {evento.medicamentos && (
                                            <div className="bg-blue-50/50 p-2 rounded border-l-2 border-blue-300">
                                                <strong className="block text-xs text-blue-800 mb-0.5"><i className="fa-solid fa-pills"></i> Tratamiento / Receta</strong>
                                                <p className="text-blue-900 text-xs leading-snug">{evento.medicamentos}</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                                            {evento.dieta && (
                                                <div>
                                                    <strong className="block text-[10px] uppercase text-slate-400 mb-0.5"><i className="fa-solid fa-apple-whole"></i> Dieta</strong>
                                                    <p className="text-xs text-slate-600 leading-snug">{evento.dieta}</p>
                                                </div>
                                            )}
                                            {evento.recomendaciones && (
                                                <div>
                                                    <strong className="block text-[10px] uppercase text-slate-400 mb-0.5"><i className="fa-solid fa-clipboard-list"></i> Recomendaciones</strong>
                                                    <p className="text-xs text-slate-600 leading-snug">{evento.recomendaciones}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    /* ESTADO VACÍO */
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fa-regular fa-folder-open text-4xl text-slate-300"></i>
                        </div>
                        <h4 className="text-lg font-bold text-slate-700 mb-2">Historial en Blanco</h4>
                        <p className="text-slate-500 max-w-sm">
                            Este paciente no tiene ningún diagnóstico ni tratamiento previo en esta clínica.
                        </p>
                        <button className="mt-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-lg font-semibold text-sm transition-colors border border-emerald-200">
                            Crear Primera Atención
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};