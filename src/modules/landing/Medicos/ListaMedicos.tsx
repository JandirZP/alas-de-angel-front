// import { useEffect, useState } from "react"
// import type { Usuario } from "../../../types/models"
// import { usuarioService } from "../../../services/usuario.service"


// export const ListaMedicos = () => {


//     return (
//         <div>
//             <div>Nuestros Médicos</div>
//             <div>
//                 {medicos.map((medico) => (
//                     <div key={medico.idUsuario}>
//                         <img src={medico.fotoUrl} alt={medico.nombres} />
//                         <div>{medico.nombres} {medico.apellidoPaterno} {medico.apellidoMaterno}</div>
//                         <div>{medico.especialidades?.map(e => e.nombre).join(", ")}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../../../services/usuario.service";
import type { Usuario, Especialidad } from "../../../types/models";

export const ListaMedicos = () => {
    const navigate = useNavigate();

    const [medicos, setMedicos] = useState<Usuario[]>([]);
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [isLoadingMedicos, setIsLoadingMedicos] = useState(true);
    const [isLoadingEspecialidades, setIsLoadingEspecialidades] = useState(true);

    // 2. Estado para guardar la especialidad seleccionada (ahora por código o "Todas")
    const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | "Todas">("Todas");

    // 3. Estado para un buscador de texto
    const [busqueda, setBusqueda] = useState("");

    // EFECTO 1: Cargar todas las especialidades disponibles apenas inicie el componente
    useEffect(() => {
        setIsLoadingEspecialidades(true);
        usuarioService.getEspecialidades()
            .then(setEspecialidades)
            .catch(err => console.error("Error cargando especialidades:", err))
            .finally(() => setIsLoadingEspecialidades(false));
    }, []);

    // EFECTO 2: Cada vez que cambie el filtro, traemos los médicos del backend
    useEffect(() => {
        setIsLoadingMedicos(true);
        if (filtroEspecialidad === "Todas") {
            usuarioService.getUsuariosActivosPorRol("Médico")
                .then(setMedicos)
                .catch(err => console.error("Error cargando todos los médicos:", err))
                .finally(() => setIsLoadingMedicos(false));
        } else {
            usuarioService.getMedicosPorEspecialidad(filtroEspecialidad)
                .then(setMedicos)
                .catch(err => console.error("Error cargando médicos por especialidad:", err))
                .finally(() => setIsLoadingMedicos(false));
        }
    }, [filtroEspecialidad]);

    // 4. Aplicar solo el filtro de texto localmente (la especialidad ya la filtró el backend)
    const medicosFiltrados = medicos.filter(medico => {
        const coincideTexto = `${medico.nombres} ${medico.apellidoPaterno} ${medico.apellidoMaterno}`.toLowerCase().includes(busqueda.toLowerCase());
        return coincideTexto;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">

            {/* ENCABEZADO */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div>
                            <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                                <i className="fa-solid fa-user-doctor text-emerald-600"></i>
                                Nuestros Médicos
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Conozca a los especialistas que tenemos para usted.
                            </p>
                        </div>
                    </div>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">

                {/* BARRA DE BÚSQUEDA Y FILTROS */}
                <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">

                    {/* Buscador de texto */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <i className="fa-solid fa-search text-slate-400"></i>
                        </div>
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar médico por nombre o apellido..."
                            className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                    </div>

                    {/* Filtros por Especialidad (Píldoras interactivas) */}
                    <div>
                        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filtrar por Especialidad:</span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFiltroEspecialidad("Todas")}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${filtroEspecialidad === "Todas"
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                                    }`}
                            >
                                Todas
                            </button>
                            {isLoadingEspecialidades ? (
                                <div className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-400 border border-slate-200 flex items-center gap-2">
                                    <i className="fa-solid fa-circle-notch fa-spin"></i> Cargando...
                                </div>
                            ) : (
                                especialidades.map((esp) => (
                                    <button
                                        key={esp.codigo}
                                        onClick={() => setFiltroEspecialidad(esp.codigo)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${filtroEspecialidad === esp.codigo
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                                            }`}
                                    >
                                        {esp.nombre}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* RESULTADOS - GRID DE TARJETAS */}
                <div>
                    <h2 className="text-lg font-bold text-slate-700 mb-4">
                        Resultados ({medicosFiltrados.length})
                    </h2>

                    {isLoadingMedicos && (
                        <div className="flex items-center justify-center py-12 text-slate-500">
                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                            Cargando médicos...
                        </div>
                    )}

                    {!isLoadingMedicos && medicosFiltrados.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {medicosFiltrados.map((medico) => (
                                <div key={medico.idUsuario} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">

                                    {/* Cabecera de la tarjeta */}
                                    <div className="p-5 flex gap-4 items-start border-b border-slate-100">
                                        {/* Avatar (Usa un ícono diferente por sexo para la demostración) */}
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${medico.sexo === false ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <i className={`fa-solid ${medico.sexo === false ? 'fa-user-doctor' : 'fa-user-doctor'}`}></i>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                                                {medico.nombres} {medico.apellidoPaterno} {medico.apellidoMaterno}
                                            </h3>

                                        </div>
                                    </div>

                                    {/* Cuerpo de la tarjeta */}
                                    <div className="p-5 flex-1 space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-6 text-center text-emerald-500"><i className="fa-solid fa-stethoscope"></i></div>
                                            <span className="font-semibold text-slate-700">{medico.especialidades?.map((esp) => esp.nombre)?.join(", ") || "Sin especialidad"}</span>
                                        </div>

                                    </div>


                                </div>
                            ))}
                        </div>
                    ) : (
                        /* ESTADO VACÍO (Cuando el filtro no encuentra nada) */
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <i className="fa-solid fa-user-xmark text-4xl text-slate-300"></i>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">No se encontraron médicos</h3>
                            <p className="text-slate-500">
                                No hay doctores que coincidan con la especialidad o nombre buscado.
                            </p>
                            <button
                                onClick={() => { setFiltroEspecialidad("Todas"); setBusqueda(""); }}
                                className="mt-6 text-emerald-600 font-bold hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};