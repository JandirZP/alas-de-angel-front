import { useLocation } from "react-router-dom";
import type { Cita } from "../../../../types/models";
import { useState, useEffect } from "react";

export const ViewUnattendedPatients = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const citaParaAtender = location.state?.citaAlerta || [];

    useEffect(() => {
        // Simulamos un tiempo de carga (ej. llamada a una API real) para mostrar el esqueleto/spinner
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <header className="p-4 md:p-6 w-full">
                {/* Cambiamos justify-between por gap-4 y quitamos max-w-sm */}
                <div className="flex items-center gap-4">
                    <img
                        className="w-20 h-20 drop-shadow-lg"
                        src="/icono-hospital.svg"
                        alt="Logo Hospital"
                    />
                    <div className="font-bold text-4xl font-sans italic text-emerald-600 [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">
                        Alas de Angel
                    </div>
                </div>
            </header>

            {/* MODIFICACIÓN 1: Cambiamos 'w-fit' por 'w-full max-w-7xl' para que ocupe todo el ancho disponible.
                Añadimos 'overflow-x-auto' para que si la pantalla es muy pequeña (como en un móvil), 
                aparezca un scroll horizontal solo en la tabla y no rompa todo el diseño general de la página. */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 flex flex-col w-full max-w-7xl mx-auto overflow-x-auto">

                {/* MODIFICACIÓN 2: Agregamos 'table-auto' y un 'min-w-[800px]' para garantizar que la tabla 
                    tenga un ancho mínimo decente y no se aplaste demasiado antes de activar el scroll en pantallas chicas. */}
                <table className="w-full text-sm text-left text-gray-500 table-auto min-w-[800px]">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3">Paciente</th>
                            <th className="px-6 py-3">Medico</th>
                            <th className="px-6 py-3">Fecha y Hora</th>
                            <th className="px-6 py-3">Motivo</th>
                            <th className="px-6 py-3 text-center">Atendido en Triaje</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {loading && (
                            <tr>
                                <td colSpan={5} className="text-center py-10">
                                    <div className="flex flex-col items-center justify-center text-slate-400 gap-4 animate-pulse">
                                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <span className="font-medium text-slate-500">Sincronizando agenda...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && citaParaAtender.map((cita: Cita) => (
                            <tr key={cita.idCita} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">

                                {/* MODIFICACIÓN 3: Quitamos 'whitespace-nowrap' y agregamos 'break-words'. 
                                    Esto permite que, si el nombre del paciente es muy largo, el texto salte 
                                    a la siguiente línea de forma natural. */}
                                <td className="px-6 py-4 font-medium text-gray-900 wrap-break-word">
                                    {cita.nombrePaciente}
                                </td>

                                <td className="px-6 py-4 wrap-break-word">
                                    {cita.nombreMedico}
                                </td>

                                {/* MODIFICACIÓN 4: Aquí SÍ añadimos 'whitespace-nowrap' porque queremos que la 
                                    fecha y la hora se mantengan juntas. Se ve mucho más ordenado visualmente. */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(cita.fechaHora).toLocaleString('es-PE')}
                                </td>

                                {/* MODIFICACIÓN 5: Añadimos 'min-w-[250px]' y 'break-words'. El motivo suele tener
                                    mucho texto. Con esto le damos un ancho inicial respetable y obligamos a que el 
                                    texto crezca hacia abajo (saltos de línea) en lugar de empujar y aplastar las otras celdas. */}
                                <td className="px-6 py-4 min-w-[250px] wrap-break-word">
                                    {cita.motivo}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                                        {cita.atendidoEnTriaje ? "Sí" : "No"}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {!loading && citaParaAtender.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10">
                                    <div className="flex flex-col items-center justify-center text-slate-400 gap-4">
                                        <i className="fa-regular fa-calendar-check text-6xl"></i>
                                        <span className="font-medium text-slate-500">No hay citas pendientes.</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};