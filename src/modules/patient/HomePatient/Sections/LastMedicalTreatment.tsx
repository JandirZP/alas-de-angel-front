import { useEffect, useState } from "react";
import type { Tratamiento } from "../../../../types/models";
import { hcEventosService } from "../../../../services/hcEventos.service";


interface Props {
    idPaciente: number;
}

export const LastMedicalTreatment = ({ idPaciente }: Props) => {
    const [tratamiento, setTratamiento] = useState<Tratamiento | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Si no hay ID, no hacemos nada (evita llamadas innecesarias)
        if (!idPaciente) return;

        setLoading(true);

        // USAMOS EL SERVICIO AQUÍ
        hcEventosService.getUltimoTratamiento(idPaciente)
            .then((data) => {
                setTratamiento(data);
            })
            .catch((error) => {
                // Aquí podrías poner un toast.error si quieres, o dejarlo silencioso
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [idPaciente]);

    if (loading) {
        return (
            <div className="w-fit mx-auto my-auto p-10 m-6 flex justify-center items-center">
                <i className="fa-solid fa-circle-notch fa-spin text-4xl text-amber-400"></i>
            </div>
        );
    }

    // ESTADO VACÍO (Sin tratamiento)
    if (!tratamiento) {
        return (
            <div className="w-full mx-auto my-auto p-6 m-6">
                <div className="w-full h-fit shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
                    <div className="bg-gray-100 text-2xl font-bold p-4 text-gray-400 text-center">
                        Tratamiento Médico Actual
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-gray-400 gap-3">
                        <i className="fa-solid fa-user-doctor text-6xl opacity-50"></i>
                        <p className="text-lg font-medium">No tienes ningún tratamiento activo.</p>
                        <p className="text-sm">¡Excelente salud!</p>
                    </div>
                </div>
            </div>
        );
    }

    // ESTADO CON DATOS
    return (
        <div className="w-fit mx-auto my-auto p-10 m-6">
            <div className="w-fit h-fit shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-amber-300 text-2xl font-bold p-4">
                    Tratamiento Médico Actual
                </div>
                <div className="grid grid-cols-3 gap-4 bg-gray-200">

                    {/* Medicamentos */}
                    <div className="col-span-2 bg-blue-50 p-4">
                        <h1 className="text-xl font-semibold text-orange-600">
                            Medicamentos
                        </h1>
                        <br />
                        {/* whitespace-pre-line respeta los saltos de línea de la BD */}
                        <div className="text-blue-900 text-xl italic font-semibold whitespace-pre-line">
                            {tratamiento.medicamentos || "Ninguno"}
                        </div>
                    </div>

                    {/* Recomendaciones */}
                    <div className="bg-blue-50 p-4">
                        <h1 className="text-xl font-semibold text-orange-600">
                            Recomendaciones
                        </h1>
                        <br />
                        <div className="text-blue-900 text-xl italic font-semibold whitespace-pre-line">
                            {tratamiento.recomendaciones || "Ninguna"}
                        </div>
                    </div>

                    {/* Médico */}
                    <div className="bg-blue-50 p-4">
                        <h1 className="text-xl font-semibold text-orange-600">
                            Médico:
                        </h1>
                        <br />
                        <div className="text-blue-900 text-xl italic font-semibold">
                            Dr. {tratamiento.nombreMedico} {tratamiento.apellidoMedico}
                        </div>
                    </div>

                    {/* Dieta */}
                    <div className="col-span-2 bg-blue-50 p-4">
                        <h1 className="text-xl font-semibold text-orange-600">
                            Dieta:
                        </h1>
                        <br />
                        <div className="text-blue-900 text-xl italic font-semibold whitespace-pre-line">
                            {tratamiento.dieta || "General"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

