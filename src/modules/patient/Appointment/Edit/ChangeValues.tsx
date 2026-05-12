import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Cita, Especialidad, Usuario } from "../../../../types/models";
import { toast } from "sonner";
import { usuarioService } from "../../../../services/usuario.service";
import { citaService } from "../../../../services/cita.service";



export const ChangeValues = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const citaRecibida = location.state?.citaParaEditar;

    const [formData, setFormData] = useState<Cita | null>(null);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    // Estados para los selectores
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [medicos, setMedicos] = useState<Usuario[]>([]);

    // Estados para el formulario editable
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>("");
    const [medicoSeleccionado, setMedicoSeleccionado] = useState<string>("");
    const [fechaCita, setFechaCita] = useState<string>("");
    const [horaCita, setHoraCita] = useState<string>("");
    const [motivoCita, setMotivoCita] = useState<string>("");


    useEffect(() => {
        // En lugar de llamar al backend vacío, verificamos si nos llegó la cita
        if (citaRecibida) {
            setFormData(citaRecibida);

            // Inicializar estados con los datos de la cita recibida
            // Asumiendo que citaRecibida.fechaHora viene en formato "YYYY-MM-DDTHH:mm:ss" o similar
            if (citaRecibida.fechaHora) {
                const [fecha, horaCompleta] = citaRecibida.fechaHora.split('T');
                setFechaCita(fecha || "");
                // Extraer solo HH:mm de "HH:mm:ss" si es necesario
                const horaCortada = horaCompleta ? horaCompleta.substring(0, 5) : "";
                setHoraCita(horaCortada);
            }

            setMotivoCita(citaRecibida.motivo || "");

            // Aquí tendríamos que hacer un trabajo extra si quisiéramos pre-seleccionar 
            // la especialidad porque la Cita solo trae el nombre de la especialidad del médico.
            // Por simplicidad, dejaremos que el usuario vuelva a seleccionar la especialidad si quiere cambiar el médico,
            // O podríamos cargar todas las especialidades y buscar cuál coincide con citaRecibida.especialidadMedico

            cargarEspecialidades();
        } else {
            toast.error("No se encontró la cita a editar");
            navigate(-1); // Si alguien entra directo a la URL sin pasar por la tabla, lo regresamos
        }
    }, [citaRecibida, navigate]);

    const cargarEspecialidades = async () => {
        try {
            const data = await usuarioService.getEspecialidades();
            setEspecialidades(data);

            if (citaRecibida && citaRecibida.especialidadMedico) {
                const espEncontrada = data.find(e => e.nombre.toLowerCase() === citaRecibida.especialidadMedico?.toLowerCase());
                if (espEncontrada) {
                    setEspecialidadSeleccionada(espEncontrada.codigo.toString());
                    cargarMedicos(espEncontrada.codigo);
                }
            }
        } catch (error) {
            console.error("Error al cargar especialidades:", error);
            toast.error("Error al cargar las especialidades");
        } finally {
            setCargando(false);
        }
    };

    const cargarMedicos = async (codigoEspecialidad: number) => {
        try {
            const data = await usuarioService.getMedicosPorEspecialidad(codigoEspecialidad);
            setMedicos(data);

            // Si estamos cargando medicos por la especialidad inicial, preseleccionamos al medico
            if (citaRecibida && citaRecibida.idMedico && especialidadSeleccionada === "") {
                setMedicoSeleccionado(citaRecibida.idMedico.toString());
            }
        } catch (error) {
            console.error("Error al cargar médicos:", error);
            toast.error("Error al cargar los médicos");
        }
    };

    const handleEspecialidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEspecialidadSeleccionada(value);
        setMedicoSeleccionado(""); // Resetear médico al cambiar especialidad

        if (value) {
            cargarMedicos(Number(value));
        } else {
            setMedicos([]);
        }
    };

    // --- HANDLER SUBMIT ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!medicoSeleccionado || !fechaCita || !horaCita || !motivoCita) {
            toast.error("Por favor, complete todos los campos");
            return;
        }

        setGuardando(true);

        try {
            // Construir la fecha y hora en el formato que espera el backend (YYYY-MM-DDTHH:mm:ss)
            const fechaHoraFormat = `${fechaCita}T${horaCita}:00`;

            const payload = {
                medico: { idUsuario: Number(medicoSeleccionado) },
                especialidad: { codigo: Number(especialidadSeleccionada) },
                fechaHora: fechaHoraFormat,
                motivo: motivoCita
            };

            if (formData) { // Asegurarse de que formData no es null
                await citaService.actualizarCita(formData.idCita, payload);
                toast.success("Cita actualizada exitosamente");
                navigate("/DashboardPatient");
            } else {
                toast.error("No se pudo obtener la información de la cita para actualizar.");
            }
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            toast.error("Ocurrió un error al actualizar la cita");
        } finally {
            setGuardando(false);
        }
    };

    if (cargando || !formData) {
        return (
            <div className="p-6 text-3xl text-green-800 font-bold">
                Cargando Datos
            </div>
        );

    }





    const horariosDisponibles = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ];

    // --- LÓGICA DE VALIDACIÓN DE FECHA Y HORA ---
    const ahora = new Date();
    // yyyy-mm-dd
    const hoyFormatoLocal = ahora.toLocaleDateString('en-CA'); // 'en-CA' devuelve formato YYYY-MM-DD local
    // hh:mm
    const horaActualNumerica = ahora.getHours() * 100 + ahora.getMinutes();





    return (
        // Contenedor principal en columna para separar Cabecera de Formulario
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* --- CABECERA DE LA CLÍNICA (Tu código integrado) --- */}
            {/* He añadido padding y he limitado el ancho de la marca para que actúe como un bloque en la esquina */}
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

            {/* --- CONTENEDOR DEL FORMULARIO (Centrado en el espacio restante) --- */}
            <main className="grow flex items-center justify-center p-4 md:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-10 space-y-6 border border-slate-100"
                >
                    <div className="border-b border-slate-200 pb-4 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                            Modificar Cita
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Edite los detalles de la cita seleccionada a continuación.
                        </p>
                    </div>

                    {/* Especialidad */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Especialidad
                        </label>
                        <select
                            value={String(especialidadSeleccionada)}
                            onChange={handleEspecialidadChange}
                            required
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 text-slate-800 px-4 py-2.5 transition-all outline-none"
                        >
                            <option value="">Seleccione especialidad</option>
                            {especialidades.map((esp) => (
                                <option key={esp.codigo} value={String(esp.codigo)}>
                                    {esp.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Médico */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Médico Tratante
                        </label>
                        <select
                            value={String(medicoSeleccionado)}
                            onChange={(e) => setMedicoSeleccionado(e.target.value)}
                            required
                            disabled={medicos.length === 0}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 text-slate-800 px-4 py-2.5 transition-all outline-none disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            <option value="">Seleccione médico</option>
                            {medicos.map((med) => (
                                <option key={med.idUsuario} value={String(med.idUsuario)}>
                                    {med.nombres} {med.apellidoPaterno} {med.especialidades && med.especialidades[0] ? `- ${med.especialidades[0].nombre}` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={fechaCita}
                                min={hoyFormatoLocal}
                                onChange={(e) => setFechaCita(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 text-slate-800 px-4 py-2.5 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Hora
                            </label>
                            <select
                                value={horaCita}
                                onChange={(e) => setHoraCita(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 text-slate-800 px-4 py-2.5 transition-all outline-none"
                            >
                                <option value="">Seleccione hora</option>
                                {horariosDisponibles.map((h) => {
                                    // Comparamos si la hora ya pasó (Solo si el paciente seleccionó el día de hoy)
                                    let horaPasada = false;
                                    if (fechaCita === hoyFormatoLocal) {
                                        const [hh, mm] = h.split(':').map(Number);
                                        const horaOpcionNumerica = hh * 100 + mm;
                                        if (horaOpcionNumerica <= horaActualNumerica) {
                                            horaPasada = true;
                                        }
                                    }

                                    return (
                                        <option key={h} value={h} disabled={horaPasada}>
                                            {h} {horaPasada ? "(Ya pasó)" : ""}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Motivo */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Motivo de la cita
                        </label>
                        <textarea
                            rows={4}
                            value={motivoCita}
                            onChange={(e) => setMotivoCita(e.target.value)}
                            required
                            placeholder="Describe detalladamente el motivo..."
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 text-slate-800 px-4 py-3 transition-all outline-none resize-none"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => navigate("/DashboardPatient")}
                            type="button"
                            className="w-full sm:w-1/3 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors"
                        >
                            Volver
                        </button>
                        <button
                            type="submit"
                            disabled={guardando}
                            className="w-full sm:w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                        >
                            {guardando ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Actualizando...
                                </>
                            ) : (
                                "Guardar Cambios"
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};