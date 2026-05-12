import type { Usuario } from "../../../../types/models";

interface Props {
    doctorSection: Usuario | null;
    fechaActualSection: string;
}

export const HeaderDoctor = ({ doctorSection, fechaActualSection }: Props) => {
    return (

        <>

            {/* ENCABEZADO DE BIENVENIDA */}
            <header className="bg-emerald-700 text-white pb-24 pt-8 px-4 sm:px-6 lg:px-8 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl border-2 border-emerald-400">
                            <i className="fa-solid fa-user-doctor text-white"></i>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Bienvenido, Dr. {doctorSection?.nombres} {doctorSection?.apellidoPaterno}</h1>
                            <p className="text-emerald-100 mt-1"><i className="fa-regular fa-calendar-days mr-2"></i>{fechaActualSection}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
                            <i className="fa-solid fa-bed-pulse"></i> Pacientes Internados
                        </button>
                    </div>
                </div>
            </header>

        </>

    );
};