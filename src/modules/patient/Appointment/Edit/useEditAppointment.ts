// useEditAppointment.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { citaService } from "../../../../services/cita.service";
import type { Cita, Usuario } from "../../../../types/models";

// 1. Las propiedades que necesita el hook, igual que el componente
interface UseEditAppointmentProps {
    paciente: Usuario | null;
}

export const useEditAppointment = ({ paciente }: UseEditAppointmentProps) => {

    // --- A. ESTADOS DE LA VISTA ---
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para los modales
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

    // --- B. EFECTOS SECUNDARIOS (Obtener Citas) ---
    useEffect(() => {
        if (paciente && paciente.idUsuario) {
            setLoading(true);
            citaService.getByPaciente(paciente.idUsuario)
                .then((data) => setCitas(data))
                .catch((error) => {
                    console.error("Error cargando citas:", error);
                    toast.error("No se pudieron cargar las citas");
                })
                .finally(() => setLoading(false));
        }
    }, [paciente]);

    // --- C. FUNCIONES AUXILIARES Y FILTROS ---
    const formatearFecha = (fechaString: string) => {
        const fecha = new Date(fechaString);
        return {
            dia: fecha.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" }),
            hora: fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
        };
    };

    const ahora = new Date();
    // Filtramos para que solo muestre citas desde este mismo instante hacia el futuro
    const citasFiltradas = citas.filter((cita) => new Date(cita.fechaHora) >= ahora);

    // --- D. ACCIONES (Modales) ---
    const abrirModalEditar = (cita: Cita) => {
        setCitaSeleccionada(cita);
        setMostrarModalEditar(true);
    };

    const abrirModalCancelar = (cita: Cita) => {
        setCitaSeleccionada(cita);
        setMostrarModalCancelar(true);
    };

    const handleCancelarCita = () => {
        if (citaSeleccionada) {
            citaService.cancelarCita(citaSeleccionada.idCita)
                .then((respuesta) => {
                    toast.success(respuesta.mensaje);
                    setCitas(prev => prev.filter(c => c.idCita !== citaSeleccionada.idCita));
                    setMostrarModalCancelar(false);
                    setCitaSeleccionada(null);
                })
                .catch((error) => {
                    console.error("Error cancelando cita:", error);
                    toast.error("No se pudo cancelar la cita");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    // 3. RETORNAMOS TODO LO NECESARIO A LA VISTA
    return {
        // Variables
        loading,
        citasFiltradas,
        mostrarModalEditar, setMostrarModalEditar,
        mostrarModalCancelar, setMostrarModalCancelar,
        citaSeleccionada,
        // Funciones
        formatearFecha,
        abrirModalEditar,
        abrirModalCancelar,
        handleCancelarCita
    };
};
