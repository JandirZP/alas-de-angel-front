import { useState } from "react";
import { usuarioService } from "../../../../services/usuario.service";
import { hcEventosService } from "../../../../services/hcEventos.service";
import { useNavigate } from "react-router-dom";
import type { Alergias, AntecedentesPatologicos, AntecedentesQuirurgicos, HistorialDrogas } from "../../../../types/models";

export const useInsertMedicalRecord = () => {
    // --- ESTADOS DE BÚSQUEDA ---
    const [searchQuery, setSearchQuery] = useState("");
    const [searchStatus, setSearchStatus] = useState<"idle" | "searching" | "found" | "not_found" | "foundButHCDone">("idle");
    const [patientData, setPatientData] = useState<any>(null);


    // --- ESTADOS DEL FORMULARIO DE HISTORIA CLÍNICA ---
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // 1. Datos Biológicos Básicos
    const [grupoSanguineo, setGrupoSanguineo] = useState<string>("A");
    const [factorRH, setFactorRH] = useState<string>("+");

    // 2. Antecedentes Hereditarios
    const [tieneAntecedentesFamiliares, setTieneAntecedentesFamiliares] = useState<boolean>(true);
    const [especifiqueAnteFamil, setEspecifiqueAnteFamil] = useState<string>("");

    // 3. Hábitos y Estilo de Vida
    const [estadoAlcohol, setEstadoAlcohol] = useState<number>(0);
    const [frecuenciaAlcohol, setFrecuenciaAlcohol] = useState<string>("");
    const [estadoTabaco, setEstadoTabaco] = useState<number>(0);
    const [frecuenciaTabaco, setFrecuenciaTabaco] = useState<string>("");
    const [consumeDrogas, setConsumeDrogas] = useState<boolean>(false);

    // 4. Sexualidad y Gineco-Obstétrico
    const [esActivoSexualmente, setEsActivoSexualmente] = useState<boolean>(false);
    const [edadInicioSexual, setEdadInicioSexual] = useState<number | ''>('');
    const [usaMetodoAnticonceptivo, setUsaMetodoAnticonceptivo] = useState<number>(0);
    const [metodoPlanificacion, setMetodoPlanificacion] = useState<string>("");

    const [tuvoEmbarazos, setTuvoEmbarazos] = useState<boolean>(false);
    const [cantidadGestaciones, setCantidadGestaciones] = useState<number>(0);
    const [cantidadPartos, setCantidadPartos] = useState<number>(0);
    const [cantidadAbortos, setCantidadAbortos] = useState<number>(0);
    const [huboComplicaciones, setHuboComplicaciones] = useState<boolean>(false);
    const [especifiqueComplicaciones, setEspecifiqueComplicaciones] = useState<string>("");

    // 5. Alergias
    const [alergiasList, setAlergiasList] = useState<Alergias[]>([]);

    // 6. Antecedentes Patologicos
    const [antecedentesPatologicosList, setAntecedentesPatologicosList] = useState<AntecedentesPatologicos[]>([]);

    // 7. Antecedentes Quirurgicos
    const [antecedentesQuirurgicosList, setAntecedentesQuirurgicosList] = useState<AntecedentesQuirurgicos[]>([]);

    // 8. Drogas
    const [drogasList, setDrogasList] = useState<HistorialDrogas[]>([]);

    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchStatus("searching");
        try {
            const paciente = await usuarioService.getPacientePorDocumento(searchQuery);

            if (paciente) {
                // Verificamos si la propiedad viene en true desde el backend (agregado en el DTO)
                if ((paciente as any).tieneHistoriaClinica === true) {
                    setPatientData(null);
                    setSearchStatus("foundButHCDone");
                } else {
                    setPatientData(paciente);
                    setSearchStatus("found");
                }
            } else {
                setPatientData(null);
                setSearchStatus("not_found");
            }
        } catch (error) {
            console.error("Error al buscar paciente:", error);
            setSearchStatus("not_found");
        }
    };

    const handleResetSearch = () => {
        setSearchStatus("idle");
        setSearchQuery("");
        setPatientData(null);
        setSaveMessage(null);
    };

    const handleSave = async () => {
        if (!patientData) return;
        setIsSaving(true);
        setSaveMessage(null);

        const payload: any = {
            pacienteEntity: {
                idUsuario: patientData.idUsuario
            },
            grupoSanguineo,
            factorRH,
            antecedentesFamiliares: tieneAntecedentesFamiliares,
            especifiqueAnteFamil: tieneAntecedentesFamiliares && especifiqueAnteFamil.trim() !== "" ? especifiqueAnteFamil : null,
            estadoAlcohol,
            frecuenciaAlcohol: estadoAlcohol !== 0 && frecuenciaAlcohol.trim() !== "" ? frecuenciaAlcohol : null,
            estadoTabaco,
            frecuenciaTabaco: estadoTabaco !== 0 && frecuenciaTabaco.trim() !== "" ? frecuenciaTabaco : null,
            consumeDrogas,
            sexualmenteActivo: esActivoSexualmente,
            edadInicioSexual: esActivoSexualmente && edadInicioSexual !== '' ? Number(edadInicioSexual) : null,
            usaMetodoAnticonceptivo: esActivoSexualmente ? (usaMetodoAnticonceptivo === 1) : null,
            metodoPlanificacion: esActivoSexualmente && usaMetodoAnticonceptivo === 1 && metodoPlanificacion.trim() !== "" ? metodoPlanificacion : null,
            tuvoEmbarazos,
            cantidadGestaciones: tuvoEmbarazos ? cantidadGestaciones : null,
            cantidadPartos: tuvoEmbarazos ? cantidadPartos : null,
            cantidadAbortos: tuvoEmbarazos ? cantidadAbortos : null,
            huboComplicacionesParto: tuvoEmbarazos ? huboComplicaciones : null,
            especifiqueComplicaciones: tuvoEmbarazos && huboComplicaciones && especifiqueComplicaciones.trim() !== "" ? especifiqueComplicaciones : null,
            alergias: alergiasList.map(a => ({
                idAlergia: a.id,
                alergeno: a.alergeno,
                reaccion: a.reaccion,
                observaciones: a.observaciones
            })),
            enfermedadeCronicas: antecedentesPatologicosList.map(p => ({
                idPatologia: p.id,
                nombreEnfermedad: p.nombre,
                fechaDiagnostico: p.fechaDiagnostico ? p.fechaDiagnostico : null,
                estaEnTratamiento: p.enTratamiento,
                observaciones: p.observaciones
            })),
            cirugiasPrevias: antecedentesQuirurgicosList.map(q => ({
                idOperacion: q.id,
                nombreOperacion: q.nombre,
                fechaOperacion: q.fecha ? q.fecha : null,
                huboComplicaciones: q.huboComplicaciones,
                observaciones: q.observaciones
            })),
            drogas: drogasList.map(d => ({
                idDrogas: d.id,
                nombreDroga: d.nombreDroga,
                frecuencia: d.frecuencia,
                observaciones: d.observaciones
            }))
        };

        try {
            await hcEventosService.addHistoriaClinica(payload);
            setSaveMessage({ type: 'success', text: 'Historia Clínica guardada exitosamente. Redirigiendo...' });
            setTimeout(() => {
                navigate(`/DashboardNurse`, { state: { view: "medicalrecord" } });
            }, 2000);
        } catch (error) {
            console.error("Error al guardar HC:", error);
            setSaveMessage({ type: 'error', text: 'Ocurrió un error al guardar. Verifique la conexión o el backend.' });
        } finally {
            setIsSaving(false);
        }
    };

    return {
        // Busqueda
        searchQuery, setSearchQuery,
        searchStatus,
        patientData,
        handleSearch,
        handleResetSearch,

        // Save
        isSaving,
        saveMessage,
        handleSave,

        // Biologicos
        grupoSanguineo, setGrupoSanguineo,
        factorRH, setFactorRH,

        // Hereditarios
        tieneAntecedentesFamiliares, setTieneAntecedentesFamiliares,
        especifiqueAnteFamil, setEspecifiqueAnteFamil,

        // Habitos
        estadoAlcohol, setEstadoAlcohol,
        frecuenciaAlcohol, setFrecuenciaAlcohol,
        estadoTabaco, setEstadoTabaco,
        frecuenciaTabaco, setFrecuenciaTabaco,
        consumeDrogas, setConsumeDrogas,

        // Sexualidad y Gineco
        esActivoSexualmente, setEsActivoSexualmente,
        edadInicioSexual, setEdadInicioSexual,
        usaMetodoAnticonceptivo, setUsaMetodoAnticonceptivo,
        metodoPlanificacion, setMetodoPlanificacion,
        tuvoEmbarazos, setTuvoEmbarazos,
        cantidadGestaciones, setCantidadGestaciones,
        cantidadPartos, setCantidadPartos,
        cantidadAbortos, setCantidadAbortos,
        huboComplicaciones, setHuboComplicaciones,
        especifiqueComplicaciones, setEspecifiqueComplicaciones,

        // Alergias
        alergiasList, setAlergiasList,

        // Antecedentes Patologicos
        antecedentesPatologicosList, setAntecedentesPatologicosList,

        // Antecedentes Quirurgicos
        antecedentesQuirurgicosList, setAntecedentesQuirurgicosList,

        // Drogas
        drogasList, setDrogasList
    };
};
