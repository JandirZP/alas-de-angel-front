import api from "../api/axios";
import type { AntecedentesQuirurgicos } from "../types/models";

export const cirugiasService = {
    async getCirugiasByHistoria(idHC: number) {
        const response = await api.get<AntecedentesQuirurgicos[]>(`/antecedentesquirurgicosRest/hc/${idHC}`);
        return response.data;
    },
    async addCirugia(cirugia: any, idHC: number) {
        const response = await api.post<AntecedentesQuirurgicos>(`/antecedentesquirurgicosRest/${idHC}`, cirugia);
        return response.data;
    },
    async updateCirugia(cirugia: any, idHC: number, idOperacion: number) {
        const response = await api.put<AntecedentesQuirurgicos>(`/antecedentesquirurgicosRest/${idHC}/${idOperacion}`, cirugia);
        return response.data;
    },
    async deleteCirugia(idOperacion: number) {
        await api.delete(`/antecedentesquirurgicosRest/${idOperacion}`);
    }
};