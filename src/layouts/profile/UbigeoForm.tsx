import { useEffect, useState } from "react";
import type { Ubigeo } from "../../types/models";
import { ubigeoService } from "../../services/ubigeo.service";

interface Props {
    currentUbigeo?: Ubigeo;           // El valor actual que viene de la BD (si existe)
    onUbigeoChange: (ubigeo: Ubigeo) => void; // Función para avisar al padre que seleccionaste algo
    direccion: string;                // Texto de la dirección
    onDireccionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UbigeoForm = ({ currentUbigeo, onUbigeoChange, direccion, onDireccionChange }: Props) => {
    
    // --- ESTADOS DE LAS LISTAS (Opciones de los Selects) ---
    const [departamentos, setDepartamentos] = useState<string[]>([]);
    const [provincias, setProvincias] = useState<string[]>([]);
    const [distritos, setDistritos] = useState<Ubigeo[]>([]);

    // --- ESTADOS DE LA SELECCIÓN (Lo que el usuario ve elegido) ---
    const [selectedDep, setSelectedDep] = useState("");
    const [selectedProv, setSelectedProv] = useState("");
    // El distrito seleccionado se maneja directo con currentUbigeo?.idUbigeo

    // 1. CARGA INICIAL: Traer Departamentos
    useEffect(() => {
        ubigeoService.getDepartamentos().then((data) => setDepartamentos(data));
    }, []);

    // 2. PRE-CARGA: Si el usuario ya tiene datos (Editar Perfil), llenar los selects
    useEffect(() => {
        if (currentUbigeo && currentUbigeo.departamento) {
            // A. Ponemos los valores visuales
            setSelectedDep(currentUbigeo.departamento);
            setSelectedProv(currentUbigeo.provincia);

            // B. Cargamos las listas ocultas para que los selects funcionen
            ubigeoService.getProvincias(currentUbigeo.departamento).then(setProvincias);
            ubigeoService.getDistritos(currentUbigeo.departamento, currentUbigeo.provincia).then(setDistritos);
        }
    }, [currentUbigeo?.idUbigeo]); // Solo corre si cambia el ID del ubigeo base

    // --- MANEJADORES DE CAMBIO (CASCADA) ---

    // A. Cambió DEPARTAMENTO
    const handleDepChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dep = e.target.value;
        setSelectedDep(dep);
        
        // Reset de hijos
        setSelectedProv("");
        setProvincias([]);
        setDistritos([]);

        if (dep) {
            const data = await ubigeoService.getProvincias(dep);
            setProvincias(data);
        }
    };

    // B. Cambió PROVINCIA
    const handleProvChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const prov = e.target.value;
        setSelectedProv(prov);
        
        // Reset de hijos
        setDistritos([]);

        if (selectedDep && prov) {
            const data = await ubigeoService.getDistritos(selectedDep, prov);
            setDistritos(data);
        }
    };

    // C. Cambió DISTRITO (Aquí es donde elegimos el ID FINAL)
    const handleDistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idSeleccionado = Number(e.target.value);
        
        // Buscamos el objeto Ubigeo completo usando el ID
        const ubigeoEncontrado = distritos.find(d => d.idUbigeo === idSeleccionado);
        
        if (ubigeoEncontrado) {
            // ¡BINGO! Le avisamos al padre que este es el nuevo Ubigeo
            onUbigeoChange(ubigeoEncontrado);
        }
    };

    return (
        <>
            <div className="col-span-3">
                <label>Dirección: </label>
                <br />
                <input
                    type="text"
                    name="direccion"
                    value={direccion || ""}
                    onChange={onDireccionChange}
                    className="w-96 rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1"
                />
            </div>

            {/* DEPARTAMENTO */}
            <div>
                <label>Departamento: </label>
                <br />
                <select 
                    value={selectedDep} 
                    onChange={handleDepChange}
                    className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 w-full"
                >
                    <option value="">-- Seleccione --</option>
                    {departamentos.map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>
            </div>

            {/* PROVINCIA */}
            <div>
                <label>Provincia: </label>
                <br />
                <select 
                    value={selectedProv} 
                    onChange={handleProvChange}
                    disabled={!selectedDep} // Deshabilitado si no hay departamento
                    className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 w-full disabled:opacity-50"
                >
                    <option value="">-- Seleccione --</option>
                    {provincias.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                    ))}
                </select>
            </div>

            {/* DISTRITO */}
            <div>
                <label>Distrito: </label>
                <br />
                <select 
                    value={currentUbigeo?.idUbigeo || ""} 
                    onChange={handleDistChange}
                    disabled={!selectedProv} // Deshabilitado si no hay provincia
                    className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 w-full disabled:opacity-50"
                >
                    <option value="">-- Seleccione --</option>
                    {distritos.map((dist) => (
                        <option key={dist.idUbigeo} value={dist.idUbigeo}>
                            {dist.distrito}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default UbigeoForm;
