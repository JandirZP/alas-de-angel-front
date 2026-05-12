
import type { LoginRequestDto, LoginResponseDto } from '../types/models';
import urlBase from '../api/urlBase';

export const authService = {  
    login: async (loginData: LoginRequestDto): Promise<LoginResponseDto> => {
        const response = await urlBase.post<LoginResponseDto>(
            '/usuarioRest/login',
            loginData
        );

        return response.data;
    },

    // 👇 AGREGAMOS ESTA FUNCIÓN
    logout: () => {
        // 1. Borramos la "llave" del bolsillo
        localStorage.removeItem("token");
        
        // 2. Redirigimos al inicio (Login)
        // Usamos window.location para asegurar que se limpie cualquier estado en memoria de React
        window.location.href = "/"; 
    }
}