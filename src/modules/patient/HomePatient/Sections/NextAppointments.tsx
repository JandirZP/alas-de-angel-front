import type { Cita } from "../../../../types/models";

interface Props {
  citas: Cita[];
  loading: boolean;
}

export const NextAppointments = ({ citas, loading }: Props) => {

  // Función para formatear fecha y hora
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return {
      dia: fecha.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" }),
      hora: fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
    };
  };

  const ahora = new Date();

  const citasFiltradas = citas.filter((cita) => new Date(cita.fechaHora) >= ahora);


  return (
    <div className="w-full h-96 bg-blue-50 shadow-xl rounded-xl mt-8 overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="p-4 text-2xl font-bold bg-amber-300 text-gray-800 shadow-sm z-10">
        Próximas citas
      </div>

      {/* CONTENIDO */}
      <div className="overflow-auto flex-1 p-4">

        {/* LOADING */}
        {loading && (
          <div className="flex h-full items-center justify-center text-gray-400 gap-2">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>
            <span className="italic">Buscando citas...</span>
          </div>
        )}

        {/* EMPTY STATE (Sin citas) */}
        {!loading && citasFiltradas.length === 0 && (
          <div className="flex flex-col h-full items-center justify-center text-gray-400 gap-3 opacity-70">
            <i className="fa-regular fa-calendar-xmark text-6xl text-gray-300"></i>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-500">Sin citas pendientes</p>
              <p className="text-sm">Todo está tranquilo por aquí.</p>
            </div>
          </div>
        )}

        {/* LISTA DE CITAS */}
        {!loading && citasFiltradas.map((cita) => {
          const { dia, hora } = formatearFecha(cita.fechaHora);

          return (
            <div key={cita.idCita} className="p-4 mb-4 bg-amber-200 rounded-xl grid grid-cols-2 gap-4 text-xl text-orange-600 font-semibold shadow-sm hover:shadow-md transition-shadow">

              {/* Fila 1 */}
              <div>
                Día: <span className="text-blue-900 italic pl-2">{dia}</span>
              </div>
              <div>
                Hora: <span className="text-blue-900 italic pl-2">{hora}</span>
              </div>

              {/* Fila 2 - AHORA USAMOS DATOS PLANOS 👇 */}
              <div>
                Especialidad:
                <span className="text-blue-900 italic pl-2 block text-lg">
                  {cita.especialidadMedico}
                </span>
              </div>
              <div>
                Médico:
                <span className="text-blue-900 italic pl-2 block text-lg">
                  Dr. {cita.nombreMedico} {cita.apellidoMedico}
                </span>
              </div>

              {/* Motivo */}
              <div className="col-span-2 text-sm text-gray-500 font-normal mt-2 border-t border-orange-300/30 pt-2">
                Motivo: {cita.motivo}

              </div>
            </div>
          );
        })}



      </div>

    </div>
  );
};