import { useState, useEffect } from "react";

/**
 * Hook Genérico de Colecciones (Divide y Vencerás).
 * T representa la interfaz del dato (Alergia, Cirugia, etc.)
 * Esto evita que repitamos la misma lógica de (añadir, remover, actualizar) x4 veces en EditMedicalRecord.
 */
export function useFormList<T extends { id?: number }>(initialItems: T[] = []) {
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    // Omitimos el 'id' (porque lo generaremos como algo negativo temporario para frontend) y el 'historiaClinicaId' que se llena en backend.
    const add = (item: Omit<T, 'id' | 'historiaClinicaId'>) => {
        // Usamos -Date.now() como bandera para decirle a submitService "Este ID negativo es un recurso nuevo que debes crear (POST)".
        setItems((prev) => [...prev, { ...item, id: -Date.now() } as unknown as T]);
    };

    const remove = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateItem = (id: number, field: string, value: any) => {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    };

    return { items, add, remove, updateItem };
}