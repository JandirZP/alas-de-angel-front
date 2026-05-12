import { useEffect, useState } from "react";
import type { HistoriaClinica } from "../../../types/models";
import { hcEventosService } from "../../../services/hcEventos.service";
import { useNavigate } from "react-router-dom";
import { encodeId } from "../../../utils/hashids";

export const MedicalRecord = () => {

    // Estado para DIBUJAR la tabla actual (Cambia constantemente con búsquedas o filtros)
    const [historias, setHistorias] = useState<HistoriaClinica[]>([]);

    // Estado CAJA FUERTE: Guarda la lista completa original de la BD cuando entramos a la pantalla.
    // Sirve para restaurar la vista instantáneamente cuando borran el buscador, evitando llamar al Backend de nuevo.
    const [historiasRespaldo, setHistoriasRespaldo] = useState<HistoriaClinica[]>([]);

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    //Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    const fetchHistorias = async () => {
        try {
            const response = await hcEventosService.getHistoriasActivas();
            // Llenamos la tabla visible
            setHistorias(response);
            // Llenamos la caja fuerte de memoria para evitar llamadas futuras a la API
            setHistoriasRespaldo(response);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar historias activas:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorias();
    }, []);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // Si el usuario presiona "Enter" pero la caja estaba vacía, devolvemos la caja fuerte para evitar errores
        if (!searchQuery.trim()) {
            setHistorias(historiasRespaldo);
            return;
        }

        setIsSearching(true);
        try {
            // El backend buscará ÚNICAMENTE este documento.
            const historia = await hcEventosService.getHistoriaPorDocumento(searchQuery.trim());
            if (historia) {
                // Aquí usamos corchetes [] porque "historias" espera un ARRAY, y la API devolvió UN objeto.
                setHistorias([historia]);
            } else {
                setHistorias([]); // Mostrar tabla vacía si no existe
            }
        } catch (error) {
            console.error("Error buscando historia por documento:", error);
        } finally {
            setIsSearching(false);
            setCurrentPage(1);
        }
    };

    // Reaccionar si el usuario borra todo el input tecla a tecla
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        // Cuando terminan de borrar todo el documento de la caja (BackSpace)...
        if (val === '') {
            // ...!MAGIA! Sacamos las 10 historias originales de la caja fuerte 
            // y se las devolvemos a la tabla en 0.001 segundos sin preguntar al Backend
            setHistorias(historiasRespaldo);
            setCurrentPage(1);
        }
    };

    //Logica de la paginacion
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //Extraemos solo los 10 registros de la pagina actual
    const currentHistorias = historias.slice(indexOfFirstItem, indexOfLastItem);

    //Total de paginas
    const totalPages = Math.ceil(historias.length / itemsPerPage);



    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto mt-2 space-y-6">

            {/* Encabezado Principal */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <i className="fa-solid fa-folder-medical text-emerald-600"></i>
                        Historia Clínica
                    </h1>
                    <p className="text-slate-500 mt-1">Gestión y listado de pacientes con registros clínicos.</p>
                </div>
                <button 
                    onClick={() => navigate('/DashboardNurse', { state: { view: 'home' } })} 
                    className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 font-semibold transition-colors flex items-center gap-2"
                >
                    <i className="fa-solid fa-arrow-left"></i> Cancelar
                </button>
            </div>

            {/* Contenedor Principal (Barra de herramientas + Tabla) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Barra de Herramientas (Buscador y Botón Agregar) */}
                {/* MODIFICACIÓN: Uso de flexbox para alinear el buscador y el botón en la misma fila en PC, y en columnas en móviles */}
                <div className="p-4 md:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    {/* Buscador Integrado */}
                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="fa-solid fa-search text-slate-400"></i>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Buscar por número de documento..."
                            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5 shadow-sm transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-white bg-emerald-600 rounded-r-lg hover:bg-emerald-700 focus:ring-2 focus:outline-none focus:ring-emerald-300 transition-colors disabled:opacity-50"
                        >
                            {isSearching ? <i className="fa-solid fa-spinner fa-spin"></i> : "Buscar"}
                        </button>
                    </form>

                    {/* Botón de Acción Principal */}
                    <button onClick={() => navigate("/medical-record/new")} className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-700 hover:shadow-md transition-all whitespace-nowrap">
                        <i className="fa-solid fa-plus"></i>
                        Agregar Historia Clínica
                    </button>
                </div>

                {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
                <div className="overflow-x-auto w-full">
                    {/* MODIFICACIÓN: Cambiado table-fixed a w-full text-left para mejor distribución. Añadido min-w para evitar colapso */}
                    <table className="w-full text-sm text-left text-slate-600 min-w-[900px]">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
                            <tr>
                                {/* MODIFICACIÓN: Añadido padding (px-6 py-4) a las celdas para que respiren */}
                                <th scope="col" className="px-6 py-4 font-bold">Código de Historia Clínica</th>
                                <th scope="col" className="px-6 py-4 font-bold">Paciente</th>
                                <th scope="col" className="px-6 py-4 font-bold">Tipo Doc.</th>
                                <th scope="col" className="px-6 py-4 font-bold">N° Documento</th>
                                <th scope="col" className="px-6 py-4 font-bold text-center">Estado de la Historia Clínica</th>
                                <th scope="col" className="px-6 py-4 font-bold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">

                            {loading && (
                                <tr>
                                    <td colSpan={6} className="p-4">
                                        <div className="flex items-center justify-center">
                                            <i className="fa-solid fa-circle-notch fa-spin text-2xl text-slate-400"></i>
                                            <span className="ml-2 text-slate-500">Cargando historias...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}




                            {/* Fila 1 */}

                            {!loading && currentHistorias.map((historia) => {

                                return (
                                    <tr key={historia.idHC} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{historia.idHC}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-800 block">{historia.nombresPaciente}</span>
                                            <span className="text-xs text-slate-500">{historia.apellidoPaternoPaciente} {historia.apellidoMaternoPaciente}</span>
                                        </td>
                                        <td className="px-6 py-4">{historia.tipoDocumento}</td>
                                        <td className="px-6 py-4 font-mono text-slate-700">{historia.numeroDocumento}</td>

                                        <td className="px-6 py-4 text-center">
                                            {/* MODIFICACIÓN: Uso de un "Badge" (píldora) para el estado, es mucho más visual */}
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${historia.estadoHC ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                                {historia.estadoHC ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {/* Navegamos al ID cifrado */}
                                            <button
                                                onClick={() => navigate(`/medical-record/view/${encodeId(historia.idHC)}`)}
                                                className="text-slate-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-colors tooltip-trigger"
                                                title="Ver Historia Clínica"
                                            >
                                                <i className="fa-solid fa-eye text-lg"></i>
                                            </button>
                                        </td>
                                    </tr>

                                )

                            })}

                            {!loading && historias.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <i className="fa-regular fa-file-lines text-6xl text-gray-300"></i>
                                            <span className="text-slate-500">No hay historias activas.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}






                        </tbody>
                    </table>
                </div>

                {/* Footer de la tabla (Paginación dinámica) */}
                <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
                    <span>
                        {historias.length === 0
                            ? "No hay registros"
                            : historias.length <= itemsPerPage
                                ? `Mostrando ${historias.length} registro${historias.length === 1 ? '' : 's'}`
                                : `Mostrando de ${indexOfFirstItem + 1} a ${Math.min(indexOfLastItem, historias.length)} de ${historias.length} registros`
                        }
                    </span>


                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 font-medium text-slate-700">
                            Página {currentPage} de {totalPages || 1}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};