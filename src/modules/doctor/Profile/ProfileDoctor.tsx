import { useEffect, useState } from "react";
import type { Ubigeo, Usuario, NivelProfesional } from "../../../types/models";
import { usuarioService } from "../../../services/usuario.service";
import { toast } from "sonner";
import UserFormLayout from "../../../layouts/UserFormLayout";
import { AvatarSelector } from "../../../components/AvatarSelector";
import PersonalInfo1 from "../../../layouts/profile/PersonalInfo1";
import PersonalInfo2 from "../../../layouts/profile/PersonalInfo2";
import ContactInfo from "../../../layouts/profile/ContactInfo";
import UbigeoForm from "../../../layouts/profile/UbigeoForm";
import ProfessionalInformation from "../../../layouts/profile/ProfessionalInformation";

export const ProfileDoctor = ({ onUpdateSuccess }: { onUpdateSuccess: () => void }) => {
    const [formData, setFormData] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [especialidadesActualizadas, setEspecialidadesActualizadas] = useState<any[]>([]);
    const [huboCambioEspecialidades, setHuboCambioEspecialidades] = useState(false);

    useEffect(() => {
        usuarioService.getPerfil()
            .then((data) => {
                setFormData(data);
                setLoading(false);
            })
            .catch(() => toast.error("Error al cargar el perfil"));
    }, []);

    // Manejador genérico para inputs y selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formData) return;
        const { name, value } = e.target;

        // Convertimos a booleano si es el campo 'sexo'
        const finalValue = name === "sexo" ? value === "true" : value;

        setFormData({ ...formData, [name]: finalValue });
    };

    const handleCountryChange = (pais: string) => {
        if (formData) setFormData({ ...formData, paisOrigen: pais });
    };

    const handleUbigeoChange = (nuevoUbigeo: Ubigeo) => {
        if (formData) setFormData({ ...formData, ubigeoEntity: nuevoUbigeo });
    };

    const handleNivelChange = (nivel: NivelProfesional) => {
        if (!formData) return;

        // Asegurarnos que la entidad tenga las propiedades originales para el backend
        const nivelMapeado = {
            ...nivel,
            idNivelProfesional: nivel.idNivelProfesionalDto || nivel.idNivelProfesional,
            nombre: nivel.nombreDto || nivel.nombre,
            estado: nivel.estadoDto ?? nivel.estado
        };

        setFormData({ ...formData, nivelProfesionalEntity: nivelMapeado });
    };

    const handleSave = async () => {
        if (!formData) return;
        try {
            await usuarioService.updatePerfil(formData);

            // [EXPLICACIÓN ACTUALIZACIÓN] 
            // Solo lanzamos la petición separada para mandar nuestros EspecialidadDto al backend
            // si el usuario realmente alteró los checkboxes. Si no tocó nada, nos ahorramos esta solicitud TCP/IP completa.
            if (huboCambioEspecialidades) {
                await usuarioService.updateEspecialidades(formData.idUsuario, especialidadesActualizadas);
            }

            toast.success("Perfil actualizado con éxito");
            // Le avisamos al Dashboard que debe volver a pedir los datos al servidor
            onUpdateSuccess();
        } catch (error) {
            toast.error("No se pudo guardar los cambios");
        }
    };

    if (loading || !formData) return <div className="p-10">Cargando datos...</div>;

    return (
        <UserFormLayout
            onSave={handleSave}

            // 👇 Insertamos el AvatarSelector aquí
            avatarSection={
                <AvatarSelector
                    user={formData}
                    onFotoActualizada={() => {
                        // Cuando Cloudinary responda con éxito:
                        onUpdateSuccess(); // 1. Refrescamos el Dashboard
                        // 2. Refrescamos este componente localmente para ver la foto nueva
                        usuarioService.getPerfil().then(setFormData);
                    }}
                />
            }

            headerInputs={
                <PersonalInfo1
                    nombres={formData.nombres}
                    apellidoPaterno={formData.apellidoPaterno}
                    apellidoMaterno={formData.apellidoMaterno}
                    onChange={handleChange}
                />
            }
            personalInputs={
                <PersonalInfo2
                    nombreUsuario={formData.nombreUsuario}
                    sexo={formData.sexo}
                    numeroDocumento={formData.numeroDocumento}
                    fechaNacimiento={formData.fechaNacimiento}
                    paisOrigen={formData.paisOrigen}
                    onChange={handleChange}
                    onCountryChange={handleCountryChange}
                />
            }
            contactInputs={
                <ContactInfo
                    correo={formData.correo}
                    celular={formData.celular}
                    contactoEmergencia={formData.contactoEmergencia}
                    celularContacto={formData.celularContacto}
                    onChange={handleChange}
                />
            }
            ubigeoInputs={
                <UbigeoForm
                    currentUbigeo={formData.ubigeoEntity}
                    onUbigeoChange={handleUbigeoChange}
                    direccion={formData.direccion}
                    onDireccionChange={handleChange}
                />
            }
            professionalInputs={
                <ProfessionalInformation
                    currentNivel={formData.nivelProfesionalEntity?.idNivelProfesional || formData.nivelProfesionalEntity?.idNivelProfesionalDto}
                    onNivelChange={handleNivelChange}
                    codigoMedico={formData.idUsuario}
                    // [EXPLICACIÓN ACTUALIZACIÓN] 
                    // Cuando damos clic a un checkbox en el componente hijo (ProfessionalInformation), 
                    // extraemos sus "DTOs resultantes" y los marcamos con una bandera ("huboCambio")
                    // para saber que al darle al botón "Guardar Perfil" debe consumirse nuestro segundo update.
                    onEspecialidadesChange={(esp) => {
                        setEspecialidadesActualizadas(esp);
                        setHuboCambioEspecialidades(true);
                    }}
                />
            }
        />
    );
};