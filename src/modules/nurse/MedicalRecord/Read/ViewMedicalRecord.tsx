
import { HeaderMR } from "./Sections/HeaderMR";
import { ProfilePatient } from "./Sections/ProfilePatient";
import { FamilyHistory } from "./Sections/FamilyHistory";
import { Habits } from "./Sections/Habits";
import { Sexuality } from "./Sections/Sexuality";
import { GynecoObs_Rendering } from "./Sections/GynecoObs_Rendering";
import { Allergy } from "./Sections/Allergy";
import { Pathology } from "./Sections/Pathology";
import { Surgeries } from "./Sections/Surgeries";




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hcEventosService } from "../../../../services/hcEventos.service";
import { decodeId } from "../../../../utils/hashids";
import type { HistoriaClinica } from "../../../../types/models";

export const ViewMedicalRecord = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [historiaReal, setHistoriaReal] = useState<HistoriaClinica | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoria = async () => {
            if (!id) return;
            const numericId = decodeId(id);
            if (!numericId) {
                navigate("/medical-record");
                return;
            }
            try {
                const data = await hcEventosService.getHistoriaPorId(numericId);
                setHistoriaReal(data);
            } catch (error) {
                console.error("Error al cargar historia clínica", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistoria();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <i className="fa-solid fa-circle-notch fa-spin text-4xl text-emerald-500 mb-4"></i>
                <h2 className="text-xl font-bold text-slate-700">Cargando historia clínica...</h2>
            </div>
        );
    }

    if (!historiaReal) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <i className="fa-solid fa-file-excel text-4xl text-red-500 mb-4"></i>
                <h2 className="text-xl font-bold text-slate-700">Historia clínica no encontrada</h2>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg font-semibold hover:bg-slate-300">Volver</button>
            </div>
        );
    }

    // Formatear dato recibido de fechaCreacion
    const fechaCreacion = new Date(historiaReal.fechaCreacion).toLocaleDateString("es-PE", {
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
    const fechaNacimiento = new Date(historiaReal.fechaNacimiento);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();


    // Mapeamos los datos reales del DTO al formato que esperan los componentes hijos
    const mockHistoria = {
        idHC: historiaReal.idHC,
        codigo: `HC-${historiaReal.idHC?.toString().padStart(3, '0')}`,
        estado: historiaReal.estadoHC ? "Activo" : "Inactivo",
        fechaCreacion: mensajeFechaCreacion,
        paciente: {
            nombres: historiaReal.nombresPaciente || "",
            apellidos: `${historiaReal.apellidoPaternoPaciente || ""} ${historiaReal.apellidoMaternoPaciente || ""}`,
            tipoDoc: historiaReal.tipoDocumento || "DNI",
            numDoc: historiaReal.numeroDocumento || "",
            edad: edad,
            sexo: historiaReal.sexoPaciente ? "Masculino" : "Femenino"
        },
        biologicos: { grupoSanguineo: historiaReal.grupoSanquineo || "-", factorRH: historiaReal.factorRH || "-" },
        hereditarios: {
            tiene: historiaReal.antecedentesFamiliares,
            detalle: historiaReal.especifiqueAnteFamil || ""
        },
        habitos: {
            alcohol: { estado: historiaReal.estadoAlcohol === 2 ? "Activo" : (historiaReal.estadoAlcohol === 1 ? "Ex consumidor" : "Nunca"), frecuencia: historiaReal.frecuenciaAlcohol || "" },
            tabaco: { estado: historiaReal.estadoTabaco === 2 ? "Activo" : (historiaReal.estadoTabaco === 1 ? "Ex consumidor" : "Nunca"), frecuencia: historiaReal.frecuenciaTabaco || "" },
            drogas: historiaReal.drogas || []
        },
        sexualidad: {
            activo: historiaReal.sexualmenteActivo,
            edadInicio: historiaReal.edadInicioSexual || "-",
            metodo: historiaReal.usaMetodoAnticonceptivo ? (historiaReal.metodoPlanificacion || "Sí") : "No usa"
        },
        gineco: {
            aplica: !historiaReal.sexoPaciente, // True si es Femenino (false)
            embarazos: historiaReal.tuvoEmbarazos || false,
            gestaciones: historiaReal.cantidadGestaciones || 0,
            partos: historiaReal.cantidadPartos || 0,
            abortos: historiaReal.cantidadAbortos || 0,
            huboComplicaciones: historiaReal.huboComplicaciones || false,
            complicaciones: historiaReal.especifiqueComplicaciones || ""
        },
        registros: {
            // Asumiendo que ahora tu DTO de backend mapéa y devuelve estas listas
            patologias: historiaReal.antecedentesPatologicos || [],
            quirurgicos: historiaReal.antecedentesQuirurgicos || [],
            alergias: historiaReal.alergias || []
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">

            {/* ENCABEZADO FIJO */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
                <HeaderMR historia={mockHistoria} />
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">

                {/* === TARJETA: PERFIL DEL PACIENTE === */}
                <ProfilePatient historia={mockHistoria} />

                {/* === GRID DE INFORMACIÓN MÉDICA === */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA IZQUIERDA (Hereditarios, Hábitos, Sexualidad, Gineco) */}
                    <div className="space-y-6 lg:col-span-1">

                        {/* Antecedentes Hereditarios */}
                        <FamilyHistory historia={mockHistoria} />

                        {/* Hábitos */}
                        <Habits historia={mockHistoria} />

                        {/* Sexualidad */}
                        <Sexuality historia={mockHistoria} />

                        {/* === GINECO-OBSTÉTRICO (RENDERIZADO CONDICIONAL) === */}
                        <GynecoObs_Rendering historia={mockHistoria} />
                    </div>

                    {/* COLUMNA DERECHA (Tablas de Detalle Clínico) */}
                    <div className="space-y-6 lg:col-span-2">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
                            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                <i className="fa-solid fa-notes-medical text-emerald-500"></i> Registros Clínicos Detallados
                            </h3>

                            <div className="space-y-8">

                                {/* 1. Alergias */}
                                <Allergy historia={mockHistoria} />

                                {/* 2. Patologías */}
                                <Pathology historia={mockHistoria} />

                                {/* 3. Quirúrgicos */}
                                <Surgeries historia={mockHistoria} />

                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
};