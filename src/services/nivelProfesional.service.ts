import api from "../api/axios"
import type { NivelProfesional } from "../types/models"

export const NivelProfesionalService = {
    BuscarNivelesActivos: async () => {
        const response = await api.get<NivelProfesional[]>("/nivelprofesionalRest/custom")
        return response.data || []
    }
}