import api from "../api/axios";

export const triajeService = {

    guardarTriaje: async (triajePayload: any) => {
        const response = await api.post<any>("/triajeRest", triajePayload);
        return response.data;
    },

    buscarPorCita: async (idCita: number) => {
        const response = await api.get<any>(`/triajeRest/buscarPorCita/${idCita}`);
        return response.data;
    }



}