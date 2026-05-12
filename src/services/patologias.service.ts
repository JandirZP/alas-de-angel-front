import api from "../api/axios";
import type { AntecedentesPatologicos } from "../types/models";

export const patologiasService = {
    async getPatologiasByHistoria(idHC: number) {
        const response = await api.get<AntecedentesPatologicos[]>(`/antecedentespatoligicosRest/hc/${idHC}`);
        return response.data;
    },
    async addPatologia(patologia: any, idHC: number) {
        const response = await api.post<AntecedentesPatologicos>(`/antecedentespatoligicosRest/${idHC}`, patologia);
        return response.data;
    },
    async updatePatologia(patologia: any, idHC: number, idPatologia: number) {
        const response = await api.put<AntecedentesPatologicos>(`/antecedentespatoligicosRest/${idHC}/${idPatologia}`, patologia);
        return response.data;
    },
    async deletePatologia(idPatologia: number) {
        await api.delete(`/antecedentespatoligicosRest/${idPatologia}`);
    }
};