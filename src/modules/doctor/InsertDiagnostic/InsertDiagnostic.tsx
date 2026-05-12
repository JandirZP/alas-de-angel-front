import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ViewTriaje } from "./Sections/ViewTriaje";
import { Anamensis } from "./Sections/Anamensis";
import { Diagnostic } from "./Sections/Diagnostic";
import { MedicalTreatment } from "./Sections/MedicalTreatment";
import { decodeId } from "../../../utils/hashids";
import { triajeService } from "../../../services/triaje.service";
import type { TriajeDto } from "../../../types/models";
import { hcEventosService } from "../../../services/hcEventos.service";


export const InsertDiagnostic = () => {
    const navigate = useNavigate();
    const { idCita } = useParams();

    const [triaje, setTriaje] = useState<TriajeDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const fetchTriaje = async () => {
                if (!idCita) return;
                const numericaIdCita = decodeId(idCita);
                if (!numericaIdCita) {
                    navigate(-1);
                    return;
                }
                try {
                    const triaje = await triajeService.buscarPorCita(numericaIdCita);
                    setTriaje(triaje);
                } catch (error) {
                    console.error("Error al obtener el triaje:", error);
                    // No usamos navigate(-1) para no "botar" al doctor si no hay triaje registrado.
                    // Simplemente permitimos que la página cargue, indicando que no hay triaje.
                } finally {
                    setIsLoading(false);
                }
            }
            fetchTriaje();
        },
        [idCita, navigate]
    )

    // Triaje de la cita
    const mockTriaje = {
        idTriaje: triaje?.idTriaje,
        fechaHora: triaje?.fechaHora,
        enfermera: triaje?.nombreEnfermera + " " + triaje?.apellidoEnfermera,
        paciente: {
            nombres: triaje?.nombrePaciente,
            apellidos: triaje?.apellidoPaciente,
            sexo: triaje?.sexoPaciente ? "Masculino" : "Femenino" // <--- DATO CLAVE CONDICIONAL
        },
        // Signos Vitales
        peso: triaje?.peso, // kg
        altura: triaje?.altura, // m
        presionArterial: triaje?.presionArterial,
        temperatura: triaje?.temperatura,
        tieneFiebre: triaje?.tieneFiebre,
        // Datos Femeninos (Solo vienen llenos si es mujer)
        fechaUltimaRegla: triaje?.fechaUltimaRegla,
        estaEmbarazada: triaje?.estaEmbarazada,
        semanasGestacion: triaje?.semanasGestacion
    };



    // --- ESTADO DEL FORMULARIO DE INSERCIÓN (Evento Médico) ---
    const [formData, setFormData] = useState({
        tipoEvento: "Consulta Externa", // Valor predeterminado
        descripcion: "",
        diagnostico: "",
        medicamentos: "",
        dieta: "",
        recomendaciones: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!triaje?.idTriaje) {
            console.error("No se encontró el ID del triaje");
            return;
        }
        try {
            await hcEventosService.crearEventoMedico({
                ...formData,
                idTriaje: triaje.idTriaje
            });
            navigate('/DashboardDoctor');
        } catch (error) {
            console.error("Error al crear el evento médico:", error);
        }
    };









    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">

            {/* ENCABEZADO FIJO */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div>
                            <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                                <i className="fa-solid fa-user-doctor text-emerald-600"></i>
                                Registrar Atención Médica
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Paciente: <span className="text-emerald-700 font-bold">{mockTriaje.paciente.apellidos}, {mockTriaje.paciente.nombres}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-emerald-200 shadow-sm">
                        <i className="fa-regular fa-clock"></i> Consulta en curso
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 space-y-6">

                {/* ========================================== */}
                {/* 1. SECCIÓN DE LECTURA: DATOS DEL TRIAJE */}
                {/* ========================================== */}
                <ViewTriaje mockTriaje={mockTriaje} cargando={isLoading} />

                {/* ========================================== */}
                {/* 2. SECCIÓN DE ESCRITURA: EVENTO MÉDICO     */}
                {/* ========================================== */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Anamnesis / Motivo de Consulta */}
                        <Anamensis formData={formData} setFormData={setFormData} />

                        {/* Diagnóstico Clínico */}
                        <Diagnostic formData={formData} setFormData={setFormData} />

                        {/* Plan de Tratamiento (Receta, Dieta, Recomendaciones) */}
                        <MedicalTreatment formData={formData} setFormData={setFormData} />
                    </div>
                </form>
            </main>

            {/* Barra de acción pegajosa inferior */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                <div className="max-w-6xl mx-auto flex justify-end gap-4">
                    <button onClick={() => navigate(-1)} type="button" className="px-6 py-2.5 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                        Cancelar
                    </button>
                    {/* Al darle onClick llama al handleSubmit simulado (en React real el botón Submit va dentro del form, o se referencia) */}
                    <button onClick={handleSubmit} type="submit" className="px-8 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                        <i className="fa-solid fa-floppy-disk"></i> Guardar y Finalizar Atención
                    </button>
                </div>
            </div>
        </div>
    );
};