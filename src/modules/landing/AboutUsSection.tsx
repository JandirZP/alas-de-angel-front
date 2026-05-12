export const AboutUsSection = () => {
    return (
        <div id="aboutus" className="scroll-mt-20 bg-green-100 p-8">
            <div className="w-9/12 flex m-4 mx-auto bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="shrink-0">
                    <img 
                    className="h-full w-100 object-cover"
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="" 
                    />

                    

                </div>
                <div className="p-8 w-full">
                    <h1 className="text-blue-600 text-base md:text-5xl font-bold">
                        Sobre Nosotros
                    </h1>
                    <p className="text-green-700 my-8 text-left text-xs md:text-xl font-bold">
                        Somos una clínica médica comprometida con el cuidado integral de la salud, enfocada en 
                        brindar atención de calidad a nuestros pacientes y en contribuir activamente al bienestar de la comunidad.<br/>
                        Trabajamos bajo principios de ética, responsabilidad y vocación de servicio, ofreciendo una atención médica 
                        personalizada, humana y confiable.<br/>
                        Nuestro equipo está conformado por profesionales de la salud altamente calificados, que trabajan de manera 
                        conjunta para garantizar diagnósticos precisos, tratamientos oportunos y un acompañamiento constante en cada etapa del cuidado del paciente.
                    </p>
                </div>

            </div>
            
            
        </div>
    );
};