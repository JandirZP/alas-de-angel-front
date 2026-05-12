import { HeaderDoctor } from "./Sections/HeaderDoctor";
import { Laboratory } from "./Sections/Laboratory";
import { ReceivedMessages } from "./Sections/ReceivedMessages";
import { ResultsImages } from "./Sections/ResultsImages";
import { TodaysMedicalAppointments } from "./Sections/TodaysMedicalAppointments";
import type { Cita, Usuario } from "../../../types/models";

interface Props {
    doctorHome: Usuario | null;
    citasHome: Cita[];
    isLoadingCitas: boolean; // Recibimos la variable desde DashboardDoctor
}

export const HomeDoctor = ({ doctorHome, citasHome, isLoadingCitas }: Props) => {


    //Formatemos la fecha
    const fechaActual = new Date().toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // --- DATOS ESTÁTICOS DEL DASHBOARD ---

    // 1. Citas del día (Top 3 en orden ascendente)

    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${year}-${month}-${day}`;
    const citasHoy = citasHome
        .filter(cita => cita.fechaHora.startsWith(fechaHoy))
        .sort((a, b) => a.fechaHora.localeCompare(b.fechaHora))
        .slice(0, 3)
        .map(cita => ({
            id: cita.idCita,
            hora: cita.fechaHora.split('T')[1],
            paciente: `${cita.nombrePaciente} ${cita.apellidoPatPaciente} ${cita.apellidoMatPaciente}`,
            motivo: cita.motivo,
            estado: cita.estado

        }));

    // 2. Mensajes Recibidos
    const mensajes = [
        { id: 1, remitente: "Dra. Silva (Cardiología)", asunto: "Interconsulta paciente Pérez", tiempo: "Hace 30 min", leido: false },
        { id: 2, remitente: "Laboratorio Central", asunto: "Resultados urgentes disponibles", tiempo: "Hace 2 horas", leido: false },
        { id: 3, remitente: "Administración", asunto: "Reunión de staff médico mensual", tiempo: "Ayer", leido: true }
    ];

    // 3. Resultados de Laboratorio
    const laboratorio = [
        { id: 1, paciente: "Roberto Ruiz", examen: "Hemograma Completo y Perfil Lipídico", fecha: "24/03/2026", alerta: true },
        { id: 2, paciente: "Ana Torres", examen: "Examen de Orina Completo", fecha: "23/03/2026", alerta: false },
        { id: 3, paciente: "Julio Mendoza", examen: "Glucosa en ayunas", fecha: "23/03/2026", alerta: true }
    ];

    // 4. Resultados de Imágenes (Rayos X, Resonancia)
    const imagenes = [
        { id: 1, paciente: "Sofía Castro", examen: "Resonancia Magnética Cerebral", area: "Neurología", fecha: "24/03/2026", estado: "Listo para revisión" },
        { id: 2, paciente: "Miguel Vargas", examen: "Radiografía de Tórax PA/LAT", area: "Neumología", fecha: "23/03/2026", estado: "Listo para revisión" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">

            <HeaderDoctor doctorSection={doctorHome} fechaActualSection={fechaActual} />

            {/* CONTENEDOR PRINCIPAL DEL DASHBOARD (Sube sobre el encabezado con -mt-16) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 space-y-6">

                {/* FILA SUPERIOR: Citas (Izq) y Mensajes (Der) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* WIDGET 1: CITAS DEL DÍA */}
                    <TodaysMedicalAppointments citasHoySection={citasHoy} isLoading={isLoadingCitas} />

                    {/* WIDGET 2: MENSAJES RECIBIDOS */}
                    <ReceivedMessages mensajesSection={mensajes} />
                </div>

                {/* FILA INFERIOR: Laboratorio (Izq) e Imágenes (Der) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* WIDGET 3: LABORATORIO */}
                    <Laboratory laboratorioSection={laboratorio} />

                    {/* WIDGET 4: IMÁGENES (RAYOS X, RESONANCIA) */}
                    <ResultsImages imagenesSection={imagenes} />

                </div>
            </main>
        </div>
    );
};