import { useEffect, useState } from "react";
import type { Especialidad, NivelProfesional } from "../../types/models";
import { NivelProfesionalService } from "../../services/nivelProfesional.service";
import { usuarioService } from "../../services/usuario.service";

interface Props {
    currentNivel?: number;
    onNivelChange?: (nivel: NivelProfesional) => void;
    codigoMedico?: number;
    onEspecialidadesChange?: (especialidades: Especialidad[]) => void;
}

const ProfessionalInformation = ({ currentNivel, onNivelChange, codigoMedico, onEspecialidadesChange }: Props) => {
    const [nivelesList, setNivelesList] = useState<NivelProfesional[]>([]);
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");
    const [misEspecialidadesList, setMisEspecialidadesList] = useState<Especialidad[]>([]);
    const [especialidadesList, setEspecialidadesList] = useState<Especialidad[]>([]);


    //Niveles
    useEffect(() => {
        const cargarNiveles = async () => {
            const niveles = await NivelProfesionalService.BuscarNivelesActivos();
            setNivelesList(niveles);
        };
        cargarNiveles();
    }, []);

    useEffect(() => {
        if (currentNivel) {
            setNivelSeleccionado(currentNivel.toString());
        }
    }, [currentNivel]);

    const handleNivelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const nivel = nivelesList.find((n) => (n.idNivelProfesionalDto || n.idNivelProfesional)?.toString() === id);
        if (nivel) {
            setNivelSeleccionado(id);
            onNivelChange?.(nivel);
        }
    };

    //Especialidades
    useEffect(() => {
        const cargarCurrentEspecialidades = async () => {
            if (codigoMedico !== undefined) {
                const misEspecialidades = await usuarioService.getEspecialidadesPorMedico(codigoMedico);
                setMisEspecialidadesList(misEspecialidades);
            }
        };
        cargarCurrentEspecialidades();
    }, [codigoMedico]);


    useEffect(() => {
        const cargarEspecialidades = async () => {
            const especialidades = await usuarioService.getEspecialidades();
            setEspecialidadesList(especialidades);
        };
        cargarEspecialidades();
    }, []);

    //Checkbox
    const [idsSeleccionadas, setIdsSeleccionadas] = useState<number[]>([]);

    // Sincronizamos las especialidades seleccionadas apenas llegan del backend
    useEffect(() => {
        if (misEspecialidadesList.length > 0) {
            const ids = misEspecialidadesList
                .map(e => e.codigo)
                .filter((id): id is number => id !== undefined);
            setIdsSeleccionadas(ids);
        }
    }, [misEspecialidadesList]);

    const toggleEspecialidad = (id: number) => {
        setIdsSeleccionadas(prevIds => {
            let newIds: number[];
            if (prevIds.includes(id)) {
                 // Si el ID ya existe, lo sacamos de la lista local (checkbox se apaga)
                newIds = prevIds.filter(prevId => prevId !== id);
            } else {
                 // Si el ID no existe, lo agregamos a la lista local (checkbox se enciende)
                newIds = [...prevIds, id];
            }
            
            // [EXPLICACIÓN ACTUALIZACIÓN] 
            // Si el componente padre (ProfileDoctor) nos pasó la función onEspecialidadesChange por Props, 
            // mapeamos y transformamos nuestra lista de IDs numéricos simples en objetos completos de especialidades (DTOs).
            // Luego los mandamos al padre (Lift State Up) para que ahí los guarde en memoria hasta dar clic a "Guardar Perfil".
            if (onEspecialidadesChange) {
                // Filtramos las especialidades que coincidan para enviar DTOs completos
                const seleccionadas = especialidadesList.filter(e => e.codigo !== undefined && newIds.includes(e.codigo));
                onEspecialidadesChange(seleccionadas);
            }
            
            return newIds;
        });
    };

    const especialidadesParaTextArea = especialidadesList
        .filter(esp => esp.codigo !== undefined && idsSeleccionadas.includes(esp.codigo))
        .map(esp => `- ${esp.nombre}`)
        .join("\n");

    return (

        <>
            <div className="mt-6 w-full text-lg text-blue-950 font-semibold pl-4">
                <div className="pb-2 text-2xl font-bold text-orange-600 mb-4">Información Profesional</div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-fit mx-auto">
                        <div className="mb-2">NivelProfesional: </div>


                        <select
                            name="nivelProfesional"
                            id="nivelProfesional"
                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1"
                            value={nivelSeleccionado || "0"}
                            onChange={handleNivelChange}
                        >
                            <option value="0" disabled>Seleccione un nivel profesional</option>
                            {nivelesList.map((nivel) => {
                                const idNivel = nivel.idNivelProfesionalDto || nivel.idNivelProfesional;
                                const nombre = nivel.nombreDto || nivel.nombre;
                                return (
                                    <option key={idNivel} value={idNivel}>
                                        {nombre}
                                    </option>
                                );
                            })}
                        </select>

                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="mb-2">Especialidades existentes: </div>


                            <div className="w-70 h-20 border border-emerald-900 rounded-xl pl-2 bg-blue-100 overflow-hidden">
                                <div className="h-full overflow-auto p-1.5">
                                    <ul>
                                        {especialidadesList.map((esp) => {
                                            if (esp.codigo === undefined) return null;
                                            return (
                                                <li key={esp.codigo} className="mb-1 flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`espe-${esp.codigo}`}
                                                        className="rounded-md border-2 border-emerald-900 accent-blue-600 mr-2 cursor-pointer"
                                                        checked={idsSeleccionadas.includes(esp.codigo)}
                                                        onChange={() => toggleEspecialidad(esp.codigo as number)}
                                                    />
                                                    <label htmlFor={`espe-${esp.codigo}`} className="text-blue-800 select-none cursor-pointer">
                                                        {esp.nombre}
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>


                        </div>
                        <div>
                            <div className="mb-2">Mis especialidades: </div>
                            <div className="overflow-hidden rounded-xl border border-emerald-900 bg-blue-100 
                                focus:bg-blue-50 focus:outline-none text-emerald-900 h-20 w-70">
                                <textarea
                                    readOnly
                                    className="px-2 py-1 h-20 w-70 overflow-auto"
                                    value={especialidadesParaTextArea}
                                />
                            </div>




                        </div>
                    </div>




                </div>

            </div>



        </>
    );

};
export default ProfessionalInformation;