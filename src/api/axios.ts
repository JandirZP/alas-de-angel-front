
import urlBase from "./urlBase";
const api = urlBase

// 2. Configuramos el "Interceptor" (El guardia de seguridad)
api.interceptors.request.use(
    (config) => {
        // Antes de enviar la petición, buscamos el token
        const token = localStorage.getItem('token');
        
        // 👇 AGREGAR ESTA CONDICIÓN:
        // "Si hay token Y la URL a la que voy NO es la de login..."
        if (token && !config.url?.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;