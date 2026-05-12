import { useEffect, useState } from "react";
import type { Usuario } from "../../types/models";
import { usuarioService } from "../../services/usuario.service";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { Header } from "../../layouts/Header";
import { LateralBar } from "../../layouts/LateralBar";
import { HomePatient } from "../../modules/patient/HomePatient/HomePatient";
import { ProfilePatient } from "../../modules/patient/Profile/ProfilePatient";

import { ScheduleAppointment } from "../../modules/patient/Appointment/Insert/ScheduleAppointment";
import { HistorialCitas } from "../../modules/patient/AppointmentHistory/HistorialCitas";
import { EditAppointment } from "../../modules/patient/Appointment/Edit/EditAppointment";

export const DashboardPatient = () => {

  // --- ESTADOS DE UI ---
  const [mostrarBarra, setMostrarBarra] = useState(false);
  const [activatedView, setActivatedView] = useState("home");

  const views = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Perfil" },
    { id: "appointments", label: "Agendar una cita" },
    { id: "edit", label: "Editar Cita" },
    { id: "history", label: "Historial de Citas" },

  ];

  // --- ESTADO DE DATOS ---
  const [paciente, setPaciente] = useState<Usuario | null>(null);


  // función reutilizable para cargar datos
  const cargarDatos = async () => {
    try {
      const data = await usuarioService.getPerfil();
      console.log("Datos refrescados:", data);
      setPaciente(data);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  // Cargar Perfil al iniciar llamando a la función de arriba
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
    <div>
      {/* LAYOUT NAVBAR */}
      <Header>
        <div className="px-2 py-1 text-cyan-800 text-2xl hover:font-bold hover:italic">
          <button onClick={() => setMostrarBarra(!mostrarBarra)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </Header>

      {/* LAYOUT SIDEBAR */}
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

      {/* --- CONTENIDO PRINCIPAL --- */}
      <>
        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1 overflow-auto">

          {/* VISTA HOME */}
          {activatedView === 'home' && (
            <HomePatient paciente={paciente} />
          )}

          {/* VISTA PERFIL */}
          {activatedView === 'profile' && (
            // Pasamos la función cargarDatos como "onUpdateSuccess"
            <ProfilePatient onUpdateSuccess={cargarDatos} />
          )}

          {/* VISTA AGENDAR CITA */}
          {activatedView === 'appointments' && paciente && (
            <ScheduleAppointment
              paciente={paciente}
              // Cuando la cita se guarda, regresamos automáticamente al Home
              onCitaAgendada={() => setActivatedView("home")}
            />
          )}

          {/* VISTA HISTORIAL DE CITAS */}
          {activatedView === 'history' && paciente && (
            <HistorialCitas paciente={paciente} />
          )}

          {/* VISTA EDITAR CITA */}
          {activatedView === 'edit' && paciente && (
            <EditAppointment paciente={paciente} />
          )}
        </div>
      </>
    </div>
  );
};




