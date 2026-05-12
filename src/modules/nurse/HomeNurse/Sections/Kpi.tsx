
import { useEffect, useState } from "react";
import type { Cita } from "../../../../types/models";
import { useNavigate } from "react-router-dom";

interface Props {
    citas: Cita[];
}

export const Kpi = ({ citas }: Props) => {


    const navigate = useNavigate();


    const [fechaActual, setFechaActual] = useState(new Date());

    useEffect(() => {
        // setInterval ejecuta una función cada cierto tiempo (en milisegundos)
        const temporizador = setInterval(() => {
            // Cada 1 segundo, actualizamos el estado con una nueva fecha
            setFechaActual(new Date());

        }, 1000);
        // MUY IMPORTANTE: Función de limpieza. 
        // Si la enfermera cambia de página, queremos destruir el reloj 
        // para que no se quede consumiendo memoria en el fondo.
        return () => clearInterval(temporizador);
    }, []);// Los corchetes vacíos [] indican que el reloj se crea una sola vez al cargar la página



    const fechaActualFormateada = fechaActual.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const horaActualFormateada = fechaActual.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const citasHoy = citas.filter((cita) => {
        const fechaCita = new Date(cita.fechaHora);
        // Filtrar citas de hoy que no estén eliminadas lógicamente (estado === true)
        return cita.estado === true &&
            fechaCita.getDate() === fechaActual.getDate() &&
            fechaCita.getMonth() === fechaActual.getMonth() &&
            fechaCita.getFullYear() === fechaActual.getFullYear();
    });

    const cantidadCitasHoy = citasHoy.length;

    // 1. Atendidos Hoy: Citas de hoy que YA pasaron por triaje
    const citasAtendidas = citasHoy.filter(cita => cita.atendidoEnTriaje === true).length;

    // 2. Pacientes en Espera: El total de hoy menos los que ya se atendieron en triaje
    const pacientesEnEspera = cantidadCitasHoy - citasAtendidas;

    // 3. Alertas: Primero sacamos la LISTA COMPLETA de las citas atrasadas
    const listaPacientesAlerta = citasHoy.filter(cita => {
        const fechaCita = new Date(cita.fechaHora);
        return cita.atendidoEnTriaje !== true && fechaCita < fechaActual;
    });

    // Luego, sacamos la CANTIDAD (el número) usando .length
    const pacientesAlerta = listaPacientesAlerta.length;





    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-orange-200 p-6 rounded-xl shadow-sm flex flex-row justify-around col-span-3">
                <div className="flex flex-col justify-center items-center">
                    <span className="text-emerald-900 text-sm font-bold uppercase">Fecha Actual</span>
                    <span className="text-4xl font-bold text-cyan-900 mt-2">{fechaActualFormateada}</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-emerald-900 text-sm font-bold uppercase">Hora Actual</span>
                    <span className="text-4xl font-bold text-cyan-900 mt-2">{horaActualFormateada}</span>
                </div>
            </div>

            {/* Esto será igual a Cantidad de citas de hoy menos las citas que ya han sido atendidas 
            en triaje ya que este dashboard es solo para la enfermera */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-cyan-600 flex flex-col">
                <span className="text-gray-500 text-sm font-semibold uppercase">Pacientes en Espera</span>
                <span className="text-4xl font-bold text-cyan-900 mt-2">{pacientesEnEspera}</span>
            </div>

            {/* Esto es igual a las citas que ya han sido atendidas solamente en triaje ya que este dashboard es solo para la enfermera*/}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500 flex flex-col">
                <span className="text-gray-500 text-sm font-semibold uppercase">Atendidos Hoy</span>
                <span className="text-4xl font-bold text-cyan-900 mt-2">{citasAtendidas}</span>
            </div>

            {/* Esto es igual a las citas que no han sido atendidas porque el paciente no 
                        llegó(el punto de quiebre sera la fechaHora de la tabla Cita), repotara la 
                        asistencia al final de la jornada del empleado */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-rose-500 flex flex-col">

                <span className="text-gray-500 text-sm font-semibold uppercase">Alertas / Pendientes</span>
                <span className="text-4xl font-bold text-rose-600 mt-2">{pacientesAlerta}</span>
                <span className="flex justify-end">
                    <button
                        onClick={() => navigate('/ViewUnattendedPatients', { state: { citaAlerta: listaPacientesAlerta } })}
                        className="text-blue-600 hover:text-blue-800">
                        ver mas...
                    </button>
                </span>


            </div>
        </div>
    );
};