import Hashids from 'hashids';

// Configuramos una "palabra secreta" (Salt) para que tus códigos sean únicos.
// El padding de 8 asegura que todos los IDs generados tengan al menos 8 caracteres.
const hashids = new Hashids('AlasDeAngelSecretSalt', 8);

// Convierte tu ID numérico (Ej. 24) a un código corto único (Ej. "x8aKLp9M")
export const encodeId = (id: number): string => {
    return hashids.encode(id);
};

// Convierte un código corto (Ej. "x8aKLp9M") de vuelta a tu ID numérico original (Ej. 24)
export const decodeId = (hash: string): number | null => {
    const decoded = hashids.decode(hash);
    if (decoded && decoded.length > 0) {
        return Number(decoded[0]);
    }
    return null;
};
