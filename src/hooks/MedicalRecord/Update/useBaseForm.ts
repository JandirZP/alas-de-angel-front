import { useState, useEffect } from "react";

/**
 * Hook para manejar exclusivamente los datos estáticos/base 
 * del formulario y el map de las propiedades básicas (Inputs de texto, Checkboxes).
 */
export const useBaseForm = (historiaParaEditar: any) => {
    const [baseData, setBaseData] = useState<any>({
        codigo: "",
        paciente: { nombres: "", apellidos: "", sexo: "" },
        grupoSanguineo: "", factorRH: "",
        antecedentesFamiliares: false, especifiqueAnteFamil: "",
        estadoAlcohol: "0", frecuenciaAlcohol: "",
        estadoTabaco: "0", frecuenciaTabaco: "",
        consumeDrogas: false,
        sexualmenteActivo: false, edadInicioSexual: "", usaMetodoAnticonceptivo: false, metodoPlanificacion: "",
        tuvoEmbarazos: false, cantidadGestaciones: 0, cantidadPartos: 0, cantidadAbortos: 0, huboComplicacionesParto: false, especifiqueComplicaciones: ""
    });

    useEffect(() => {
        if (historiaParaEditar) {
            setBaseData((prev: any) => ({
                ...prev,
                codigo: historiaParaEditar.idHC || "",
                paciente: {
                    nombres: historiaParaEditar.nombresPaciente || "",
                    apellidos: `${historiaParaEditar.apellidoPaternoPaciente || ""} ${historiaParaEditar.apellidoMaternoPaciente || ""}`,
                    sexo: historiaParaEditar.sexoPaciente === true ? "Masculino" : "Femenino"
                },
                grupoSanguineo: historiaParaEditar.grupoSanquineo || "",
                factorRH: historiaParaEditar.factorRH || "",
                antecedentesFamiliares: historiaParaEditar.antecedentesFamiliares || false,
                especifiqueAnteFamil: historiaParaEditar.especifiqueAnteFamil || "",
                estadoAlcohol: historiaParaEditar.estadoAlcohol?.toString() || "0",
                frecuenciaAlcohol: historiaParaEditar.frecuenciaAlcohol || "",
                estadoTabaco: historiaParaEditar.estadoTabaco?.toString() || "0",
                frecuenciaTabaco: historiaParaEditar.frecuenciaTabaco || "",
                consumeDrogas: historiaParaEditar.consumeDrogas || false,
                sexualmenteActivo: historiaParaEditar.sexualmenteActivo || false,
                edadInicioSexual: historiaParaEditar.edadInicioSexual || "",
                usaMetodoAnticonceptivo: historiaParaEditar.usaMetodoAnticonceptivo || false,
                metodoPlanificacion: historiaParaEditar.metodoPlanificacion || "",
                tuvoEmbarazos: historiaParaEditar.tuvoEmbarazos || false,
                cantidadGestaciones: historiaParaEditar.cantidadGestaciones || 0,
                cantidadPartos: historiaParaEditar.cantidadPartos || 0,
                cantidadAbortos: historiaParaEditar.cantidadAbortos || 0,
                huboComplicacionesParto: historiaParaEditar.huboComplicaciones || false,
                especifiqueComplicaciones: historiaParaEditar.especifiqueComplicaciones || ""
            }));
        }
    }, [historiaParaEditar]);

    // Función genérica para manejar los onChange de Inputs y Selects normales
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setBaseData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return { baseData, setBaseData, handleChange };
};