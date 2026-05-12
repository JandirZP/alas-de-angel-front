import React from "react";
import CountrySelect from "../../components/selectCountry/CountrySelect";

interface Props {
  nombreUsuario: string;
  sexo: boolean;
  numeroDocumento: string;
  fechaNacimiento: string;
  paisOrigen: string;
  // Manejadores de eventos
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCountryChange: (valor: string) => void;
}

const PersonalInfo2 = ({
  nombreUsuario,
  sexo,
  numeroDocumento,
  fechaNacimiento,
  paisOrigen,
  onChange,
  onCountryChange
}: Props) => {

  return (
    <>
      {/* Nombre de Usuario (Solo lectura) */}
      <div>
        <label className="block mb-1">Nombre de Usuario:</label>
        <input
          type="text"
          name="nombreUsuario"
          value={nombreUsuario || ""}
          readOnly
          className="rounded-xl border border-emerald-900 bg-gray-200 text-gray-600 px-2 py-1 w-full cursor-not-allowed"
        />
      </div>

      {/* Sexo (Select booleano) */}
      <div>
        <label className="block mb-1">Sexo:</label>
        <select
          name="sexo"
          value={sexo ? "true" : "false"}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
        >
          <option value="true">Masculino</option>
          <option value="false">Femenino</option>
        </select>
      </div>

      {/* Tipo de Documento (DNI por defecto según tu modelo) */}
      <div className="">
        <label className="block mb-1">Tipo de Documento:</label>
        <select
          name="tipoDocumento"
          disabled // Por seguridad, el tipo de doc suele ser fijo tras el registro
          className="rounded-xl border border-emerald-900 bg-gray-200 text-gray-600 px-2 py-1 w-full cursor-not-allowed"
        >
          <option value="DNI">DNI</option>
          <option value="Carnet de Extranjeria">Carnet de Extranjería</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>

      {/* Número de Documento */}
      <div>
        <label className="block mb-1">Número de Documento:</label>
        <input
          type="text"
          name="numeroDocumento"
          value={numeroDocumento || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-gray-200 text-gray-600 px-2 py-1 w-full cursor-not-allowed"
          disabled
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div>
        <label className="block mb-1">Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={fechaNacimiento || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
        />
      </div>

      {/* País de Origen (Tu componente personalizado) */}
      <div>
        <CountrySelect
          value={paisOrigen}
          onChange={onCountryChange}
        />
      </div>
    </>
  );
};

export default PersonalInfo2;