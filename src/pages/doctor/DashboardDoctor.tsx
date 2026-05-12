import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { Header } from "../../layouts/Header";
import { LateralBar } from "../../layouts/LateralBar";
import { HomeDoctor } from "../../modules/doctor/HomeDoctor/HomeDoctor";
import type { Cita, Usuario } from "../../types/models";
import { usuarioService } from "../../services/usuario.service";
import { citaService } from "../../services/cita.service";
import { ProfileDoctor } from "../../modules/doctor/Profile/ProfileDoctor";
import { TodaysAppointments } from "../../modules/doctor/Appointments/TodaysAppointments";

export const DashboardDoctor = () => {

    const location = useLocation();

    const [mostrarBarra, setMostrarBarra] = useState(false);
    const [activatedView, setActivatedView] = useState(location.state?.view || "home");

    const [doctor, setDoctor] = useState<Usuario | null>(null);
    const [citas, setCitas] = useState<Cita[]>([]);
    const [isLoadingCitas, setIsLoadingCitas] = useState(true); // Controla el estado de carga de las citas

    useEffect(() => {
        if (location.state?.view) {
            setActivatedView(location.state.view);
        }
    }, [location.state]);

    const views = [
        { id: "home", label: "Home" },
        { id: "profile", label: "Perfil" },
        { id: "citas", label: "Citas de hoy" },

    ];

    const cargarDatos = async () => {
        try {
            const data = await usuarioService.getPerfil();
            console.log("Datos refrescados:", data);
            setDoctor(data);
            if (data && data.idUsuario) {
                await cargarCitas(data.idUsuario);
            }
        } catch (error) {
            console.error("Error cargando perfil:", error);
        }
    };

    const cargarCitas = async (medicoId: number) => {
        setIsLoadingCitas(true); // Iniciamos la carga
        try {
            const data = await citaService.obtenerTodasLasCitasPorMedico(medicoId);
            console.log("Citas del médico refrescadas:", data);
            setCitas(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
        } finally {
            setIsLoadingCitas(false); // Terminamos la carga sin importar si hubo error o éxito
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    // --- MANEJO DE SESIÓN ---
    const handleCerrarSesion = () => {
        toast.info(
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-emerald-600"></i>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Hasta pronto!!</span>
                    <span className="text-xs text-gray-500">Cerrando sesión....</span>
                </div>
            </div>,
            { icon: null, duration: Infinity }
        );
        authService.logout();
    };

    return (
        <>

            <Header>

                <div className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic">
                    <button onClick={() => setMostrarBarra(!mostrarBarra)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </Header>

            <LateralBar onClose={() => setMostrarBarra(false)} visible={mostrarBarra}>
                {views.map((view) => (
                    <button
                        key={view.id}
                        onClick={() => {
                            setActivatedView(view.id);
                            setMostrarBarra(false);
                        }}
                        className={`px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic
                                  ${activatedView === view.id}`}
                    >
                        {view.label}
                    </button>
                ))}

                <button
                    onClick={handleCerrarSesion}
                    className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic"
                >
                    Cerrar Sesión
                </button>
            </LateralBar>

            {activatedView === "home" && (
                <HomeDoctor doctorHome={doctor} citasHome={citas} isLoadingCitas={isLoadingCitas} />
            )}
            {activatedView === "profile" && (
                <ProfileDoctor onUpdateSuccess={cargarDatos} />
            )}
            {activatedView === "citas" && (
                <TodaysAppointments citasParaFiltrarHoy={citas} isLoading={isLoadingCitas} />
            )}


        </>
    );
};