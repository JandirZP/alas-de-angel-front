import { useEffect, useState } from "react";
import type { Cita, Usuario } from "../../../types/models";
import { citaService } from "../../../services/cita.service";
import { toast } from "sonner";



interface Props {
    paciente: Usuario | null;
}

export const HistorialCitas = ({ paciente }: Props) => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (paciente && paciente.idUsuario) {
            setLoading(true);
            citaService.getAllByPaciente(paciente.idUsuario)
                .then((data) => {
                    setCitas(data);
                })
                .catch((error) => {
                    console.error("Error cargando citas:", error);
                    toast.error("No se pudieron cargar las citas");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [paciente]);

    // Función para formatear fecha y hora
    const formatearFecha = (fechaString: string) => {
        const fecha = new Date(fechaString);
        return {
            dia: fecha.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" }),
            hora: fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
        };
    };




    return (
        <div className="p-6 md:p-8 w-full max-w-7xl mx-auto animate-fade-in">

            {/* Cabecera de la vista */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-cyan-900">Historial de Citas</h2>
                <p className="text-gray-500 mt-1 text-sm">
                    Revisa el registro de tus consultas médicas pasadas y programadas.
                </p>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="flex h-full items-center justify-center text-gray-400 gap-2">
                    <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>
                    <span className="italic">Buscando citas...</span>
                </div>
            )}

            {/* EMPTY STATE (Sin citas) */}
            {!loading && citas.length === 0 && (
                <div className="flex flex-col h-full items-center justify-center text-gray-400 gap-3 opacity-70">
                    <i className="fa-regular fa-calendar-xmark text-6xl text-gray-300"></i>
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-500">Sin citas pendientes</p>
                        <p className="text-sm">Todo está tranquilo por aquí.</p>
                    </div>
                </div>
            )}


            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        {/* Encabezados */}
                        <thead className="bg-cyan-50/50 text-cyan-800 uppercase text-lg font-bold tracking-wide border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4">Día</th>
                                <th scope="col" className="px-6 py-4">Hora</th>
                                <th scope="col" className="px-6 py-4">Especialidad</th>
                                <th scope="col" className="px-6 py-4">Médico</th>
                                <th scope="col" className="px-6 py-4">Motivo</th>
                                <th scope="col" className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {!loading && citas.map((cita) => {
                                const { dia, hora } = formatearFecha(cita.fechaHora);

                                const inicialMedico = cita.nombreMedico ? cita.nombreMedico.charAt(0).toUpperCase() : "";
                                const prefijoMedico = cita.sexoMedico === true ? "Dr." : "Dra.";

                                return (

                                    < tr className="hover:bg-cyan-50/30 transition-colors duration-150 text-lg align-top" >
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                                            {dia}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {hora}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-100">
                                                {cita.especialidadMedico}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
                                                    {inicialMedico}
                                                </div>
                                                <span className="font-medium text-gray-700">{prefijoMedico} {cita.nombreMedico} {cita.apellidoMedico}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 min-w-[250px] whitespace-normal text-pretty" title="Chequeo anual de presión arterial y evaluación general">
                                            {cita.motivo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${cita.estado === true ? 'bg-green-50 text-green-700 border-green-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                                {cita.estado === true ? "Habilitado" : "Cancelado"}
                                            </span>
                                        </td>
                                    </tr>


                                )
                            })}





                        </tbody>
                    </table>

                </div>

            </div>







        </div >
    );
};