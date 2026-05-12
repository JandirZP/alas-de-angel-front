// Eliminamos React imports no usados, ya no necesitamos useState ni useEffect aquí
import { useNavigate } from "react-router-dom";
import type { Cita } from "../../../types/models";
import { encodeId } from "../../../utils/hashids";

// Aquí recibimos isLoading desde el componente padre (DashboardDoctor)
interface Props {
    citasParaFiltrarHoy: Cita[];
    isLoading: boolean;
}

export const TodaysAppointments = ({ citasParaFiltrarHoy, isLoading }: Props) => {
    // ELIMINADO: const [isLoading, setIsLoading] = useState(true);
    // Ahora React usa el isLoading que le manda DashboardDoctor (a través de los Props). 
    // Por lo tanto, tu mensaje "Cargando..." en la tabla de abajo durará
    // exactamente lo mismo que tome la petición a la base de datos!

    //Formateamos a la fecha de hoy
    const fechaHoy = new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    //Filtramos las citas de hoy
    const citasDeHoy = citasParaFiltrarHoy.filter((cita) => {
        const fechaCita = new Date(cita.fechaHora);
        return fechaCita.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }) === fechaHoy;
    });

    //Ordenamos las citas por hora
    citasDeHoy.sort((a, b) => {
        const fechaA = new Date(a.fechaHora);
        const fechaB = new Date(b.fechaHora);
        return fechaA.getTime() - fechaB.getTime();
    });
    //formateamos la hora
    const horaFormateada = (fechaHora: string) => {
        const fecha = new Date(fechaHora);
        return fecha.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="w-fit mx-auto mt-8 rounded-2xl shadow-lg bg-emerald-100">
                <div className="w-full text-center p-4 text-3xl font-bold text-orange-600 mb-4">Citas de hoy</div>
                <div className="p-4 text-lg">
                    <div className="overflow-hidden rounded-2xl border border-blue-950">
                        <table className="table-fixed border-collapse w-300">
                            <thead>
                                <tr className="bg-blue-200">
                                    <th className="px-4 py-2">Hora</th>
                                    <th className="px-4 py-2">Paciente</th>
                                    <th className="px-4 py-2">Motivo</th>
                                    <th className="px-4 py-2">Estado</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {isLoading ? (
                                    <tr>
                                        <td className="px-4 py-2 text-center" colSpan={5}>Cargando...</td>
                                    </tr>
                                ) : (
                                    citasDeHoy.length === 0 ? (
                                        <tr>
                                            <td className="px-4 py-2 text-center" colSpan={5}>No hay citas hoy</td>
                                        </tr>
                                    ) : (
                                        citasDeHoy.map((cita) => (
                                            <tr key={cita.idCita}>
                                                <td className="px-4 py-2 text-center">{horaFormateada(cita.fechaHora)}</td>
                                                <td className="px-4 py-2 text-center">{cita.nombrePaciente} {cita.apellidoPatPaciente} {cita.apellidoMatPaciente}</td>
                                                <td className="px-4 py-2 text-center whitespace-normal wrap-break-word">{cita.motivo}</td>
                                                <td className="px-4 py-2 text-center">{cita.estado ? "Activo" : "Inactivo"}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <button onClick={() => navigate(`/doctor/insert-diagnostic/${encodeId(cita.idCita)}`)} className="px-4 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600" title="Atender cita"><i className="fa-solid fa-stethoscope"></i></button>
                                                    <button onClick={() => navigate(`/doctor/view-medical-record/${encodeId(cita.idPaciente)}`)} className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600" title="Ver historial médico"><i className="fa-solid fa-file-medical"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
};