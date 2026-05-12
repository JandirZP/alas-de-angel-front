import api from "../api/axios";
import type { Ubigeo } from "../types/models";

export const ubigeoService = {
  
  // 1. Obtener lista de departamentos (Strings únicos)
  async getDepartamentos(): Promise<string[]> {
    const response = await api.get<string[]>("/ubigeoRest/departamentos");
    return response.data;
  },

  // 2. Obtener lista de provincias dado un departamento
  async getProvincias(departamento: string): Promise<string[]> {
    const response = await api.get<string[]>(`/ubigeoRest/provincias/${departamento}`);
    return response.data;
  },

  // 3. Obtener lista de objetos Ubigeo (Distritos) dado Dep y Prov
  async getDistritos(departamento: string, provincia: string): Promise<Ubigeo[]> {
    const response = await api.get<Ubigeo[]>(`/ubigeoRest/distritos/${departamento}/${provincia}`);
    return response.data;
  }
};