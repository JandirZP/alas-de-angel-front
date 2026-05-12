import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usuarioService } from "../../../services/usuario.service";
import { LocalAvatarSelector } from "../../../components/LocalAvatarSelector";
import { toast } from "sonner";
import { useInsertPatientLogic } from "../../../hooks/Patient/Register/insertPatientLogic";

// Secciones
import { DatosPersonalesSection } from "./Sections/DatosPersonalesSection";
import { DocumentacionSection } from "./Sections/DocumentacionSection";
import { AccesoSistemaSection } from "./Sections/AccesoSistemaSection";
import { ContactoUbigeoSection } from "./Sections/ContactoUbigeoSection";

export const InsertPatient = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Recuperamos los datos enviados desde RegisterPaciente.tsx
    const registerData = location.state;

    // Mapeamos el tipoDocumento a tipoDocumentoId
    const getTipoDocumentoId = (tipo: string) => {
        if (tipo === "Carnet de Extranjeria") return "2";
        if (tipo === "Pasaporte") return "3";
        return "1"; // DNI por defecto
    };

    // Estado inicial basado en la interfaz Usuario
    const [formData, setFormData] = useState({
        nombres: registerData?.nombres || "",
        apellidoPaterno: registerData?.apellidoPaterno || "",
        apellidoMaterno: registerData?.apellidoMaterno || "",
        fotoUrl: "",
        fechaNacimiento: "",
        tipoDocumentoId: registerData?.tipoDocumento ? getTipoDocumentoId(registerData.tipoDocumento) : "1",
        numeroDocumento: registerData?.documento || "",
        sexo: "true", // true = Masculino, false = Femenino
        celular: "",
        contactoEmergencia: "",
        celularContacto: "",
        direccion: "",
        paisOrigen: "PE",
        nombreUsuario: "",
        correo: "",
        password: "",
        ubigeoEntity: {
            idUbigeo: "",
            departamento: "",
            provincia: "",
            distrito: ""
        }
    });

    // Estado para la foto
    const [fotoFile, setFotoFile] = useState<File | null>(null);

    // --- Custom Hook para la lógica del Ubigeo ---
    const {
        departamentos,
        provincias,
        distritos,
        handleDepChange,
        handleProvChange,
        handleDistritoChange
    } = useInsertPatientLogic(setFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Extraer idUbigeo limpio y tipoDocumento
        const payload = {
            ...formData,
            sexo: formData.sexo === "true",
            tipoDocumentoId: parseInt(formData.tipoDocumentoId),
            idUbigeo: formData.ubigeoEntity.idUbigeo ? parseInt(formData.ubigeoEntity.idUbigeo) : null
        };

        try {
            const nuevoPaciente = await usuarioService.registrarPaciente(payload);

            if (fotoFile && nuevoPaciente.idUsuario) {
                await usuarioService.subirFoto(nuevoPaciente.idUsuario, fotoFile);
            }

            toast.success("Paciente registrado exitosamente!");
            navigate("/login");
        } catch (error: any) {
            console.error("Error al registrar paciente:", error);
            const errorMsg = error.response?.data || "Hubo un error al registrar al paciente.";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">

            {/* ENCABEZADO FIJO */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div>
                            <h1 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                                <i className="fa-solid fa-user-plus text-emerald-600"></i>
                                Registrar Nuevo Paciente
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Ingrese los datos demográficos y de acceso del usuario.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* COLUMNA IZQUIERDA */}
                        <div className="lg:col-span-7 space-y-8">
                            <DatosPersonalesSection formData={formData} handleChange={handleChange} />
                            <DocumentacionSection formData={formData} handleChange={handleChange} />
                        </div>

                        {/* COLUMNA DERECHA */}
                        <div className="lg:col-span-5 space-y-8">
                            <LocalAvatarSelector
                                nombres={formData.nombres}
                                apellidoPaterno={formData.apellidoPaterno}
                                onFileSelected={setFotoFile}
                            />
                            <AccesoSistemaSection formData={formData} handleChange={handleChange} />
                            
                            <ContactoUbigeoSection 
                                formData={formData} 
                                handleChange={handleChange}
                                departamentos={departamentos}
                                provincias={provincias}
                                distritos={distritos}
                                handleDepChange={handleDepChange}
                                handleProvChange={handleProvChange}
                                handleDistritoChange={handleDistritoChange}
                            />
                        </div>
                    </div>

                    <div className="h-10"></div>
                </form>
            </main>

            {/* BARRA DE ACCIÓN FLOTANTE */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                <div className="max-w-6xl mx-auto flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="px-8 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <i className="fa-solid fa-floppy-disk"></i> Guardar Paciente
                    </button>
                </div>
            </div>
        </div>
    );
};