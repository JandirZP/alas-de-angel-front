import api from "../api/axios";
import type { Cita } from "../types/models";

export const citaService = {
    getByPaciente: async (idPaciente: number): Promise<Cita[]> => {
        // Ojo: Si devuelve 204 No Content, axios devuelve data vacío o null
        const response = await api.get<Cita[]>(`/citaRest/porPaciente/${idPaciente}`);
        return response.data || [];
    },

    getAllByPaciente: async (idPaciente: number): Promise<Cita[]> => {
        // Ojo: Si devuelve 204 No Content, axios devuelve data vacío o null
        const response = await api.get<Cita[]>(`/citaRest/allCitasPorPaciente/${idPaciente}`);
        return response.data || [];
    },

    agendarCita: async (citaPayload: any): Promise<Cita> => {
        // Asegúrate de que '/citaRest' es tu ruta para guardar
        const response = await api.post<Cita>('/citaRest', citaPayload);
        return response.data;
    },

    buscarCitasPorFecha: async (fechaInicio: Date, fechaFin: Date): Promise<Cita[]> => {
        const response = await api.get<Cita[]>(`/citaRest/fecha/${fechaInicio}/${fechaFin}`);
        return response.data || [];
    },

    buscarCitasPorDocumento: async (numeroDocumento: string): Promise<Cita[]> => {
        const response = await api.get<Cita[]>(`/citaRest/paciente/documento/${numeroDocumento}`);
        return response.data || [];
    },

    obtenerTodasLasCitas: async (): Promise<Cita[]> => {
        const response = await api.get<Cita[]>(`/citaRest/todas`);
        return response.data || [];
    },

    obtenerCitasPorMedico: async (idMedico: number, fechaHora: string): Promise<Cita[]> => {
        const response = await api.get<Cita[]>(`/citaRest/ocupadas/${idMedico}/${fechaHora}`);
        return response.data || [];
    },

    obtenerTodasLasCitasPorMedico: async (idMedico: number): Promise<Cita[]> => {
        const response = await api.get<Cita[]>(`/citaRest/porMedico/${idMedico}`);
        return response.data || [];
    },

    buscarPorCodigo: async (idCita: number): Promise<Cita> => {
        const response = await api.get<Cita>(`/citaRest/${idCita}`);
        return response.data;
    },

    actualizarCita: async (idCita: number, citaPayload: any): Promise<Cita> => {
        const response = await api.put<Cita>(`/citaRest/${idCita}`, citaPayload);
        return response.data;
    },

    cancelarCita: async (idCita: number): Promise<{ mensaje: string }> => {
        const response = await api.delete<{ mensaje: string }>(`/citaRest/${idCita}`);
        return response.data;
    },

    habilitarCita: async (idCita: number): Promise<{ mensaje: string }> => {
        const response = await api.put<{ mensaje: string }>(`/citaRest/enable/${idCita}`);
        return response.data;
    }
};