// import { useParams } from "react-router-dom";


// export const ViewMedicalRecordDoctor = () => {
//     const { idPaciente } = useParams();
//     return (
//         <div>
//             <h1>ViewMedicalRecordDoctor</h1>
//             <p>{idPaciente}</p>
//         </div>
//     );
// };


import { useNavigate, useParams } from "react-router-dom";
import { ProfilePatientDoctor } from "./Sections/ProfilePatientDoctor";
import { AllergiesDoctor } from "./Sections/AllergiesDoctor";
import { PathologiesDoctor } from "./Sections/PathologiesDoctor";
import { SurgeriesDoctor } from "./Sections/SurgeriesDoctor";
import { HereditaryBackgroundDoctor } from "./Sections/HereditaryBackgroundDoctor";
import { HabitsAndLifestyleDoctor } from "./Sections/HabitsAndLifestyleDoctor";
import { WomensSectionDoctor } from "./Sections/WomensSectionDoctor";
import { EventsMedical } from "./Sections/EventsMedical";
import type { HistoriaClinica } from "../../../types/models";
import { useEffect, useState } from "react";
import { decodeId } from "../../../utils/hashids";
import { hcEventosService } from "../../../services/hcEventos.service";

export const ViewMedicalRecordDoctor = () => {
    const navigate = useNavigate();
    const { idPaciente } = useParams();
    const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            const fetchHistoria = async () => {
                if (!idPaciente) return;
                const numericId = decodeId(idPaciente);
                if (!numericId) {
                    navigate(-1);
                    return;
                }
                try {
                    const data = await hcEventosService.getHistoriaPorIdPaciente(numericId);
                    setHistoria(data);
                } catch (error) {
                    console.error("Error al cargar historia clínica", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchHistoria();
        },
        [idPaciente, navigate]
    )

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <i className="fa-solid fa-circle-notch fa-spin text-4xl text-emerald-500 mb-4"></i>
                <h2 className="text-xl font-bold text-slate-700">Cargando historia clínica...</h2>
            </div>
        );
    }

    if (!historia) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <i className="fa-solid fa-notdef text-4xl text-red-500 mb-4"></i>
                <h2 className="text-xl font-bold text-slate-700">No se encontró la historia clínica.</h2>
            </div>
        );
    }

    // Formatear dato recibido de fechaCreacion
    const fechaCreacion = new Date(historia.fechaCreacion).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    // separaremos la fecha de la hora
    const fecha = fechaCreacion.split(",")[0];
    const hora = fechaCreacion.split(",")[1];

    // Mensaje que dira en fecha creacion
    const mensajeFechaCreacion = `${fecha} a las ${hora}`;

    // Calcular edad
    const fechaNacimiento = new Date(historia.fechaNacimiento);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

    // --- DATOS PARA EL DOCTOR ---
    // A partir de aquí, "historia" NO es null y puedes leer sus propiedades sin error.
    const mockHistoria = {
        codigo: `HC-${historia.idHC?.toString().padStart(3, '0')}`,
        estado: historia.estadoHC ? "Activo" : "Inactivo",
        fechaCreacion: mensajeFechaCreacion,
        paciente: {
            nombres: historia.nombresPaciente || "",
            apellidos: `${historia.apellidoPaternoPaciente || ""} ${historia.apellidoMaternoPaciente || ""}`,
            tipoDoc: historia.tipoDocumento || "DNI",
            numDoc: historia.numeroDocumento || "",
            edad: edad,
            sexo: historia.sexoPaciente ? "Masculino" : "Femenino"
        },
        biologicos: { grupoSanguineo: historia.grupoSanquineo || "-", factorRH: historia.factorRH || "-" },
        hereditarios: {
            tiene: historia.antecedentesFamiliares,
            detalle: historia.especifiqueAnteFamil || ""
        },
        habitos: {
            alcohol: { estado: historia.estadoAlcohol === 2 ? "Activo" : (historia.estadoAlcohol === 1 ? "Ex consumidor" : "Nunca"), frecuencia: historia.frecuenciaAlcohol || "" },
            tabaco: { estado: historia.estadoTabaco === 2 ? "Activo" : (historia.estadoTabaco === 1 ? "Ex consumidor" : "Nunca"), frecuencia: historia.frecuenciaTabaco || "" },
            drogas: historia.drogas || []
        },
        sexualidad: {
            activo: historia.sexualmenteActivo,
            edadInicio: historia.edadInicioSexual || "-",
            metodo: historia.usaMetodoAnticonceptivo ? (historia.metodoPlanificacion || "Sí") : "No usa"
        },
        gineco: {
            embarazos: historia.tuvoEmbarazos || false,
            gestaciones: historia.cantidadGestaciones || 0,
            partos: historia.cantidadPartos || 0,
            abortos: historia.cantidadAbortos || 0,
            huboComplicaciones: historia.huboComplicaciones || false,
            complicaciones: historia.especifiqueComplicaciones || ""
        },
        registros: {
            patologias: historia.antecedentesPatologicos || [],
            quirurgicos: historia.antecedentesQuirurgicos || [],
            alergias: historia.alergias || [],
        },
        eventosMedicos: historia.eventosMedicos || [],
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">

            <>
                {/* ENCABEZADO FIJO */}
                <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                title="Volver"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                                    <i className="fa-solid fa-stethoscope text-emerald-600"></i>
                                    Vista Clínica <span className="text-emerald-600 font-mono text-xl ml-1">#{mockHistoria.codigo}</span>
                                </h1>
                                <p className="text-sm text-slate-500 font-medium">
                                    Modo de Lectura Médica
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${mockHistoria.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                Historia {mockHistoria.estado}
                            </span>
                            <button className="bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm transition-all flex items-center gap-2">
                                <i className="fa-solid fa-plus"></i> Nueva Atención (Evento)
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">

                    {/* === PERFIL DEL PACIENTE === */}
                    <ProfilePatientDoctor mockProfile={mockHistoria} />

                    {/* === GRID DE INFORMACIÓN MÉDICA === */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* COLUMNA IZQUIERDA (Antecedentes) */}
                        <div className="space-y-6 xl:col-span-1">

                            {/* ALERGIAS (Rojo - Prioridad Alta) */}
                            <AllergiesDoctor mockAllergies={mockHistoria} />

                            {/* PATOLOGÍAS (Naranja) */}
                            <PathologiesDoctor mockPathologies={mockHistoria} />

                            {/* QUIRÚRGICOS (Índigo) */}
                            <SurgeriesDoctor mockSurgeries={mockHistoria} />

                            {/* ANTECEDENTES HEREDITARIOS */}
                            <HereditaryBackgroundDoctor mockHereditaryBackground={mockHistoria} />

                            {/* HÁBITOS Y ESTILO DE VIDA */}
                            <HabitsAndLifestyleDoctor mockHabitsAndLifestyle={mockHistoria} />

                            {/* GINECO-OBSTÉTRICO (Renderizado Condicional) */}
                            {mockHistoria.paciente.sexo === 'Femenino' && (
                                <WomensSectionDoctor mockWomensSection={mockHistoria} />
                            )}
                        </div>

                        {/* COLUMNA DERECHA (Línea de Tiempo de Eventos Médicos) */}
                        <div className="xl:col-span-2 space-y-6">
                            <EventsMedical mockEventsMedical={mockHistoria} />
                        </div>

                    </div>
                </main>
            </>

            {/* Scrollbar personalizado para la línea de tiempo y componentes largos */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}} />
        </div>
    );
};
