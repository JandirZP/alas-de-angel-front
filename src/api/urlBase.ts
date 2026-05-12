import axios from 'axios';

// Usamos una variable de entorno de Vite. 
// Si no existe, por defecto usará el localhost para que no se rompa nada localmente.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/gestionPacientes';

const urlBase = axios.create({
    baseURL: API_URL
});

export default urlBase;