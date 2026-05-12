interface HereditaryBackgroundDoctorProps {
    mockHereditaryBackground: any
}

export const HereditaryBackgroundDoctor = ({ mockHereditaryBackground }: HereditaryBackgroundDoctorProps) => {
    return (
        <section className="bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-200 h-fit">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2 border-b border-blue-200 pb-2 text-sm uppercase">
                <i className="fa-solid fa-dna"></i> Antecedentes Familiares
            </h3>
            <p className="text-sm text-blue-900 leading-relaxed bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                {mockHereditaryBackground.hereditarios.tiene ? mockHereditaryBackground.hereditarios.detalle : "Sin antecedentes familiares de importancia."}
            </p>
        </section>
    );
};