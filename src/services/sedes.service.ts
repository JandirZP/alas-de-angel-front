import api from "../api/axios";
import type { Sedes } from "../types/models";

export const sedesService = {
    async getSedes() {
        const response = await api.get<Sedes[]>('/api/sedes/activos');
        return response.data || [];
    }
};