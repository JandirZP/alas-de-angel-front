import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Cita, Usuario } from "../../../types/models";
import { Modal } from "../../../layouts/Modals";
import { toast } from "sonner";
import { triajeService } from "../../../services/triaje.service";

interface Props {
    citas: Cita[];
    enfermera: Usuario;
    onBuscarCitasPorDocumento: (numeroDocumento: string) => void;
    onLimpiarCitas: () => void;
    onTriajeGuardado: () => void;
}

export const Triaje = ({ citas, enfermera, onBuscarCitasPorDocumento, onLimpiarCitas, onTriajeGuardado }: Props) => {
    const navigate = useNavigate();

    // 1. Conseguimos la fecha actual (solo para comparar día/mes/año)
    const fechaActual = new Date();

    // 2. Filtramos la lista gigante de citas
    const proximasCitas = citas.filter((cita) => {
        const fechaCita = new Date(cita.fechaHora);


        // Es una cita válida si: No está eliminada, no pasó por triaje, y es de hoy
        return cita.estado === true &&
            cita.atendidoEnTriaje !== true &&
            fechaCita.getDate() === fechaActual.getDate() &&
            fechaCita.getMonth() === fechaActual.getMonth() &&
            fechaCita.getFullYear() === fechaActual.getFullYear();
    }).sort((a, b) => {
        const horaA = new Date(a.fechaHora).getTime();
        const horaB = new Date(b.fechaHora).getTime();
        return horaA - horaB;
    });

    //BUSCAR POR DOCUMENTO
    const [documento, setDocumento] = useState('');



    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        onBuscarCitasPorDocumento(documento);
        if (documento === '') {
            onLimpiarCitas();
        }
    };

    //MODAL
    const [mostrarModal, setMostrarModal] = useState(false);

    //GUARDAR
    //Estados del Triaje
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [presionArterial, setPresionArterial] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [altura, setAltura] = useState('');
    const [tieneFiebre, setTieneFiebre] = useState(false);
    const [fechaUltimaRegla, setFechaUltimaRegla] = useState('');
    const [estaEmbarazada, setEstaEmbarazada] = useState(false);
    const [semanasGestacion, setSemanasGestacion] = useState('');
    const [guardando, setGuardando] = useState(false);


    const hundleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!citaSeleccionada) return;
        if (!peso || !presionArterial || !temperatura || !altura || !tieneFiebre) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        setGuardando(true);


        // Quiero que la fecha sea la fecha y la hora en la que se guarda
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const fechaHoraFormateada = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        const esMujer = citaSeleccionada.sexoPaciente === false;

        const triajePayload = {
            cita: { idCita: citaSeleccionada.idCita },
            enfermera: { idUsuario: enfermera.idUsuario },
            fechaHora: fechaHoraFormateada,
            peso: parseFloat(peso),
            talla: parseFloat(talla),
            presionArterial: presionArterial,
            temperatura: parseFloat(temperatura),
            altura: parseFloat(altura),
            tieneFiebre: tieneFiebre,
            fechaUltimaRegla: esMujer ? (fechaUltimaRegla ? fechaUltimaRegla : null) : null,
            estaEmbarazada: esMujer ? (estaEmbarazada ? estaEmbarazada : null) : null,
            semanasGestacion: esMujer ? (semanasGestacion ? parseInt(semanasGestacion) : null) : null,
            estado: true
        };

        try {
            await triajeService.guardarTriaje(triajePayload);
            toast.success("Triaje guardado exitosamente");
            setMostrarModal(false);
            onTriajeGuardado();
            setCitaSeleccionada(null);
            setPeso('');
            setTalla('');
            setPresionArterial('');
            setTemperatura('');
            setAltura('');
            setTieneFiebre(false);

            //opcionales porque si el paciente es varon no tiene sentido preguntar si esta embarazada
            setFechaUltimaRegla('');
            setEstaEmbarazada(false);
            setSemanasGestacion('');

        } catch (error) {
            console.error("Error al guardar el triaje:", error);
            toast.error("Error al guardar el triaje");
        } finally {
            setGuardando(false);
        }





    }

    return (
        <>
            <div className="p-6 max-w-7xl mx-auto mt-6 flex-1 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-900">Triaje</h1>
                    <button 
                        onClick={() => navigate('/DashboardNurse', { state: { view: 'home' } })} 
                        className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 font-semibold transition-colors flex items-center gap-2"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Cancelar
                    </button>
                </div>

                {/* Buscar Citas por numero de documento */}
                <div className="mb-6 justify-center">
                    <form onSubmit={handleBuscar} className="flex gap-2">
                        <input value={documento} onChange={(e) => setDocumento(e.target.value)} type="text" placeholder="Buscar Citas por numero de documento" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Buscar</button>
                    </form>

                </div>
                <div className="overflow-x-auto">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Citas de hoy: {proximasCitas.length}</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-lg text-emerald-600">
                                <th className="px-6 py-3 font-semibold">Hora</th>
                                <th className="px-6 py-3 font-semibold">Paciente</th>
                                <th className="px-6 py-3 font-semibold">Documento</th>
                                <th className="px-6 py-3 font-semibold">Motivo</th>
                                <th className="px-6 py-3 font-semibold">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proximasCitas.map((cita) => {
                                const horaFormateada = new Date(cita.fechaHora).toLocaleTimeString('es-PE', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                                return (
                                    <tr key={cita.idCita} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-orange-600 font-semibold">{horaFormateada}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{cita.nombrePaciente} {cita.apellidoPatPaciente} {cita.apellidoMatPaciente}</td>
                                        <td className="px-6 py-4 text-gray-500">{cita.tipoDocumento} {cita.numeroDocumento}</td>
                                        <td className="px-6 py-4 text-gray-500">{cita.motivo}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => { setMostrarModal(true); setCitaSeleccionada(cita) }} className="text-cyan-600 font-medium hover:text-cyan-800 hover:underline">
                                                Iniciar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        {proximasCitas.length === 0 && (
                            <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No hay más pacientes en espera para hoy.
                                </td>
                            </tr>
                        )}

                    </table>



                </div>
                <Modal onClose={() => setMostrarModal(false)} visible={mostrarModal}>
                    <div>
                        <div className="text-center text-2xl text-orange-600 font-bold pb-6">Insertamos el Triaje del Paciente</div>
                        <div>
                            <form onSubmit={hundleSubmit}>
                                <div className="grid gap-6 mb-6 md:grid-cols-3">

                                    {/* Peso */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Peso (kg)</label>
                                        <input
                                            type="number"
                                            name="peso"
                                            step="0.01"
                                            required
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                            placeholder="Ej: 7050 para 70.50"
                                            onBlur={(e) => {
                                                const val = e.target.value;
                                                if (val && !val.includes('.')) {
                                                    const newValue = (parseFloat(val) / 100).toFixed(2);
                                                    e.target.value = newValue;   // Actualiza visualmente
                                                    setPeso(newValue);         // ESTA LÍNEA FALTABA: Actualiza la variable de estado!
                                                }
                                            }}
                                            value={peso}
                                            onChange={(e) => setPeso(e.target.value)}
                                        />
                                    </div>

                                    {/* Altura */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Altura (m)</label>
                                        <input
                                            type="number"
                                            name="altura"
                                            step="0.01"
                                            required
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                            placeholder="Ej: 175 para 1.75"
                                            onBlur={(e) => {
                                                const val = e.target.value;
                                                if (val && !val.includes('.')) {
                                                    const newValue = (parseFloat(val) / 100).toFixed(2);
                                                    e.target.value = newValue;   // Actualiza visualmente
                                                    setAltura(newValue);         // ESTA LÍNEA FALTABA: Actualiza la variable de estado!
                                                }
                                            }}

                                            value={altura}
                                            onChange={(e) => setAltura(e.target.value)}
                                        />
                                    </div>

                                    {/* Presión Arterial */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Presión arterial</label>
                                        <input
                                            type="text"
                                            name="presionArterial"
                                            required
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                            placeholder="Ej: 120/80"
                                            value={presionArterial}
                                            onChange={(e) => setPresionArterial(e.target.value)}
                                        />
                                    </div>

                                    {/* Temperatura */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Temperatura (°C)</label>
                                        <input
                                            type="number"
                                            name="temperatura"
                                            step="0.1"
                                            required
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                            placeholder="Ej: 375 para 37.5"
                                            onBlur={(e) => {
                                                const val = e.target.value;
                                                if (val && !val.includes('.')) {
                                                    const newValue = (parseFloat(val) / 10).toFixed(1);
                                                    e.target.value = newValue;   // Actualiza visualmente
                                                    setTemperatura(newValue);         // ESTA LÍNEA FALTABA: Actualiza la variable de estado!
                                                }
                                            }}
                                            value={temperatura}
                                            onChange={(e) => setTemperatura(e.target.value)}
                                        />
                                    </div>

                                    {/* Fiebre */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">¿Tiene fiebre?</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <label className="text-blue-800 font-semibold text-lg">Sí</label>
                                            <input
                                                type="checkbox"
                                                name="fiebre"
                                                className="w-6 h-6 text-emerald-600 rounded focus:ring-emerald-500"
                                                checked={tieneFiebre}
                                                onChange={(e) => setTieneFiebre(e.target.checked)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Fecha de última regla */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Fecha de última regla*</label>
                                        <input
                                            type="date"
                                            name="fechaUltimaRegla"
                                            value={fechaUltimaRegla}
                                            onChange={(e) => setFechaUltimaRegla(e.target.value)}
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                        />
                                    </div>

                                    {/* Embarazada */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">¿Está embarazada?*</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <label className="text-blue-800 font-semibold text-lg">Sí</label>
                                            <input
                                                type="checkbox"
                                                name="embarazada"
                                                className="w-6 h-6 text-emerald-600 rounded focus:ring-emerald-500"
                                                checked={estaEmbarazada}
                                                onChange={(e) => setEstaEmbarazada(e.target.checked)}
                                            />
                                        </div>
                                    </div>

                                    {/* Semanas de gestación */}
                                    <div>
                                        <label className="block text-lg font-semibold text-emerald-600">Semanas de gestación*</label>
                                        <input
                                            type="number"
                                            name="semanasGestacion"
                                            className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none text-blue-800 px-2 py-1 w-full"
                                            value={semanasGestacion}
                                            onChange={(e) => setSemanasGestacion(e.target.value)}
                                        />
                                    </div>



                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 font-semibold transition-colors">
                                        {guardando ? (
                                            <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Guardando...</>
                                        ) : ("Guardar")}
                                    </button>
                                </div>
                            </form>
                            <p className="text-blue-800 font-semibold text-sm pt-4">* Campos opcionales</p>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    );
};