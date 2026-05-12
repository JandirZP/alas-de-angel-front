import api from "../api/axios";
import type { HistoriaClinica, Tratamiento } from "../types/models";

export const hcEventosService = {

  /**
   * Obtiene el último tratamiento médico registrado.
   * Retorna null si el backend responde 204 (No Content).
   */
  async getUltimoTratamiento(idPaciente: number): Promise<Tratamiento | null> {
    try {
      const response = await api.get<Tratamiento>(`/historiaclinicaRest/ultimo-tratamiento/${idPaciente}`);

      if (response.status === 204) {
        return null;
      }

      return response.data;

    } catch (error) {
      console.error("Error en hcEventosService.getUltimoTratamiento:", error);
      throw error;
    }
  },

  async getHistoriasActivas(): Promise<HistoriaClinica[]> {
    try {
      const response = await api.get<HistoriaClinica[]>(`/historiaclinicaRest/custom`);
      if (response.status === 204) {
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.getHistoriasActivas:", error);
      throw error;
    }
  },

  async getHistoriaPorDocumento(documento: string): Promise<HistoriaClinica | null> {
    try {
      const response = await api.get<HistoriaClinica>(`/historiaclinicaRest/documento/${documento}`);
      if (response.status === 204) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.getHistoriaPorDocumento:", error);
      throw error; // Let the component handle it
    }
  },

  async getHistoriaPorId(id: number): Promise<HistoriaClinica | null> {
    try {
      const response = await api.get<HistoriaClinica>(`/historiaclinicaRest/dto/${id}`);
      if (response.status === 204) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.getHistoriaPorId:", error);
      throw error;
    }
  },

  async getHistoriaPorIdPaciente(idPaciente: number): Promise<HistoriaClinica | null> {
    try {
      const response = await api.get<HistoriaClinica>(`/historiaclinicaRest/paciente/${idPaciente}`);
      if (response.status === 204) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.getHistoriaPorIdPaciente:", error);
      throw error;
    }
  },

  async addHistoriaClinica(historiaClinicaPayload: Omit<HistoriaClinica, 'idPaciente' | 'nombresPaciente' | 'apellidoPaternoPaciente' | 'apellidoMaternoPaciente' | 'numeroDocumento' | 'tipoDocumento' | 'sexoPaciente' | 'alergias' | 'antecedentesPatologicos' | 'antecedentesQuirurgicos'> & { pacienteEntity: { idUsuario: number } }): Promise<HistoriaClinica> {
    try {
      const response = await api.post<HistoriaClinica>(`/historiaclinicaRest`, historiaClinicaPayload);
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.addHistoriaClinica:", error);
      throw error;
    }
  },

  async updateHistoria(idHC: number, historiaClinicaPayload: any): Promise<HistoriaClinica> {
    try {
      const response = await api.put<HistoriaClinica>(`/historiaclinicaRest/${idHC}`, historiaClinicaPayload);
      return response.data;
    } catch (error) {
      console.error("Error en hcEventosService.updateHistoria:", error);
      throw error;
    }
  },


  async crearEventoMedico(formData: any): Promise<any> {
    try {
      // Necesitamos pre-procesar el formData para que el backend Spring lo entienda
      // El backend espera que idTriaje venga dentro del objeto "triaje", ya que así está en la entidad.
      const payload = {
        tipoEvento: formData.tipoEvento || 'Consulta Externa', // Asignar uno por defecto si el form no lo tiene
        descripcion: formData.descripcion,
        diagnostico: formData.diagnostico,
        medicamentos: formData.medicamentos,
        dieta: formData.dieta,
        recomendaciones: formData.recomendaciones,
        triaje: {
            idTriaje: formData.idTriaje
        }
      };

      const response = await api.post(`/eventosmedicosRest`, payload);
      return response.data;
    } catch (error) {
      console.error("Error en crearEventoMedico:", error);
      throw error;
    }
  },

};