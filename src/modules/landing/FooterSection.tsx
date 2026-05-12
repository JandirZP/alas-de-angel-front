export const FooterSection = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            {/* Redes sociales */}
            <div className="flex mb-4 border-b pb-4">
                <h3 className="text-lg">Redes sociales:</h3>
                
                {/* 1. Definimos el tamaño base del TEXTO aquí (text-lg) */}
                <ul className="flex ml-4 w-3/12 justify-around text-lg">
                    
                    {/* 2. Agregamos 'flex items-center' para que el ícono y el texto se centren verticalmente */}
                    <li className="flex items-center gap-2">
                        
                        {/* 3. Al ícono le damos un tamaño MAYOR (ej. text-xl o text-2xl) */}
                        <i className="fa-brands fa-facebook text-xl"></i>
                        
                        <a href="">Facebook</a>
                    </li>

                    <li className="flex items-center gap-2">
                        <i className="fa-brands fa-x-twitter text-xl"></i>
                        <a href="">Twitter</a>
                    </li>

                    <li className="flex items-center gap-2">
                        <i className="fa-brands fa-instagram text-xl"></i>
                        <a href="">Instagram</a>
                    </li>
                </ul>
            </div>
            <div className="w-full border-b pb-4">
                <div className="w-fit mx-auto  flex items-center gap-96 text-lg">
                    {/* Temas Legales */}
                    <div>
                        <h3 className="mb-2">Temas Legales:</h3> 
                        <ul>
                            <li><a href="">Privacidad</a></li>
                            <li><a href="">Terminos y condiciones</a></li>
                            <li><a href="">Aviso legal</a></li>
                            <li><a href="">Politica de cookies</a></li>
                        
                        </ul>
                    </div>
                    {/* Información de contacto */}
                    <div>
                        <h3 className="mb-2">Información de contacto:</h3>
                        <ul>
                            <li><a href="">Correo: alasperuanas@example.com</a></li>
                            <li><a href="">Telefono: 01 4567890</a></li>
                            <li><a href="">Direccion Principal: Calle 123, Lima, Perú</a></li>
                            <li><a href="">Sedes</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            
            {/* Derechos de reservados */}
            <div className="p-4 text-lg">
                <p className="text-center">© 2025 Hospital Alas de Angel. Todos los derechos reservados.</p>
            </div>

            
        </footer>
    );
}