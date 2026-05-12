import { useState, useEffect } from "react";
import type { Ubigeo } from "../../../types/models";
import { ubigeoService } from "../../../services/ubigeo.service";

export const useInsertPatientLogic = (setFormData: any) => {
    // --- ESTADOS DE LAS LISTAS (Opciones de los Selects) ---
    const [departamentos, setDepartamentos] = useState<string[]>([]);
    const [provincias, setProvincias] = useState<string[]>([]);
    const [distritos, setDistritos] = useState<Ubigeo[]>([]);

    // --- ESTADOS DE LA SELECCIÓN (Lo que el usuario ve elegido) ---
    const [selectedDep, setSelectedDep] = useState("");
    const [selectedProv, setSelectedProv] = useState("");

    // 1. CARGA INICIAL: Traer Departamentos
    useEffect(() => {
        ubigeoService.getDepartamentos().then((data) => setDepartamentos(data));
    }, []);

    // 2. CUANDO CAMBIA EL DEPARTAMENTO -> Cargar Provincias
    useEffect(() => {
        if (!selectedDep) {
            setProvincias([]);
            setDistritos([]);
            return;
        }
        ubigeoService.getProvincias(selectedDep).then((data) => setProvincias(data));
    }, [selectedDep]);

    // 3. CUANDO CAMBIA LA PROVINCIA -> Cargar Distritos
    useEffect(() => {
        if (!selectedDep || !selectedProv) {
            setDistritos([]);
            return;
        }
        ubigeoService.getDistritos(selectedDep, selectedProv).then((data) => setDistritos(data));
    }, [selectedDep, selectedProv]);

    // A. Cambió DEPARTAMENTO
    const handleDepChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const dep = e.target.value;
        setSelectedDep(dep);

        // Actualizamos visualmente en el state del formulario
        setFormData((prev: any) => ({
            ...prev,
            ubigeoEntity: {
                ...prev.ubigeoEntity,
                departamento: dep,
                provincia: "",
                distrito: "",
                idUbigeo: "",
                codigoUbigeo: ""
            }
        }));

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

        // Actualizamos visualmente en el state del formulario
        setFormData((prev: any) => ({
            ...prev,
            ubigeoEntity: {
                ...prev.ubigeoEntity,
                provincia: prov,
                distrito: "",
                idUbigeo: "",
                codigoUbigeo: ""
            }
        }));

        // Reset de hijos
        setDistritos([]);

        if (selectedDep && prov) {
            const data = await ubigeoService.getDistritos(selectedDep, prov);
            setDistritos(data);
        }
    };

    // C. Cambió DISTRITO
    const handleDistritoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const distritoIdStr = e.target.value;

        if (distritoIdStr && distritos) {
            const idNum = parseInt(distritoIdStr);
            const distObj = distritos.find(d => d.idUbigeo === idNum);

            if (distObj) {
                setFormData((prev: any) => ({
                    ...prev,
                    ubigeoEntity: {
                        idUbigeo: idNum.toString(),
                        departamento: distObj.departamento,
                        provincia: distObj.provincia,
                        distrito: distObj.distrito,
                    }
                }));
            }
        } else {
            setFormData((prev: any) => ({
                ...prev,
                ubigeoEntity: {
                    ...prev.ubigeoEntity,
                    idUbigeo: "",
                    distrito: "",
                    codigoUbigeo: ""
                }
            }));
        }
    };

    return {
        departamentos,
        provincias,
        distritos,
        handleDepChange,
        handleProvChange,
        handleDistritoChange
    };
};
