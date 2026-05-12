// TU JSX PERSONALIZADO (Toast personalizados en la misma pagina)
// <div className="flex items-center gap-3">

//   <i className="fa-solid fa-circle-notch fa-spin text-2xl text-emerald-600"></i>

//   <div className="flex flex-col">
//     <span className="font-bold text-gray-700">Validando...</span>
//     <span className="text-xs text-gray-500">Consultando al servidor</span>
//   </div>
// </div>,
// {
//   duration: Infinity, Importante: que no desaparezca solo
//   icon: null,         Quitamos el ícono de Sonner
// }


//------------------------------------------------------------------

//--------------------------------------------------------------------------------------

  // TOAST CON PROMISE
  // Nota: Ya no necesita ser async aquí explícitamente si usamos promise de esta forma
  // const handleLogin = (e: React.FormEvent) => { 
  //   e.preventDefault();

  //   const LoginRequest: LoginRequestDto = {
  //     correo,
  //     password
  //   }

  //   Usamos toast.promise para envolver la llamada al servicio
  //   toast.promise(authService.login(LoginRequest), {

  //     1. MIENTRAS CARGA (Spinner)
  //     loading: 'Validando credenciales...',

  //     2. SI TIENE ÉXITO
  //     success: (data) => {
  //       localStorage.setItem("token", data.token);
  //       navigate("/DashboardPatient");


  //       Retornamos JSX


  //       return (
  //         <div className="flex items-center gap-2">
  //           <span className="text-xl text-green-800"><i className="fa-solid fa-thumbs-up"></i></span>
  //           <div>
  //             <p className="font-bold text-blue-900">¡Bienvenido!</p>
  //             <p className="text-sm">Sesión iniciada correctamente</p>
  //           </div>
  //         </div>
  //       );
  //     },

  //     3. SI FALLA (Error Genérico por seguridad)
  //     error: (err) => {
  //       console.error(err); Para ti en consola (debugging)

  //       Verificamos si es error de red o de credenciales, pero el mensaje al usuario es cauto
  //       if (err.code === "ERR_NETWORK") {
  //         return (
  //           <div className="flex items-center gap-2">
  //             <span className="text-xl text-amber-500"><i className="fa-solid fa-triangle-exclamation"></i></span>
  //             <div>
  //               <p className="font-bold text-red-600">Error al conectarse</p>
  //               <p className="text-sm text-gray-600">No se pudo establecer contacto con el servidor</p>
  //             </div>
  //           </div>
  //         );
  //       }

  //       Mensaje genérico estándar de la industria
  //       return (
  //         <div className="flex items-center gap-2">
  //           <span className="text-xl text-amber-500"><i className="fa-solid fa-lock"></i></span>
  //           <div>
  //             <p className="font-bold text-red-600">Acceso Denegado</p>
  //             <p className="text-sm text-gray-600">Correo o contraseña incorrectos</p>
  //           </div>
  //         </div>
  //       );
  //     },

  //     Opcional: Estilos personalizados para esta promesa
  //     className: 'bg-white p-4',
  //   });
  // }