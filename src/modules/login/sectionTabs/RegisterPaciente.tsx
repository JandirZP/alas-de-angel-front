import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../layouts/Modals";
import { usuarioService } from "../../../services/usuario.service";
import { toast } from "sonner";

export const RegisterPaciente = () => {
  const navigate = useNavigate();

  const [isValidating, setIsValidating] = useState(false);

  // 1. Definimos el estado para capturar los datos
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    documento: "",
    emision: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });

  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue

    setIsValidating(true);

    try {
      // Intentamos buscar si ya existe un paciente con ese documento
      const pacienteExistente = await usuarioService.getPacientePorDocumento(formData.documento);
      
      // Si llega aquí sin caer al catch, significa que el backend respondió HTTP 200 OK
      // O sea, el paciente YA EXISTE.
      if (pacienteExistente) {
        setIsValidating(false);
        toast.error("El número de documento ya se encuentra registrado en el sistema.");
        return; // Detenemos el flujo
      }
    } catch (error: any) {
      // Si el backend responde HTTP 404 Not Found, caerá aquí. 
      // Esto significa que el documento está libre y podemos continuar.
      if (error.response && error.response.status === 404) {
        // Todo bien, el documento no existe.
      } else {
        // Algún otro error (500, red, etc)
        setIsValidating(false);
        toast.error("Hubo un error al validar el documento. Intente de nuevo.");
        return;
      }
    }

    // Si pasamos la validación (documento libre), continuamos con la simulación RENIEC
    setTimeout(() => {
      setIsValidating(false);
      // Redirigimos a la otra ruta y le pasamos el objeto formData
      navigate("/insert-patient", { state: formData });
    }, 2500);
  };

  return (
    <div className="w-fit mx-auto m-6 flex rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white">
      <div className="shrink-0">
        <img
          src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="object-cover h-full"
        />
      </div>

      <div className="w-full">
        {/* Agregamos onSubmit al formulario */}
        <form onSubmit={handleSubmit} className="items-center bg-emerald-300 rounded-2xl m-6 p-8">
          <div>
            <label
              htmlFor="tipoDocumento"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Selecciona un Tipo de Documento
            </label>
            <select
              id="tipoDocumento"
              name="tipoDocumento" // Atributo name agregado
              value={formData.tipoDocumento} // Vinculamos el valor al estado
              onChange={handleChange} // Vinculamos el evento
              required
              className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-xs placeholder:text-body"
            >
              <option value="" disabled>
                Escoge
              </option>
              <option value="DNI">Documento Nacional de Identidad</option>
              <option value="Carnet de Extranjeria">Carnet de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="documento"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Numero de Documento
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="12345678"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="emision"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Fecha de Emisión
            </label>
            <input
              type="date"
              id="emision"
              name="emision"
              value={formData.emision}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="nombres"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Nombres
            </label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Juan"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="apellidos"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Apellido Paterno
            </label>
            <input
              type="text"
              id="apellidoPaterno"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Perez"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="apellidos"
              className="block mb-2.5 text-sm text-heading text-blue-800 font-bold"
            >
              Apellido Materno
            </label>
            <input
              type="text"
              id="apellidoMaterno"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Perez"
              required
            />
          </div>

          {/* El botón debe ser de tipo submit */}
          <button
            type="submit"
            disabled={isValidating}
            className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>

      {/* Modal de Simulación RENIEC */}
      <Modal visible={isValidating} onClose={() => { }} hideCloseButton>
        <div className="flex flex-col items-center justify-center py-10">
          <i className="fa-solid fa-spinner fa-spin text-6xl text-blue-600 mb-6"></i>
          <h2 className="text-2xl font-bold text-slate-800 text-center">
            Simulando validación en RENIEC...
          </h2>
          <p className="text-slate-600 mt-3 text-center">
            Comprobando la identidad y vigencia del documento. Por favor, espere.
          </p>
        </div>
      </Modal>
    </div>
  );
};