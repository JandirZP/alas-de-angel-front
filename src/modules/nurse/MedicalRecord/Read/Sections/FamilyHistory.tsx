
interface FamilyHistoryProps {
    historia: any
}

export const FamilyHistory = ({ historia }: FamilyHistoryProps) => {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <i className="fa-solid fa-dna text-blue-500"></i> Antecedentes Hereditarios
            </h3>
            {historia.hereditarios.tiene ? (
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-700 leading-relaxed">
                    {historia.hereditarios.detalle}
                </div>
            ) : (
                <p className="text-slate-400 text-sm italic text-center py-2">Sin antecedentes familiares de importancia.</p>
            )}
        </section>
    );
};