import { useNavigate } from "react-router-dom";

export const HeroSection = () => {

    const navigate = useNavigate();

    return (
        <div id="home" className="scroll-mt-20 bg-green-100 p-8">


            <div className="w-9/12 p-8 mx-auto bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <h1 className="text-5xl font-bold mb-6 text-blue-600">
                    Bienvenido, estamos aqui para ayudarte
                </h1>

                <h2 className="text-2xl font-bold mb-8">
                    ¿Qué necesitamos hoy?
                </h2>
                <div className="grid grid-flow-col grid-rows-3 gap-4 bg-gray-200 rounded-2xl overflow-hidden">

                    {/* Agendar una cita */}
                    <div className="row-span-4 bg-green-100">
                        <img className="h-60 w-full object-cover" src="https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Agendar una cita"></img>
                        <div className="p-4">
                            <h3 className="text-2xl font-bold mb-2 mt-4">Agendar una cita</h3>
                            <p className="text-green-700 text-xl font-bold">Agenda tu cita con nuestro equipo de expertos en la salud.</p>
                            <button onClick={() => navigate('/login')} className="text-blue-600 font-bold mt-4 hover:text-xl hover:italic">Ver más..</button>
                        </div>
                    </div>

                    {/* Buscar un especialista */}
                    <div className="col-span-2 bg-green-100 flex justify-between">
                        <div className="p-4">
                            <h3 className="text-2xl font-bold mb-2 mt-4">Buscar un especialista</h3>
                            <p className="text-green-700 text-xl font-bold">Encuentra un especialista en la salud que se adapte a tus necesidades.</p>
                            <button onClick={() => navigate('/lista-medicos')} className="text-blue-600 font-bold mt-4 hover:text-xl hover:italic">Ver más..</button>
                        </div>
                        <img className="h-full w-60 object-cover" src="https://images.unsplash.com/photo-1743796055664-3473eedab36e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Buscar un especialista"></img>
                    </div>

                    {/* Conocer nuestras sedes */}
                    <div className="col-span-2 row-span-2 bg-green-100 flex">
                        <img className="h-full w-64 object-cover" src="https://images.unsplash.com/photo-1621948535605-3742ebb4451b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Conoce nuestras sedes"></img>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 mt-4">Conocer nuestras sedes</h3>
                            <p className="text-green-700 text-xl font-bold">Visita nuestras sedes y descubre nuestra ubicación.</p>
                            <button onClick={() => navigate('/Sedes')} className="text-blue-600 font-bold mt-4 hover:text-xl hover:italic">Ver más..</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}