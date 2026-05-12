import api from "../api/axios";
import type { Especialidad, Usuario } from "../types/models";

/**
 * RECOMENDACIÓN:
 * Usamos 'Usuario' para la aplicación, pero definimos 
 * lo que la API espera para actualizar el perfil.
 */
interface PerfilPayload {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    numeroDocumento: string;
    sexo: boolean;
    paisOrigen: string;
    correo: string;
    celular: string;
    contactoEmergencia: string;
    celularContacto: string;
    direccion: string;
    idUbigeo: number; // La clave del éxito 🔑
    fotoUrl: string;  // La que agregamos recién
}

export const usuarioService = {

    // Obtener perfil: Sigue usando tu interfaz Usuario completa
    getPerfil: async (): Promise<Usuario> => {
        const response = await api.get<Usuario>('/usuarioRest/perfil');
        return response.data;
    },

    // Actualizar perfil: Recibe el Usuario completo de tu estado de React
    updatePerfil: async (usuario: Usuario): Promise<Usuario> => {

        // Mapeamos los datos al formato que el Backend (DTO) entiende
        const payload: PerfilPayload = {
            nombres: usuario.nombres,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
            fechaNacimiento: usuario.fechaNacimiento,
            numeroDocumento: usuario.numeroDocumento,
            sexo: usuario.sexo,
            paisOrigen: usuario.paisOrigen,
            correo: usuario.correo,
            celular: usuario.celular,
            contactoEmergencia: usuario.contactoEmergencia,
            celularContacto: usuario.celularContacto,
            direccion: usuario.direccion,
            fotoUrl: usuario.fotoUrl,
            // Aquí está la diferencia: convertimos el objeto en un simple ID
            idUbigeo: usuario.ubigeoEntity?.idUbigeo || 0
        };

        // Enviamos el payload limpio al endpoint
        const response = await api.put<Usuario>(`/usuarioRest/perfil/${usuario.idUsuario}`, payload);
        return response.data;
    },

    // [EXPLICACIÓN ACTUALIZACIÓN]
    // Esta función invoca a nuestro endpoint del backend específico para guardar la tabla Medico_Especialidad.
    // Recibe como payload el array de objetos 'Especialidad' completos que en tu backend se leerá automático como una List de 'EspecialidadesDto'.
    updateEspecialidades: async (idUsuario: number, especialidades: Especialidad[]): Promise<Especialidad[]> => {
        const response = await api.put<Especialidad[]>(`/usuarioRest/${idUsuario}/especialidades`, especialidades);
        return response.data;
    },

    // Subir foto
    subirFoto: async (idUsuario: number, archivo: File): Promise<{ mensaje: string, url: string }> => {
        const formData = new FormData();
        formData.append("file", archivo);
        const response = await api.post<{ mensaje: string, url: string }>(
            `/usuarioRest/upload/${idUsuario}`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    },

    getMedicosPorEspecialidad: async (codigoEspecialidad: number): Promise<Usuario[]> => {
        const response = await api.get<Usuario[]>(`/usuarioRest/medicos/especialidad/${codigoEspecialidad}`);
        return response.data;
    },

    getEspecialidadesPorMedico: async (idUsuario: number): Promise<Especialidad[]> => {
        const response = await api.get<Especialidad[]>(`/especialidad/buscarPorMedico/${idUsuario}`);
        return response.data;
    },

    getEspecialidades: async (): Promise<Especialidad[]> => {
        const response = await api.get<Especialidad[]>('/especialidad/custom');
        return response.data;
    },

    getPacientePorDocumento: async (documento: string): Promise<Usuario | null> => {
        const response = await api.get<Usuario>(`/usuarioRest/paciente/documento/${documento}`);
        return response.data;
    },

    getUsuariosActivosPorRol: async (nombreRol: string): Promise<Usuario[]> => {
        const response = await api.get<Usuario[]>(`/usuarioRest/por-rol-activo/${nombreRol}`);
        return response.data;
    },

    // Registrar nuevo paciente
    registrarPaciente: async (payload: any): Promise<Usuario> => {
        const response = await api.post<Usuario>('/usuarioRest/pacientes/registro', payload);
        return response.data;
    }
};