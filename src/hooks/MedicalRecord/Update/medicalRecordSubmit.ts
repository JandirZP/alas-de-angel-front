import { hcEventosService } from "../../../services/hcEventos.service";
import { alergiasService } from "../../../services/alergias.service";
import { patologiasService } from "../../../services/patologias.service";
import { cirugiasService } from "../../../services/cirugias.service";
import { drogasService } from "../../../services/drogas.service";
import type { Alergias, AntecedentesPatologicos, AntecedentesQuirurgicos, HistorialDrogas } from "../../../types/models";
import type { InitialMedicalRecordData } from "./useMedicalRecordFetch";

/**
 * Orquestador o Manager Puro de TypeScript.
 * Recibe todas las colecciones nuevas y la información inicial base para iterarlas y 
 * deducir QUÉ SE BORRÓ, QUÉ ES NUEVO y QUÉ SE ACTUALIZÓ.
 */
export const submitMedicalRecordManager = async (
    numericId: number,
    baseData: any,
    originalData: InitialMedicalRecordData,
    currentLists: {
        alergias: Alergias[],
        patologias: AntecedentesPatologicos[],
        quirurgicos: AntecedentesQuirurgicos[],
        drogas: HistorialDrogas[]
    }
): Promise<void> => {

    // 1. Guardar la Historia Clínica Base (Campos simples)
    const fullFormData = {
        ...baseData,
        alergias: currentLists.alergias,
        patologias: currentLists.patologias,
        quirurgicos: currentLists.quirurgicos,
        drogas: currentLists.drogas
    };
    await hcEventosService.updateHistoria(numericId, fullFormData);

    // 2. Procesar Alergias
    const alergiasBorradas = originalData.alergias.filter(orig => !currentLists.alergias.some(curr => curr.id === orig.id));
    const alergiasPromesas = [
        ...alergiasBorradas.map(a => alergiasService.deleteAlergia(a.id!)),
        ...currentLists.alergias.filter(a => a.id! < 0).map(a => {
            const { id, historiaClinicaId, ...payload } = a;
            return alergiasService.addAlergia({
                ...payload,
                observaciones: payload.observaciones === "" ? null : payload.observaciones
            }, numericId);
        }),
        ...currentLists.alergias.filter(a => a.id! > 0 && !alergiasBorradas.includes(a)).map(a => alergiasService.updateAlergia({
            ...a,
            observaciones: a.observaciones === "" ? null : a.observaciones
        }, numericId, a.id!))
    ];

    // 3. Procesar Patologías
    const patologiasBorradas = originalData.patologias.filter(orig => !currentLists.patologias.some(curr => curr.id === orig.id));
    const patologiasPromesas = [
        ...patologiasBorradas.map(p => patologiasService.deletePatologia(p.id!)),
        ...currentLists.patologias.filter(p => p.id! < 0).map(p => {
            const { id, historiaClinicaId, ...payload } = p;
            return patologiasService.addPatologia({
                ...payload,
                fechaDiagnostico: payload.fechaDiagnostico === "" ? null : payload.fechaDiagnostico,
                observaciones: payload.observaciones === "" ? null : payload.observaciones
            }, numericId);
        }),
        ...currentLists.patologias.filter(p => p.id! > 0 && !patologiasBorradas.includes(p)).map(p => patologiasService.updatePatologia({
            ...p,
            fechaDiagnostico: p.fechaDiagnostico === "" ? null : p.fechaDiagnostico,
            observaciones: p.observaciones === "" ? null : p.observaciones
        }, numericId, p.id!))
    ];

    // 4. Procesar Quirúrgicos
    const quirurgicosBorrados = originalData.quirurgicos.filter(orig => !currentLists.quirurgicos.some(curr => curr.id === orig.id));
    const quirurgicosPromesas = [
        ...quirurgicosBorrados.map(q => cirugiasService.deleteCirugia(q.id!)),
        ...currentLists.quirurgicos.filter(q => q.id! < 0).map(q => {
            const { id, historiaClinicaId, ...payload } = q;
            return cirugiasService.addCirugia({
                ...payload,
                fecha: payload.fecha === "" ? null : payload.fecha,
                observaciones: payload.observaciones === "" ? null : payload.observaciones
            }, numericId);
        }),
        ...currentLists.quirurgicos.filter(q => q.id! > 0 && !quirurgicosBorrados.includes(q)).map(q => cirugiasService.updateCirugia({
            ...q,
            fecha: q.fecha === "" ? null : q.fecha,
            observaciones: q.observaciones === "" ? null : q.observaciones
        }, numericId, q.id!))
    ];

    // 5. Procesar Drogas
    const drogasBorradas = originalData.drogas.filter(orig => !currentLists.drogas.some(curr => curr.id === orig.id));
    const drogasPromesas = [
        ...drogasBorradas.map(d => drogasService.deleteDroga(d.id!)),
        ...currentLists.drogas.filter(d => d.id! < 0).map(d => {
            const { id, historiaClinicaId, ...payload } = d;
            return drogasService.addDroga({
                ...payload,
                observaciones: payload.observaciones === "" ? null : payload.observaciones
            }, numericId);
        }),
        ...currentLists.drogas.filter(d => d.id! > 0 && !drogasBorradas.includes(d)).map(d => drogasService.updateDroga({
            ...d,
            observaciones: d.observaciones === "" ? null : d.observaciones
        }, numericId, d.id!))
    ];

    // 6. Ejecutar todo simultáneamente
    await Promise.all([
        ...alergiasPromesas,
        ...patologiasPromesas,
        ...quirurgicosPromesas,
        ...drogasPromesas
    ]);
};