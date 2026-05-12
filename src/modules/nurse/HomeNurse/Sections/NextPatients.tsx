import type { Cita } from "../../../../types/models";


interface Props {
    citas: Cita[];
    onGoToTriage: () => void;
}

export const NextPatients = ({ citas, onGoToTriage }: Props) => {

    // 1. Conseguimos la fecha actual (solo para comparar día/mes/año)
    const fechaActual = new Date();

    // 2. Filtramos la lista gigante de citas
    const proximasCitas = citas.filter((cita) => {
        const fechaCita = new Date(cita.fechaHora);

        // Es una cita válida si: No está eliminada, no pasó por triaje, y es de hoy
        return cita.estado === true &&
            cita.atendidoEnTriaje !== true &&
            fechaCita.getDate() === fechaActual.getDate() &&
            fechaCita.getMonth() === fechaActual.getMonth() &&
            fechaCita.getFullYear() === fechaActual.getFullYear();
    }).sort((a, b) => {
        const horaA = new Date(a.fechaHora).getTime();
        const horaB = new Date(b.fechaHora).getTime();
        return horaA - horaB;
    });

    // 3. Ya filtradas, tomamos solamente las primeras 3 de la lista (del índice 0 al 3 excluyendo el 3)
    const citasAMostrar = proximasCitas.slice(0, 3);



    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-cyan-900">Próximos a Triaje</h2>
                <button onClick={onGoToTriage} className="text-sm text-cyan-700 font-semibold hover:underline">Ver todos</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                            <th className="px-6 py-3 font-semibold">Hora</th>
                            <th className="px-6 py-3 font-semibold">Paciente</th>
                            <th className="px-6 py-3 font-semibold">Motivo</th>
                            <th className="px-6 py-3 font-semibold">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {/* Recorremos el arreglo de 3 citas */}
                        {citasAMostrar.map((cita) => {

                            // Para cada cita, formateamos SU propia hora
                            const horaFormateada = new Date(cita.fechaHora).toLocaleTimeString('es-PE', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });

                            // En React, cada elemento de una lista debe tener un "key" único
                            return (
                                <tr key={cita.idCita} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-600">{horaFormateada}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {cita.nombrePaciente} {cita.apellidoPatPaciente} {cita.apellidoMatPaciente}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{cita.motivo}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-cyan-600 font-medium hover:text-cyan-800 hover:underline">
                                            Iniciar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {citasAMostrar.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No hay más pacientes en espera para hoy.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
};