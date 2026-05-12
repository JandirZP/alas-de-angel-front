import { useState } from "react";
import { toast } from "sonner";
import { ToastError, ToastLoading, ToastSuccess } from "../../../layouts/Toast";
import type { LoginRequestDto } from "../../../types/models";
import { authService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";


export const LoginColaborador = () => {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        //Un pequeño feedback visual de "Cargando..."
        const toastId = toast.loading(

            <ToastLoading title="Validando..." subtitle="Consultando al servidor" />,
            { duration: Infinity, icon: null }


        );
        const LoginRequest: LoginRequestDto = {
            correo,
            password
        }

        try {
            const data = await authService.login(LoginRequest)



            const esMedico = data.roles.includes("MEDICO") || data.roles.includes("Médico");
            const esEnfermera = data.roles.includes("ENFERMERA") || data.roles.includes("Enfermera");
            const esPersonalLimpieza = data.roles.includes("PERSONAL_LIMPIEZA") || data.roles.includes("Personal_de_Limpieza");
            const esAdministrador = data.roles.includes("ADMINISTRADOR") || data.roles.includes("Administrador");

            if (!esMedico && !esEnfermera && !esPersonalLimpieza && !esAdministrador) {

                throw new Error("ROLE_MISMATCH");
            }


            console.log("Respuesta del servidor: ", data);

            localStorage.setItem("token", data.token);



            toast.success(


                <ToastSuccess
                    title="¡Bienvenido!"
                    subtitle="Sesión iniciada correctamente"
                />,
                { id: toastId, icon: null, duration: 4000 }

            );

            if (esMedico) {
                navigate("/DashboardDoctor");
            } else if (esEnfermera) {
                navigate("/DashboardNurse");
            } else if (esPersonalLimpieza) {
                navigate("/DashboardLimpieza");
            } else if (esAdministrador) {
                navigate("/DashboardAdministrador");
            }



        } catch (error: any) {
            //Manejo de errores
            console.error("Error login:", error);

            // Manejo específico para cuando el rol no coincide
            if (error.message === "ROLE_MISMATCH") {
                toast.error(
                    <ToastError
                        title="Acceso Restringido"
                        subtitle="Este espacio no es para ti, accede por el login de Paciente."
                        iconType="lock"
                    />,
                    { id: toastId, icon: null, duration: 4000 }
                );
                return; // Cortamos ejecución
            }

            //Axios guarda la respuesta del servidor en error.response
            if (error.response && error.response.status === 403 || error.response.status === 401 || error.response.status === 404) {
                toast.error(

                    <ToastError
                        title="Acceso Denegado"
                        subtitle="Credenciales incorrectas o usuario inexistente"
                        iconType="lock"
                    />,
                    { id: toastId, icon: null, duration: 4000 }



                );
            } else if (error.code === "ERR_NETWORK") {
                toast.error(

                    <ToastError
                        title="Error de conexión"
                        subtitle="No se pudo contactar al servidor"
                        iconType="wifi"
                    />,
                    { id: toastId, icon: null, duration: 4000 }



                );

            } else {
                toast.error('Ocurrio un error inesperado', {
                    id: toastId,
                    duration: 4000
                });
            }

        }

    }

    return (
        // ESTRATEGIA: Igual que tus otros componentes.
        // 1. w-fit: La caja mide lo que ocupa su contenido.
        // 2. mx-auto: Se centra horizontalmente.
        // 3. mt-10: Un poco de margen arriba para que no se pegue al techo (opcional).
        <div className="w-fit mx-auto mt-10">

            <div className="bg-white rounded-xl shadow-lg p-12 w-96">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    Acceso Colaboradores
                </h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-emerald-600 mb-1">
                            Email Corporativo
                        </label>
                        <input
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="usuario@clinica.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-emerald-600 mb-1">
                            Contraseña
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                            ¿Problemas?
                        </a>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Ingresar al Portal
                    </button>
                </form>
            </div>
        </div>
    );
};