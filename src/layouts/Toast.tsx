// src/components/ui/ToastLayouts.tsx

interface ToastProps {
  title: string;
  subtitle?: string; // Opcional 
}

// 1. Layout de Carga (Spinner)
export const ToastLoading = ({ title, subtitle }: ToastProps) => {
  return (
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-circle-notch fa-spin text-2xl text-emerald-600"></i>
      <div className="flex flex-col">
        <span className="font-bold text-gray-700">{title}</span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
};

// 2. Layout de Éxito (Verde / Thumbs up)
export const ToastSuccess = ({ title, subtitle }: ToastProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl text-green-800">
        <i className="fa-solid fa-thumbs-up"></i>
      </span>
      <div>
        <p className="font-bold text-blue-900">{title}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );
};

// 3. Layout de Error (Rojo / Candado o Alerta)
export const ToastError = ({ title, subtitle, iconType = 'lock' }: ToastProps & { iconType?: 'lock' | 'wifi' }) => {
  // Decidimos qué icono mostrar según el tipo de error
  const iconClass = iconType === 'lock' ? "fa-lock" : "fa-triangle-exclamation";
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl text-amber-500">
        <i className={`fa-solid ${iconClass}`}></i>
      </span>
      <div>
        <p className="font-bold text-red-600">{title}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );
};