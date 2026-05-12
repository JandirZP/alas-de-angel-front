// ScheduleAppointment.tsx
import type { Usuario } from "../../../../types/models";
// Importamos nuestro hook que acabamos de crear (la lógica)
import { useScheduleAppointment } from "./useScheduleAppointment";

interface Props {
  paciente: Usuario;
  onCitaAgendada: () => void;
}

export const ScheduleAppointment = ({ paciente, onCitaAgendada }: Props) => {
  // 1. Extraemos TODO lo que el hook calculó por nosotros 
  // ¡Mira lo limpio que queda el componente ahora!
  const {
    especialidades, medicos, horariosDisponibles, horasOcupadas, guardando,
    hoyFormatoLocal, horaActualNumerica,
    idEspecialidad, setIdEspecialidad,
    idMedico, setIdMedico,
    fecha, setFecha,
    hora, setHora,
    motivo, setMotivo,
    handleSubmit
  } = useScheduleAppointment({ paciente, onCitaAgendada });

  // 2. Aquí abajo SÓLO nos preocupamos por lo visual (HTML/Tailwind)
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sky-700">Agendar Cita</h1>
        </div>

        {/* --- CAMPO: ESPECIALIDAD --- */}
        <div>
          <label className="block text-lg font-semibold text-emerald-600">Especialidad</label>
          <select
            name="idEspecialidad"
            value={idEspecialidad}
            onChange={(e) => setIdEspecialidad(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1"
          >
            <option value="">Seleccione especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.codigo} value={esp.codigo}>{esp.nombre}</option>
            ))}
          </select>
        </div>

        {/* --- CAMPO: MÉDICO --- */}
        <div>
          <label className="block text-lg font-semibold text-emerald-600">Médico</label>
          <select
            name="medicoId"
            value={idMedico}
            onChange={(e) => setIdMedico(e.target.value)}
            disabled={!idEspecialidad || medicos.length === 0}
            required
            className="mt-1 w-full rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 disabled:bg-gray-300 disabled:text-gray-500"
          >
            <option value="">
              {!idEspecialidad ? "Primero seleccione especialidad" :
                medicos.length === 0 ? "No hay médicos para esta especialidad" : "Seleccione médico"}
            </option>
            {medicos.map((medico) => (
              <option key={medico.idUsuario} value={medico.idUsuario}>
                Dr(a). {medico.nombres} {medico.apellidoPaterno}
              </option>
            ))}
          </select>
        </div>

        {/* --- CAMPOS: FECHA Y HORA (En columnas) --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold text-emerald-600">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={fecha}
              min={hoyFormatoLocal}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-emerald-600">Hora</label>
            <select
              name="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              disabled={!fecha || !idMedico}
              className="mt-1 w-full rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 disabled:bg-gray-300 disabled:text-gray-500"
            >
              <option value="">Seleccione hora</option>
              {horariosDisponibles.map((horario) => {
                let horaPasada = false;
                if (fecha === hoyFormatoLocal) {
                  const [hh, mm] = horario.split(':').map(Number);
                  const horaOpcionNumerica = hh * 100 + mm;
                  if (horaOpcionNumerica <= horaActualNumerica) {
                    horaPasada = true;
                  }
                }
                const estaOcupado = horasOcupadas.includes(horario);
                return (
                  <option key={horario} value={horario} disabled={estaOcupado || horaPasada}>
                    {horario} {estaOcupado ? "(Ocupado)" : (horaPasada ? "(Ya pasó)" : "")}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* --- CAMPO: MOTIVO --- */}
        <div>
          <label className="block text-lg font-semibold text-emerald-600">Motivo de la cita</label>
          <textarea
            name="motivo"
            rows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1"
            placeholder="Ej. Consulta general"
          />
        </div>

        {/* --- BOTÓN DE ENVIAR --- */}
        <button
          type="submit"
          disabled={guardando}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition"
        >
          {guardando ? (
            <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Agendando...</>
          ) : ("Agendar cita")}
        </button>
      </form>
    </div>
  );
};
