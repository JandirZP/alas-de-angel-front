import { useNavigate } from "react-router-dom";
import { encodeId } from "../../../../../utils/hashids";

interface HeaderProps {
    historia: any
}



export const HeaderMR = ({ historia }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    title="Volver al listado"
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>
                    <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                        <i className="fa-solid fa-file-medical text-emerald-600"></i>
                        Historia Clínica <span className="text-emerald-600 font-mono text-xl ml-1">#{historia.codigo}</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold border ${historia.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {historia.estado}
                        </span>
                    </h1>


                    <p className="text-sm text-slate-500 font-medium">
                        Creada el {historia.fechaCreacion}
                    </p>

                </div>
            </div>

            <div className="flex items-center gap-3">

                <button
                    onClick={() => navigate(`/medical-record/edit/${encodeId(historia.idHC)}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-edit mr-2"></i>
                    Editar Historia
                </button>

            </div>

        </div>
    );
};