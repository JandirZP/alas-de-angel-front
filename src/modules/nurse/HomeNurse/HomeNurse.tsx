import type { Cita, Usuario } from "../../../types/models";
import { Kpi } from "./Sections/Kpi";
import { Messages } from "./Sections/Messages";
import { NextPatients } from "./Sections/NextPatients";

interface Props {
    enfermera: Usuario | null;
    citas: Cita[];
    onGoToTriage: () => void;
}

export const HomeNurse = ({ enfermera, citas, onGoToTriage }: Props) => {
    return (
        <div className="p-6 max-w-7xl mx-auto mt-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-cyan-900">Bienvenido(a), {enfermera?.nombres}</h1>
                <p className="text-gray-600 mt-1">Hospital Alas de Angel - Turno Mañana</p>
            </div>

            {/* CONTENEDOR GRID: 2/3 Izquierda, 1/3 Derecha en pantallas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUMNA IZQUIERDA: KPIs y Tabla */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Tarjetas de Resumen (KPIs) */}
                    <Kpi citas={citas} />

                    {/* Tabla de Próximos Pacientes */}
                    <NextPatients citas={citas} onGoToTriage={onGoToTriage} />

                </div>

                {/* COLUMNA DERECHA: Panel de Mensajes */}
                <div className="lg:col-span-1">
                    <Messages />
                </div>

            </div>
        </div>
    );
};