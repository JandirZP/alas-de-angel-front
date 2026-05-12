
import api from "../api/axios";
import type { Alergias } from "../types/models";



export const alergiasService = {
    async getAlergiasByHistoria(idHC: number) {
        const response = await api.get<Alergias[]>(`/alergiasRest/historia/${idHC}`);
        return response.data;
    },
    async addAlergia(alergia: any, idHC: number) {
        const response = await api.post<Alergias>(`/alergiasRest/${idHC}`, alergia);
        return response.data;
    },
    async updateAlergia(alergia: any, idHC: number, idAlergia: number) {
        const response = await api.put<Alergias>(`/alergiasRest/${idHC}/${idAlergia}`, alergia);
        return response.data;
    },
    async deleteAlergia(idAlergia: number) {
        await api.delete(`/alergiasRest/${idAlergia}`);
    }
}