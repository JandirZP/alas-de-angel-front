import { useRef, useState } from "react";
import type { Usuario } from "../types/models";
import { usuarioService } from "../services/usuario.service";
import { toast } from "sonner";

interface Props {
  user: Usuario;
  onFotoActualizada: (nuevaUrl: string) => void; // Para avisarle al Dashboard que refresque la foto
}

export const AvatarSelector = ({ user, onFotoActualizada }: Props) => {
  const [subiendo, setSubiendo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL por defecto si el usuario no tiene foto
  const defaultAvatar = "https://ui-avatars.com/api/?name=" + user.nombres + "+" + user.apellidoPaterno + "&background=random";

  // Usamos la foto de Cloudinary o la default
  const imagenMostrar = user.fotoUrl || defaultAvatar;

  const handleClick = () => {
    fileInputRef.current?.click(); // Simulamos clic en el input invisible
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setSubiendo(true);

    try {
      // Llamamos al servicio
      const respuesta = await usuarioService.subirFoto(user.idUsuario, file);

      toast.success("Foto de perfil actualizada");
      onFotoActualizada(respuesta.url); // Actualizamos la vista sin recargar
    } catch (error) {
      console.error(error);
      toast.error("Error al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="relative w-fit group cursor-pointer" onClick={handleClick}>

      {/* 1. La Imagen */}
      <img
        src={imagenMostrar}
        alt="Perfil"
        className={`w-56 h-56 rounded-br-full rounded-tr-full object-cover border-4 border-white shadow-lg transition-opacity
            ${subiendo ? 'opacity-50' : 'opacity-100'}
        `}
      />

      {/* 2. Overlay al pasar el mouse (Efecto Hover) */}
      <div className="absolute inset-0 bg-black/40 w-56 h-56 rounded-br-full rounded-tr-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <i className="fa-solid fa-camera text-white text-2xl"></i>
      </div>

      {/* 3. Spinner de carga (si está subiendo) */}
      {subiendo && (
        <div className="absolute inset-0 flex items-center justify-center w-56 h-56 rounded-br-full rounded-tr-full">
          <i className="fa-solid fa-circle-notch fa-spin text-emerald-400 text-3xl"></i>
        </div>
      )}

      {/* 4. Input invisible (el truco) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};