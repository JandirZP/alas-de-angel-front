interface SexualityProps {
    historia: any
}

export const Sexuality = ({ historia }: SexualityProps) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <i className="fa-solid fa-venus-mars text-purple-500"></i> Sexualidad
            </h3>
            {historia.sexualidad.activo ? (
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-500">Inicio Sexual</span>
                        <span className="font-bold text-slate-700">{historia.sexualidad.edadInicio} años</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Anticoncepción</span>
                        <span className="font-bold text-slate-700 text-right">{historia.sexualidad.metodo}</span>
                    </div>
                </div>
            ) : (
                <p className="text-slate-400 text-sm italic text-center py-2">No activo sexualmente.</p>
            )}
        </section>
    );
};