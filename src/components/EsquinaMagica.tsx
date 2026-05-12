type EsquinaProps = {
  lado: 'izquierda' | 'derecha';
  colorHex: string; // Ejemplo: "#f3f4f6" o "white"
};

export const EsquinaMagica = ({ lado, colorHex }: EsquinaProps) => {
  
  // 1. Definimos la forma (Esto SÍ lo maneja Tailwind)
  const clasesForma = lado === 'izquierda' 
    ? "-left-4 rounded-br-xl" 
    : "-right-4 rounded-bl-xl";

  // 2. Definimos la dirección de la sombra manualmente
  const xOffset = lado === 'izquierda' ? '4px' : '-4px';

  // 3. Creamos el estilo de la sombra usando JavaScript puro
  // Sintaxis CSS: box-shadow: x y blur spread color
  const estiloSombra = {
    boxShadow: `${xOffset} 4px 0 0 ${colorHex}`
  };

  return (
    <div 
      // Tailwind se encarga de la posición y el tamaño
      className={`absolute bottom-0 w-4 h-4 bg-transparent pointer-events-none ${clasesForma}`}
      // React inyecta el color directamente en el navegador
      style={estiloSombra} 
    />
  );
};