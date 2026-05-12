import { useState, useEffect, useCallback } from "react";
import { decodeId } from "../../../utils/hashids";
import { hcEventosService } from "../../../services/hcEventos.service";
import { alergiasService } from "../../../services/alergias.service";
import { patologiasService } from "../../../services/patologias.service";
import { cirugiasService } from "../../../services/cirugias.service";
import { drogasService } from "../../../services/drogas.service";
import type { Alergias, AntecedentesPatologicos, AntecedentesQuirurgicos, HistorialDrogas } from "../../../types/models";

export interface InitialMedicalRecordData {
    historia: any;
    alergias: Alergias[];
    patologias: AntecedentesPatologicos[];
    quirurgicos: AntecedentesQuirurgicos[];
    drogas: HistorialDrogas[];
}

/**
 * Hook encargado ÚNICAMENTE de traer toda la información inicial (GET)
 * desde los 5 endpoints diferentes al cargar la pantalla.
 */
export const useMedicalRecordFetch = (encodedId: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<InitialMedicalRecordData | null>(null);
    const [numericId, setNumericId] = useState<number | null>(null);

    const fetchAllData = useCallback(async () => {
        if (!encodedId) return;
        try {
            setLoading(true);
            setError(null);
            const decoded = decodeId(encodedId);
            if (!decoded) {
                setError("Hash inválido en la URL");
                return;
            }
            setNumericId(decoded);

            // Fetch de todo concurrentemente (Promise.all) para mayor velocidad 🚀
            const [historia, alergiasList, patologiasList, quirurgicosList, drogasList] = await Promise.all([
                hcEventosService.getHistoriaPorId(decoded),
                alergiasService.getAlergiasByHistoria(decoded),
                patologiasService.getPatologiasByHistoria(decoded),
                cirugiasService.getCirugiasByHistoria(decoded),
                drogasService.getDrogasByHistoria(decoded)
            ]);

            setInitialData({
                historia,
                alergias: alergiasList,
                patologias: patologiasList,
                quirurgicos: quirurgicosList,
                drogas: drogasList
            });
        } catch (err) {
            console.error("Error al cargar datos:", err);
            setError("Error al cargar la historia clínica");
        } finally {
            setLoading(false);
        }
    }, [encodedId]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return { loading, error, initialData, numericId, reload: fetchAllData };
};