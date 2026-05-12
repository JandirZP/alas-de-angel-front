import { Route, Routes, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/principal/LandingPage';
import { LoginPage } from '../pages/login/LoginPage';
import { DashboardPatient } from '../pages/patient/DashboardPatient';

import { DashboardNurse } from '../pages/nurse/DashboardNurse';
import { DashboardDoctor } from '../pages/doctor/DashboardDoctor';
import { ChangeValues } from '../modules/patient/Appointment/Edit/ChangeValues';
import { ViewUnattendedPatients } from '../modules/nurse/HomeNurse/Sections/ViewUnattendedPatients';
import { InsertMedicalRecord } from '../modules/nurse/MedicalRecord/Insert/InsertMedicalRecord';
import { DashboardAdministrador } from '../pages/Admin/DashboardAdministrador';
import { ViewMedicalRecord } from '../modules/nurse/MedicalRecord/Read/ViewMedicalRecord';
import { EditMedicalRecord } from '../modules/nurse/MedicalRecord/Update/EditMedicalRecord';
import { InsertDiagnostic } from '../modules/doctor/InsertDiagnostic/InsertDiagnostic';
import { ViewMedicalRecordDoctor } from '../modules/doctor/ViewMedicalRecordDoctor/ViewMedicalRecordDoctor';
import { Sedes } from '../modules/landing/Sedes/Sedes';
import { ListaMedicos } from '../modules/landing/Medicos/ListaMedicos';
import { InsertPatient } from '../modules/patient/Insert/InsertPatient';

export const AppRouter = () => {
    return (
        <Routes>
            {/* PAGINA PRINCIPAL */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={<Navigate to="/" />} />

            {/* LOGIN */}
            <Route path='/login' element={<LoginPage />} />

            {/* DASHBOARD PACIENTE */}

            <Route path='/DashboardPatient' element={<DashboardPatient />} />

            {/* DASHBOARD ENFERMERA */}
            <Route path='/DashboardNurse' element={<DashboardNurse />} />

            <Route path='/DashboardDoctor' element={<DashboardDoctor />} />

            <Route path='/ChangeValues' element={<ChangeValues />} />

            <Route path='/ViewUnattendedPatients' element={<ViewUnattendedPatients />} />

            <Route path='/medical-record/new' element={<InsertMedicalRecord />} />

            <Route path='/DashboardAdministrador' element={<DashboardAdministrador />} />

            {/* Recibiremos un código encriptado (:id) por la URL */}
            <Route path='/medical-record/view/:id' element={<ViewMedicalRecord />} />

            <Route path='/medical-record/edit/:id' element={<EditMedicalRecord />} />

            <Route path='/DashboardDoctor' element={<DashboardDoctor />} />

            <Route path='/doctor/insert-diagnostic/:idCita' element={<InsertDiagnostic />} />


            <Route path='/doctor/view-medical-record/:idPaciente' element={<ViewMedicalRecordDoctor />} />

            <Route path='/Sedes' element={<Sedes />} />

            <Route path='/insert-patient' element={<InsertPatient />} />

            <Route path='/lista-medicos' element={<ListaMedicos />} />
        </Routes>
    );
};