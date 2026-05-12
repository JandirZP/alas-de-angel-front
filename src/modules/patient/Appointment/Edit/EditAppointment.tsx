import type { Usuario } from "../../../../types/models";
import { ModalCancelAppointment } from "../Cancel/ModelCancelAppointment";
import { ModalEditAppointment } from "./ModalEditAppointment";
import { useEditAppointment } from "./useEditAppointment";

interface Props {
    paciente: Usuario | null;
}
export const EditAppointment = ({ paciente }: Props) => {
    // Extraemos la lógica del hook
    const {
        loading,
        citasFiltradas,
        mostrarModalEditar, setMostrarModalEditar,
        mostrarModalCancelar, setMostrarModalCancelar,
        citaSeleccionada,
        formatearFecha,
        abrirModalEditar,
        abrirModalCancelar,
        handleCancelarCita
    } = useEditAppointment({ paciente });

    return (
        <div className="p-6 md:p-8 w-full max-w-7xl mx-auto min-h-[60vh] flex flex-col font-sans bg-slate-50/50 rounded-3xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Mis Citas Programadas</h2>
                <p className="text-slate-500 mt-1">Gestiona tus próximas consultas médicas.</p>
            </div>
            {/* Estado de Carga */}
            {loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4 mt-10 animate-pulse">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <span className="font-medium text-slate-500">Sincronizando agenda...</span>
                </div>
            )}
            {/* Estado Vacío */}
            {!loading && citasFiltradas.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-white rounded-3xl border border-slate-100 shadow-sm mt-4">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <i className="fa-regular fa-calendar-check text-5xl text-slate-300"></i>
                    </div>
                    <p className="text-2xl font-bold text-slate-700">No tienes citas próximas</p>
                    <p className="text-slate-500 mt-2 max-w-md">
                        Tu agenda está libre. Cuando programes una nueva consulta, aparecerá aquí.
                    </p>
                </div>
            )}
            {/* Tabla Estilizada */}
            {!loading && citasFiltradas.length > 0 && (
                <div className="w-full overflow-x-auto pb-4">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                <th className="px-6 py-2">Fecha y Hora</th>
                                <th className="px-6 py-2">Especialidad</th>
                                <th className="px-6 py-2">Profesional</th>
                                <th className="px-6 py-2">Motivo</th>
                                <th className="px-6 py-2 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {citasFiltradas.map((cita) => {
                                const { dia, hora } = formatearFecha(cita.fechaHora);
                                const inicialMedico = cita.nombreMedico ? cita.nombreMedico.charAt(0).toUpperCase() : "";
                                const prefijoMedico = cita.sexoMedico ? "Dr." : "Dra.";
                                return (
                                    <tr
                                        key={cita.idCita}
                                        className="bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
                                    >
                                        <td className="px-6 py-5 rounded-l-2xl border-y border-l border-slate-100">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800 text-base">{dia}</span>
                                                <span className="text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                                                    <i className="fa-regular fa-clock text-xs"></i> {hora}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 border-y border-slate-100">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                                                {cita.especialidadMedico}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 border-y border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-100 to-blue-50 text-indigo-700 flex items-center justify-center font-bold shadow-inner">
                                                    {inicialMedico}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700">{prefijoMedico} {cita.nombreMedico} {cita.apellidoMedico}</span>
                                                    <span className="text-xs text-slate-400">Titular</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 border-y border-slate-100 max-w-[280px]">
                                            <p className="text-slate-600 truncate" title={cita.motivo}>
                                                {cita.motivo}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 rounded-r-2xl border-y border-r border-slate-100 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                                <button
                                                    onClick={() => abrirModalEditar(cita)}
                                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-colors duration-200 tooltip"
                                                    title="Modificar cita"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                    onClick={() => abrirModalCancelar(cita)}
                                                    className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-colors duration-200 tooltip"
                                                    title="Cancelar cita"
                                                >
                                                    <i className="fa-solid fa-xmark text-lg leading-none w-4 h-4 flex items-center justify-center"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Instanciamos nuestros nuevos componentes modales */}
            <ModalEditAppointment
                visible={mostrarModalEditar}
                onClose={() => setMostrarModalEditar(false)}
                citaSeleccionada={citaSeleccionada}
            />

            <ModalCancelAppointment
                visible={mostrarModalCancelar}
                onClose={() => setMostrarModalCancelar(false)}
                onConfirm={handleCancelarCita}
            />
        </div>
    );
};
