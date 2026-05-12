
interface ProfilePatientProps {
    historia: any
}
export const ProfilePatient = ({ historia }: ProfilePatientProps) => {


    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

            <div className="flex items-center gap-6 z-10">
                {/* Cambio dinámico de icono/color según el sexo */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-inner border-2 border-white outline ${historia.paciente.sexo === 'Femenino' ? 'bg-pink-100 text-pink-600 outline-pink-200' : 'bg-blue-100 text-blue-600 outline-blue-200'}`}>
                    <i className={`fa-solid ${historia.paciente.sexo === 'Femenino' ? 'fa-person-dress' : 'fa-person'}`}></i>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{historia.paciente.apellidos}, {historia.paciente.nombres}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-600">
                        <span className="flex items-center gap-1"><i className="fa-regular fa-id-card text-slate-400"></i> {historia.paciente.tipoDoc}: {historia.paciente.numDoc}</span>
                        <span className="flex items-center gap-1"><i className="fa-solid fa-cake-candles text-slate-400"></i> {historia.paciente.edad} años</span>
                        <span className="flex items-center gap-1"><i className="fa-solid fa-venus-mars text-slate-400"></i> {historia.paciente.sexo}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 z-10 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-center">
                    <span className="block text-xs font-bold text-slate-500 uppercase">Sangre</span>
                    <span className="block text-2xl font-black text-rose-600">{historia.biologicos.grupoSanguineo}<sup className="text-xl">{historia.biologicos.factorRH}</sup></span>
                </div>
            </div>
        </section>
    );
};