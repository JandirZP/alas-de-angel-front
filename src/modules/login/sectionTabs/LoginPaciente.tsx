
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginRequestDto } from "../../../types/models";
import { authService } from "../../../services/auth.service";
import { toast } from "sonner";
import { ToastError, ToastLoading, ToastSuccess } from "../../../layouts/Toast";
export const LoginPaciente = ({
  onIrARegistro,
}: {
  onIrARegistro: () => void;
}) => {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    //Un pequeño feedback visual de "Cragando..."
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

      // --- VALIDACIÓN DE ROL ---
      // Verificamos si el usuario tiene el rol 'PACIENTE' (o como lo hayas guardado en BD)
      // OJO: Asegúrate de escribir el rol EXACTAMENTE como está en tu base de datos (mayúsculas/minúsculas)

      const esPaciente = data.roles.includes("PACIENTE") || data.roles.includes("Paciente");

      if (!esPaciente) {
        // Si NO es paciente, lanzamos un error manual para que caiga en el catch
        // y no guardamos el token
        throw new Error("ROLE_MISMATCH");
      }

      // Si pasa la validación, procedemos
      console.log("Respuesta del servidor: ", data);

      localStorage.setItem("token", data.token);

      //Actualizamos el toast a exito:

      toast.success(


        <ToastSuccess
          title="¡Bienvenido!"
          subtitle="Sesión iniciada correctamente"
        />,
        { id: toastId, icon: null, duration: 4000 }

      );

      navigate("/DashboardPatient");

    } catch (error: any) {
      //Manejo de errores
      console.error("Error login:", error);

      // Manejo específico para cuando el rol no coincide
      if (error.message === "ROLE_MISMATCH") {
        toast.error(
          <ToastError
            title="Acceso Restringido"
            subtitle="Esta cuenta no pertenece a un Paciente."
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
    <div className="flex mx-auto w-fit bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="bg-white rounded-tl-xl rounded-bl-xl">
        <div className="p-4">
          <p className="text-blue-600 font-bold text-2xl">
            Bienvenido de vuelta.
          </p>
          <p className="text-gray-600 text-xl">
            Por favor, inicia sesión con tu correo y contraseña.
          </p>
        </div>

        <form className="mt-4 w-10/12 bg-blue-50 mx-auto space-y-2 shadow-xl p-4 rounded-xl" onSubmit={handleLogin}>
          <label className="flex flex-col">
            <span className="mb-2 text-lg font-bold font-sans text-emerald-600">
              Email
            </span>
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              className="peer w-full border border-blue-900 bg-white focus:bg-gray-400 focus:text-white rounded-md h-10 p-2 text-lg font-semibold"
              required
            />
            <div className="invisible peer-invalid:visible text-red-500">
              <p>Por favor ingresa un correo electrónico válido.</p>
            </div>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-lg font-bold font-sans text-emerald-600">
              Contraseña
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border border-blue-900 bg-white focus:bg-gray-400 focus:text-white rounded-md h-10 p-2 text-lg font-semibold"
              required
            />
          </label>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Recuerdame</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-600 font-semibold hover:text-indigo-500"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            className="mt-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4"
            type="submit"
          >
            Ingresar
          </button>

          <p className="text-gray-600 leading-relaxed mt-2">
            ¿No tienes una cuenta?{" "}
            <button
              type="button"
              // AQUÍ USAMOS LA PROP QUE NOS ENVIÓ EL PADRE
              onClick={onIrARegistro}
              className="text-blue-600 hover:underline font-semibold"
            >
              Registrate
            </button>
          </p>
        </form>
      </div>

      <div className="col-span-1 shrink-0">
        <img
          src="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=387&auto=format&fit=crop"
          alt="Doctor"
          className="object-cover h-full"
        />
      </div>
    </div>
  );
};
