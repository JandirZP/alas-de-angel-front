

interface Props {
    mensajesSection: {
        id: number;
        remitente: string;
        tiempo: string;
        asunto: string;
        leido: boolean;
    }[];
}

export const ReceivedMessages = ({ mensajesSection }: Props) => {
    return (
        <>

            {/* MENSAJES RECIBIDOS */}
            <section className="bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col h-full">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center"><i className="fa-solid fa-envelope"></i></div>
                        Bandeja de Entrada
                    </h2>
                    <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">2 Nuevos</span>
                </div>
                <div className="p-0 flex-1">
                    <ul className="divide-y divide-slate-100">
                        {mensajesSection.map(msg => (
                            <li key={msg.id} className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!msg.leido ? 'bg-indigo-50/30' : ''}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm ${!msg.leido ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{msg.remitente}</span>
                                    <span className="text-xs text-slate-400">{msg.tiempo}</span>
                                </div>
                                <p className={`text-sm ${!msg.leido ? 'font-semibold text-indigo-900' : 'text-slate-500'}`}>{msg.asunto}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3 border-t border-slate-100 text-center">
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Ir al sistema de mensajería</button>
                </div>
            </section>

        </>
    );
};