import { useEffect, useState } from "react";
import { usuarioService } from "../../services/usuario.service";
import type { Cita, Usuario } from "../../types/models";

import { authService } from "../../services/auth.service";
import { toast } from "sonner";
import { Header } from "../../layouts/Header";
import { LateralBar } from "../../layouts/LateralBar";
import { HomeNurse } from "../../modules/nurse/HomeNurse/HomeNurse";
import { citaService } from "../../services/cita.service";
import { ProfileNurse } from "../../modules/nurse/profile/ProfileNurse";
import { Triaje } from "../../modules/nurse/triaje/Triaje";
import { MedicalRecord } from "../../modules/nurse/MedicalRecord/MedicalRecord";
import { useLocation } from "react-router-dom";

export const DashboardNurse = () => {
    const location = useLocation();

    // --- ESTADOS DE UI ---
    const [mostrarBarra, setMostrarBarra] = useState(false);
    const [activatedView, setActivatedView] = useState(location.state?.view || "home");

    useEffect(() => {
        if (location.state?.view) {
            setActivatedView(location.state.view);
        }
    }, [location.state]);

    const views = [
        { id: "home", label: "Home" },
        { id: "profile", label: "Perfil" },
        { id: "triage", label: "Triaje" },
        { id: "medicalrecord", label: "Historia Clínica" },
    ];

    // --- ESTADO DE DATOS ---
    const [enfermera, setEnfermera] = useState<Usuario | null>(null);
    const [citas, setCitas] = useState<Cita[]>([]);

    // función reutilizable para cargar datos
    const cargarDatos = async () => {
        try {
            const data = await usuarioService.getPerfil();
            console.log("Datos refrescados:", data);
            setEnfermera(data);
        } catch (error) {
            console.error("Error cargando perfil:", error);
        }
    };

    const cargarCitas = async () => {
        try {
            const data = await citaService.obtenerTodasLasCitas();
            console.log("Datos refrescados:", data);
            setCitas(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
        }
    };

    const cargarCitasPorDocumento = async (numeroDocumento: string) => {
        try {
            const data = await citaService.buscarCitasPorDocumento(numeroDocumento);
            console.log("Datos refrescados:", data);
            setCitas(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
        }
    };


    // Cargar Perfil al iniciar llamando a la función de arriba
    useEffect(() => {
        cargarDatos();
        cargarCitas();


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
                <HomeNurse enfermera={enfermera} citas={citas} onGoToTriage={() => setActivatedView("triage")} />

            )}
            {activatedView === "profile" && (
                <ProfileNurse onUpdateSuccess={cargarDatos} />
            )}
            {activatedView === "triage" && enfermera && (
                <Triaje citas={citas} onBuscarCitasPorDocumento={cargarCitasPorDocumento} onLimpiarCitas={cargarCitas} enfermera={enfermera} onTriajeGuardado={cargarCitas} />
            )}
            {activatedView === "medicalrecord" && (
                <MedicalRecord />
            )}




        </>






    );
};