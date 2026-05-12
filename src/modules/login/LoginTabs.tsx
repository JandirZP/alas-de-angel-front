import { useState } from 'react';
import { EsquinaMagica } from '../../components/EsquinaMagica';
import { LoginPaciente } from './sectionTabs/LoginPaciente';
import { RegisterPaciente } from './sectionTabs/RegisterPaciente';
import { LoginColaborador } from './sectionTabs/LoginColaborador';


export const LoginTabs = () => {
    const [activeTab, setActiveTab] = useState("loginPaciente");

    const tabs = [
        { id: "loginPaciente", label: "¿Eres paciente?" },
        { id: "registerPaciente", label: "Registrarse" },
        { id: "loginColaborador", label: "Colaboradores" },
    ];

    return (
        <div className='w-full pt-8 bg-blue-50'>
            <div className="w-full bg-white rounded-t-3xl"> {/* Agregué rounded al contenedor blanco para suavizar todo */}

                {/* --- LA BARRA DE NAVEGACIÓN --- */}
                {/* Nota: items-end es vital para que las pestañas se peguen al suelo */}
                <div className="flex items-end bg-blue-50 px-8">

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            // Agregamos 'relative' y 'group' para poder posicionar las esquinas mágicas
                            className={`
                                relative px-8 py-3 text-xl font-bold transition-all duration-200
                                rounded-t-2xl
                                ${activeTab === tab.id
                                    ? 'bg-gray-100 text-blue-700 z-10' // Z-10 para que quede encima
                                    : 'bg-transparent text-blue-500 hover:bg-white/30 mb-1' // mb-1 para que sean un pelín más bajas
                                }
                            `}
                        >
                            {tab.label}

                            {/* --- AQUÍ USAMOS TU NUEVO COMPONENTE --- */}
                            {/* Mira qué limpio se ve ahora 👇 */}

                            {activeTab === tab.id && (
                                <>
                                    {/* Le pasamos el color blanco explícitamente */}
                                    <EsquinaMagica lado="izquierda" colorHex="#f3f4f6" />
                                    <EsquinaMagica lado="derecha" colorHex="#f3f4f6" />
                                </>
                            )}
                        </button>
                    ))}

                    {/* Relleno flexible para empujar tabs si quisieras, o dejarlo así */}
                    <div className="flex-1 border-b border-gray-100"></div>
                </div>

                {/* --- EL CONTENIDO --- */}
                <div className="p-8 bg-gray-100 min-h-[75vh]"> {/* min-h para que no salte */}

                    {/* --- LOGIN PACIENTE --- */}
                    <div className={`transition-opacity duration-300 ${activeTab === 'loginPaciente' ? 'block' : 'hidden'}`}>
                        <LoginPaciente onIrARegistro={() => setActiveTab('registerPaciente')} />


                    </div>

                    {/* Registrar Paciente */}
                    <div className={`transition-opacity duration-300 ${activeTab === 'registerPaciente' ? 'block' : 'hidden'}`}>
                        <RegisterPaciente />


                    </div>

                    {/* Colaboradores */}
                    <div className={`transition-opacity duration-300 ${activeTab === 'loginColaborador' ? 'block' : 'hidden'}`}>
                        <LoginColaborador />
                    </div>

                </div>
            </div>
        </div>
    );
};