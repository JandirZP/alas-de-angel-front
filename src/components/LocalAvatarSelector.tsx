import { useRef, useState } from "react";

interface Props {
  nombres: string;
  apellidoPaterno: string;
  onFileSelected: (file: File | null) => void; 
}

export const LocalAvatarSelector = ({ nombres, apellidoPaterno, onFileSelected }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL por defecto con las iniciales si no ha subido foto
  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (nombres || "N") + "+" + (apellidoPaterno || "P") + "&background=random";

  // Mostrar la preview local o el default
  const imagenMostrar = previewUrl || defaultAvatar;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    
    // Crear una URL temporal para mostrarla inmediatamente en pantalla
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    // Le pasamos el archivo real al componente padre (InsertPatient)
    onFileSelected(file);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 w-full text-center flex justify-center items-center gap-2">
        <i className="fa-solid fa-camera text-blue-500"></i> Foto de Perfil
      </h3>

      <div className="relative w-fit group cursor-pointer" onClick={handleClick}>
        <img
          src={imagenMostrar}
          alt="Preview Perfil"
          className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg transition-opacity"
        />

        <div className="absolute inset-0 bg-black/40 w-48 h-48 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <i className="fa-solid fa-upload text-white text-3xl"></i>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">
        Haz clic en la imagen para subir una foto.<br/>(Formatos recomendados: JPG, PNG)
      </p>
    </div>
  );
};
