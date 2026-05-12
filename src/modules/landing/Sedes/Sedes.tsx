import { useEffect, useState } from "react";
import type { Sedes as SedesModel } from "../../../types/models";
import { sedesService } from "../../../services/sedes.service";

export const Sedes = () => {
    const [sedesData, setSedesData] = useState<SedesModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSedes = async () => {
            try {
                const sedes = await sedesService.getSedes();
                setSedesData(sedes);
            } catch (error) {
                console.error("Error fetching sedes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSedes();
    }, []);

    return (
        <>
            {/* SEDES */}
            <section id="sedes" className="py-16 bg-gray-50 min-h-screen w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Encabezado de la sección */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Nuestras Sedes
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Encuentra el centro de atención más cercano a ti.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            <div className="col-span-full text-center py-12">
                                <i className="fa-solid fa-spinner fa-spin text-5xl text-blue-600"></i>
                                <p className="mt-4 text-gray-500 font-medium text-lg">Cargando sedes...</p>
                            </div>
                        ) : sedesData.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300 py-16 px-4">
                                <i className="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
                                <p className="text-xl text-gray-500 font-medium">No hay sedes disponibles en este momento.</p>
                            </div>
                        ) : (
                            /* Tarjetas de Sedes Mejoradas */
                            sedesData.map(sede => (
                                <div
                                    key={sede.idSedes}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                                >
                                    {/* Cabecera de la tarjeta: Título y Badge */}
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {sede.nombre}
                                        </h3>
                                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                                            {sede.departamento}
                                        </span>
                                    </div>

                                    {/* Línea divisoria sutil */}
                                    <div className="w-full h-px bg-gray-100"></div>

                                    {/* Cuerpo de la tarjeta: Información con íconos */}
                                    <div className="flex flex-col gap-3">
                                        {/* Ubicación */}
                                        <div className="flex items-start gap-3">
                                            <i className="fa-solid fa-location-dot text-gray-400 mt-1 w-5 text-center"></i>
                                            <div>
                                                <p className="text-gray-700 font-medium leading-tight">{sede.direccion}</p>
                                                <p className="text-sm text-gray-500 mt-0.5">{sede.distrito}, {sede.provincia}</p>
                                            </div>
                                        </div>

                                        {/* Referencia */}
                                        {sede.referencia && (
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-map-pin text-gray-400 mt-1 w-5 text-center"></i>
                                                <p className="text-sm text-gray-600 italic leading-snug">{sede.referencia}</p>
                                            </div>
                                        )}

                                        {/* Teléfono */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="bg-green-50 p-2 rounded-lg">
                                                <i className="fa-solid fa-phone text-green-600 w-4 text-center"></i>
                                            </div>
                                            <p className="text-gray-800 font-semibold">{sede.telefonoContacto}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};