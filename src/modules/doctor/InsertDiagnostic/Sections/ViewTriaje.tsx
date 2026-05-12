interface TriajeProps {

    mockTriaje: any
    cargando: boolean

}

export const ViewTriaje = ({ mockTriaje, cargando }: TriajeProps) => {

    //Formateamos la fecha y la hora
    const fechaHora = new Date(mockTriaje.fechaHora);
    const fechaFormateada = fechaHora.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const horaFormateada = fechaHora.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit'
    });


    // Cálculo automático del IMC para la UI
    const imc = (mockTriaje.peso / Math.pow(mockTriaje.altura, 2)).toFixed(1);
    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            {cargando ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : !mockTriaje?.idTriaje ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-4xl mb-2"></i>
                        <p className="text-slate-500 font-medium">No se encontró información de triaje para esta cita.</p>
                    </div>
                </div>
            ) : (
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <i className="fa-solid fa-clipboard-user text-blue-500"></i> Evaluación de Triaje
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Realizado el {fechaFormateada} a las {horaFormateada} por {mockTriaje.enfermera}
                            </p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                            Codigo de Triaje: {mockTriaje.idTriaje}
                        </span>
                    </div>

                    {/* Signos Vitales Básicos */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Peso</span>
                            <span className="block text-xl font-black text-slate-700">{mockTriaje.peso} <span className="text-sm font-medium text-slate-400">kg</span></span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Estatura</span>
                            <span className="block text-xl font-black text-slate-700">{mockTriaje.altura} <span className="text-sm font-medium text-slate-400">m</span></span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">IMC</span>
                            <span className="block text-xl font-black text-slate-700">{imc}</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">P. Arterial</span>
                            <span className="block text-xl font-black text-blue-600">{mockTriaje.presionArterial}</span>
                        </div>
                        {/* Temperatura con cambio de color si hay fiebre */}
                        <div className={`p-4 rounded-xl border text-center ${mockTriaje.tieneFiebre ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                            <span className={`block text-[10px] uppercase font-bold mb-1 ${mockTriaje.tieneFiebre ? 'text-red-600' : 'text-slate-500'}`}>Temperatura</span>
                            <span className={`block text-xl font-black ${mockTriaje.tieneFiebre ? 'text-red-600' : 'text-slate-700'}`}>
                                {mockTriaje.temperatura}°C
                            </span>
                            {mockTriaje.tieneFiebre && <span className="absolute mt-1 text-[9px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded -ml-6 uppercase tracking-wider">Fiebre</span>}
                        </div>
                    </div>

                    {/* RENDERIZADO CONDICIONAL: Datos Ginecológicos de Triaje (AHORA) */}
                    {mockTriaje.paciente.sexo === "Femenino" && (
                        <div className="mt-6 bg-pink-50 p-4 rounded-xl border border-pink-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-pink-200 text-pink-600 w-8 h-8 rounded-full flex items-center justify-center"><i className="fa-solid fa-person-pregnant"></i></div>
                                <span className="font-bold text-pink-800 text-sm">Estado Ginecológico Actual</span>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div>
                                    <span className="text-pink-600/70 text-xs font-bold uppercase block mb-0.5">FUM (Última Regla)</span>
                                    <span className="font-semibold text-pink-900">{mockTriaje.fechaUltimaRegla || "No reporta"}</span>
                                </div>
                                <div>
                                    <span className="text-pink-600/70 text-xs font-bold uppercase block mb-0.5">Embarazo</span>
                                    {mockTriaje.estaEmbarazada ? (
                                        <span className="font-bold text-rose-600 flex items-center gap-1"><i className="fa-solid fa-check"></i> Gestando ({mockTriaje.semanasGestacion} semanas)</span>
                                    ) : (
                                        <span className="font-semibold text-pink-900">Negativo / No sospecha</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>

    )
}