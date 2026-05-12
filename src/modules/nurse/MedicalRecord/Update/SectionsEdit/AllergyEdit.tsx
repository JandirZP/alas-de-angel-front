interface Props {
    historia: any;
    handleDeleteAlergia: (idAlergia: number) => void;
    handleAlergiaChange: (idAlergia: number, field: string, value: string) => void;
    handleAddAlergia: (e: React.MouseEvent) => void;
}

export const AllergyEdit = ({ historia, handleDeleteAlergia, handleAlergiaChange, handleAddAlergia }: Props) => {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col h-full">
            <h4 className="font-bold text-sm text-rose-600 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <i className="fa-solid fa-triangle-exclamation"></i> Alergias
            </h4>
            <div className="flex-1 space-y-3 mb-4">
                {historia.alergias.length > 0 ? historia.alergias.map((item: any) => (
                    <div key={item.id} className="bg-white border border-rose-200 rounded-lg p-3 shadow-sm relative">
                        <button type="button" onClick={() => handleDeleteAlergia(item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
                        <input 
                            type="text" 
                            value={item.alergeno || ''} 
                            onChange={(e) => handleAlergiaChange(item.id, 'alergeno', e.target.value)}
                            className="font-bold text-rose-800 text-sm border-b border-dashed border-rose-300 w-[85%] focus:outline-none focus:border-rose-500 mb-1" 
                            placeholder="Alérgeno..."
                        />
                        <input 
                            type="text" 
                            value={item.reaccion || ''} 
                            onChange={(e) => handleAlergiaChange(item.id, 'reaccion', e.target.value)}
                            className="text-xs text-rose-600 border-b border-dashed border-rose-200 w-full focus:outline-none focus:border-rose-500 mb-2" 
                            placeholder="Reacción..."
                        />
                        <textarea 
                            value={item.observaciones || ''} 
                            onChange={(e) => handleAlergiaChange(item.id, 'observaciones', e.target.value)}
                            className="w-full text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-rose-400" 
                            placeholder="Observaciones..." 
                        />
                    </div>
                )) : (
                    <div className="text-center py-6 text-sm italic text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-white">El paciente no tiene alergias registradas.</div>
                )}
            </div>
            <button type="button" onClick={handleAddAlergia} className="w-full py-2 bg-white border border-rose-300 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 shadow-sm transition-colors cursor-pointer">
                + Agregar Alergia
            </button>
        </div>
    );
};