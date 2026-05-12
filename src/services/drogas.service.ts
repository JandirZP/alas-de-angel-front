import api from "../api/axios";
import type { HistorialDrogas } from "../types/models";

export const drogasService = {
    async getDrogasByHistoria(idHC: number) {
        const response = await api.get<HistorialDrogas[]>(`/historialdrogasRest/hc/${idHC}`);
        return response.data;
    },
    async addDroga(droga: any, idHC: number) {
        const response = await api.post<HistorialDrogas>(`/historialdrogasRest/${idHC}`, droga);
        return response.data;
    },
    async updateDroga(droga: any, idHC: number, idDrogas: number) {
        const response = await api.put<HistorialDrogas>(`/historialdrogasRest/${idHC}/${idDrogas}`, droga);
        return response.data;
    },
    async deleteDroga(idDrogas: number) {
        await api.delete(`/historialdrogasRest/${idDrogas}`);
    }
};