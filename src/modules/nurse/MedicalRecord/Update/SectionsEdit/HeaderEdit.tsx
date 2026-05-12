import { useNavigate } from "react-router-dom";

interface HeaderProps {
    historia: any
}

export const HeaderEdit = ({ historia }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>
                    <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                        <i className="fa-solid fa-pen-to-square text-emerald-600"></i>
                        Editando Historia Clínica
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Paciente: <span className="text-emerald-700 font-bold">{historia.paciente.apellidos}, {historia.paciente.nombres}</span>
                    </p>
                </div>
            </div>
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-amber-200">
                <i className="fa-solid fa-triangle-exclamation"></i> Modo Edición
            </div>
        </div>
    );
};