// useScheduleAppointment.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usuarioService } from "../../../../services/usuario.service";
import { citaService } from "../../../../services/cita.service";
import type { Especialidad, Usuario } from "../../../../types/models";

// 1. Definimos qué necesita recibir nuestro hook para funcionar
interface UseScheduleProps {
    paciente: Usuario;
    onCitaAgendada: () => void;
}

// 2. Creamos y exportamos la función de nuestro Custom Hook
export const useScheduleAppointment = ({ paciente, onCitaAgendada }: UseScheduleProps) => {
    // --- A. TODOS LOS ESTADOS (Todo lo que puede cambiar en la pantalla) ---
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [medicos, setMedicos] = useState<Usuario[]>([]);

    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");

    const [guardando, setGuardando] = useState(false);
    const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);

    const horariosDisponibles = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ];

    // --- LÓGICA DE VALIDACIÓN DE FECHA Y HORA ---
    const ahora = new Date();
    // yyyy-mm-dd
    const hoyFormatoLocal = ahora.toLocaleDateString('en-CA');
    // hh:mm
    const horaActualNumerica = ahora.getHours() * 100 + ahora.getMinutes();

    // --- B. EFECTOS SECUNDARIOS (Llamadas a la BD) ---

    // Efecto 1: Cargar especialidades apenas inicie el hook
    useEffect(() => {
        usuarioService.getEspecialidades()
            .then(setEspecialidades)
            .catch((err) => console.error("Error cargando especialidades:", err));
    }, []);

    // Efecto 2: Si el usuario escoge una especialidad, buscamos sus médicos
    useEffect(() => {
        if (idEspecialidad !== "") {
            usuarioService.getMedicosPorEspecialidad(Number(idEspecialidad))
                .then((data) => {
                    setMedicos(data);
                    setIdMedico(""); // Reseteamos el médico al cambiar especialidad
                })
                .catch((err) => console.error("Error cargando médicos:", err));
        } else {
            setMedicos([]);
            setIdMedico("");
        }
    }, [idEspecialidad]);

    // Efecto 3: Si ya hay un médico y una fecha, buscamos sus horas ocupadas
    useEffect(() => {
        if (idMedico && fecha) {
            citaService.obtenerCitasPorMedico(Number(idMedico), String(fecha))
                .then((data) => {
                    setHorasOcupadas(
                        data.map((cita) => {
                            if (Array.isArray(cita.fechaHora)) {
                                const hh = String(cita.fechaHora[3]).padStart(2, "0");
                                const mm = String(cita.fechaHora[4] || 0).padStart(2, "0");
                                return `${hh}:${mm}`;
                            } else if (typeof cita.fechaHora === "string") {
                                return cita.fechaHora.substring(11, 16);
                            }
                            return "";
                        })
                    );
                })
                .catch((err) => console.error("Error cargando citas ocupadas:", err));
        }
    }, [idMedico, fecha]);

    // --- C. ACCIONES (Las funciones que ejecutan los botones) ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validamos que todo esté lleno
        if (!paciente || !idEspecialidad || !idMedico || !fecha || !hora || !motivo) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        setGuardando(true); // Ponemos el botón en "cargando"
        const fechaHoraFormateada = `${fecha}T${hora}:00`;

        // Armamos la información tal como la pide el servidor
        const citaPayload = {
            paciente: { idUsuario: paciente.idUsuario },
            medico: { idUsuario: Number(idMedico) },
            especialidad: { codigo: Number(idEspecialidad) },
            fechaHora: fechaHoraFormateada,
            motivo: motivo,
            estado: true
        };

        try {
            await citaService.agendarCita(citaPayload);
            toast.success("¡Cita agendada con éxito!");

            // Limpiamos formularios (opcional, porque volveremos al home)
            setIdEspecialidad(""); setIdMedico(""); setFecha(""); setHora(""); setMotivo("");

            // Le decimos al componente Padre que ya terminamos
            onCitaAgendada();
        } catch (error) {
            console.error("Error al agendar:", error);
            toast.error("No se pudo agendar la cita.");
        } finally {
            // Quitamos el estado de carga sin importar si hubo error o éxito
            setGuardando(false);
        }
    };

    // 3. RETORNAMOS TODO LO QUE LA VISTA (HTML) VA A NECESITAR USAR
    return {
        // Variables y datos a mostrar
        especialidades,
        medicos,
        horariosDisponibles,
        horasOcupadas,
        guardando,
        hoyFormatoLocal,
        horaActualNumerica,
        // Variables de formulario (los value)
        idEspecialidad, setIdEspecialidad,
        idMedico, setIdMedico,
        fecha, setFecha,
        hora, setHora,
        motivo, setMotivo,
        // Acciones principales
        handleSubmit
    };
};
