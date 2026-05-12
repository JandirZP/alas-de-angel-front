import { useEffect, useState } from "react";
import type { Ubigeo, Usuario } from "../../../types/models";
import { usuarioService } from "../../../services/usuario.service";
import { toast } from "sonner";
import UserFormLayout from "../../../layouts/UserFormLayout";
import { AvatarSelector } from "../../../components/AvatarSelector";
import PersonalInfo1 from "../../../layouts/profile/PersonalInfo1";
import PersonalInfo2 from "../../../layouts/profile/PersonalInfo2";
import ContactInfo from "../../../layouts/profile/ContactInfo";
import UbigeoForm from "../../../layouts/profile/UbigeoForm";

export const ProfileNurse = ({ onUpdateSuccess }: { onUpdateSuccess: () => void }) => {
    const [formData, setFormData] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

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

    const handleSave = async () => {
        if (!formData) return;
        try {
            await usuarioService.updatePerfil(formData);
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
        />
    );
};