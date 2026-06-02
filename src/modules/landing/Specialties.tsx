// 1. Importamos el nuevo hook y la data
import { useEffect, useState } from "react";
import { useCarouselLogic } from "../../hooks/landing";
import { usuarioService } from "../../services/usuario.service";
import type { Especialidad } from "../../types/models";






export default function Specialties() {

    const [especialidadesData, setEspecialidadesData] = useState<Especialidad[] | null>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const especialidades = await usuarioService.getEspecialidades();
                setEspecialidadesData(especialidades);
            } catch (error) {
                console.log(error);
            }
        };
        cargarDatos();
    }, []);
    // 2. Usamos el Hook. Le decimos cuántas cartas tenemos.
    const { currentIndex, nextSlide, prevSlide } = useCarouselLogic(especialidadesData?.length || 0);


    return (
        <div id="specialities" className="scroll-mt-24 bg-green-100">
            <div className="w-9/12 mx-auto p-8">
                <h1 className="text-5xl font-bold mb-6 text-blue-600">Especialidades</h1>
                <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {especialidadesData === null ? (
                        <div className="text-center text-gray-500 text-xl py-12 font-medium">
                            Cargando especialidades...
                        </div>
                    ) : (
                        <div
                            className="w-full flex transition-transform duration-500"
                            // Usamos currentIndex que nos da el hook
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {/* 3. Mapeamos sobre la data importada 'specialtiesData' */}
                            {especialidadesData.map((card, index) => (
                                <div key={index} className="w-full shrink-0 p-4">
                                    <div className="bg-white h-full rounded-xl shadow-md p-6 text-center">
                                        <img className="rounded-full w-48 h-48 mx-auto mb-4" src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=853&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={card.nombre} />
                                        <h3 className="text-xl font-semibold mb-2">
                                            {card.nombre}
                                        </h3>
                                        <p className="text-gray-600">
                                            {card.descripcion}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    {/* Botón Anterior */}
                    <button
                        onClick={prevSlide}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                        Anterior
                    </button>

                    {/* Botón Siguiente */}
                    <button
                        onClick={nextSlide}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}