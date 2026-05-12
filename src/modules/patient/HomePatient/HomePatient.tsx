import { useEffect, useState } from "react";
import type { Cita, Usuario } from "../../../types/models";
import { citaService } from "../../../services/cita.service";
import { toast } from "sonner";
import { NextAppointments } from "./Sections/NextAppointments";
import { LastMedicalTreatment } from "./Sections/LastMedicalTreatment";

interface Props {
  paciente: Usuario | null;
}

export const HomePatient = ({ paciente }: Props) => {
  // Estado local para las citas (Movido desde el Dashboard)
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loadingCitas, setLoadingCitas] = useState(false);

  // Cargar citas cuando el paciente esté listo
  useEffect(() => {
    if (paciente && paciente.idUsuario) {
      setLoadingCitas(true);
      citaService.getByPaciente(paciente.idUsuario)
        .then((data) => {
          setCitas(data);
        })
        .catch((error) => {
          console.error("Error cargando citas:", error);
          toast.error("No se pudieron cargar las citas");
        })
        .finally(() => {
          setLoadingCitas(false);
        });
    }
  }, [paciente]);

  // Si no hay paciente aún, mostramos carga básica
  if (!paciente) {
    return <div className="p-10 text-xl text-gray-500">Cargando tus datos...</div>;
  }

  return (
    <div className="p-8 flex w-full h-full">
      
      {/* COLUMNA IZQUIERDA: Perfil y Citas */}
      <div className="w-1/2 h-full">
        
        {/* Tarjeta de Perfil */}
        <div className="flex shadow-xl bg-blue-50 rounded-2xl overflow-hidden w-120 h-28">
          <img
            src={
              paciente.fotoUrl
                ? paciente.fotoUrl
                : `https://ui-avatars.com/api/?name=${paciente.nombres}+${paciente.apellidoPaterno}&background=random`
            }
            alt="Foto de perfil"
            className="w-28 h-28 rounded-br-full rounded-tr-full object-cover"
          />
          <div className="p-4 grid place-content-center">
            <h1 className="text-2xl text-blue-900">Buen día para ti</h1>
            <h2 className="text-xl font-bold">
              {paciente.nombres} {paciente.apellidoPaterno}
            </h2>
          </div>
        </div>

        {/* Componente dinámico de citas */}
        <NextAppointments citas={citas} loading={loadingCitas} />
      </div>

      {/* COLUMNA DERECHA: Tratamiento Medico Actual */}
      <div className="w-fit mx-auto my-auto p-10 m-6">
        <LastMedicalTreatment idPaciente={paciente.idUsuario} />
      </div>

    </div>
  );
};