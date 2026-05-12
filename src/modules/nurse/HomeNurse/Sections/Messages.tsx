
// RELLERNO: ESTA SECCION NO TENDRA NINGUNA FUNCIONALIDAD

export const Messages = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full min-h-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
                <h2 className="text-xl font-bold text-cyan-900">Comunicaciones</h2>
                <i className="fa-regular fa-bell text-cyan-600"></i>
            </div>

            {/* Lista de Mensajes */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">

                {/* Mensaje No Leído (Resaltado) */}
                <div className="flex items-start gap-3 p-3 bg-cyan-50/50 rounded-lg border border-cyan-100 cursor-pointer hover:bg-cyan-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-800 font-bold shrink-0 text-sm">
                        DR
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">Dr. Ramírez (Med. G.)</p>
                            <p className="text-xs text-cyan-600 font-medium">10:42 AM</p>
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-2">Por favor, adelantar la toma de presión a Carlos Mendoza.</p>
                    </div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 shrink-0"></div>
                </div>

                {/* Mensaje Leído */}
                <div className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-sm">
                        FA
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="text-sm font-semibold text-gray-700 truncate">Farmacia</p>
                            <p className="text-xs text-gray-400">09:15 AM</p>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">Ya están listos los analgésicos para el piso 2.</p>
                    </div>
                </div>

                {/* Mensaje Leído */}
                <div className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0 text-sm">
                        LB
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="text-sm font-semibold text-gray-700 truncate">Laboratorio</p>
                            <p className="text-xs text-gray-400">Ayer</p>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">Resultados de hemograma subidos al sistema.</p>
                    </div>
                </div>

            </div>

            {/* Input para respuesta rápida */}
            <div className="p-4 border-t border-gray-100">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Escribir mensaje..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-800 p-2 rounded-full hover:bg-cyan-50 transition-colors">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

        </div>
    );
};