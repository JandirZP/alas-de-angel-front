import React from 'react';

interface Props {
    esActivoSexualmente: boolean;
    setEsActivoSexualmente: (val: boolean) => void;
    edadInicioSexual: number | '';
    setEdadInicioSexual: (val: number | '') => void;
    usaMetodoAnticonceptivo: number;
    setUsaMetodoAnticonceptivo: (val: number) => void;
    metodoPlanificacion: string;
    setMetodoPlanificacion: (val: string) => void;
    tuvoEmbarazos: boolean;
    setTuvoEmbarazos: (val: boolean) => void;
    cantidadGestaciones: number;
    setCantidadGestaciones: (val: number) => void;
    cantidadPartos: number;
    setCantidadPartos: (val: number) => void;
    cantidadAbortos: number;
    setCantidadAbortos: (val: number) => void;
    huboComplicaciones: boolean;
    setHuboComplicaciones: (val: boolean) => void;
    especifiqueComplicaciones: string;
    setEspecifiqueComplicaciones: (val: string) => void;
}

export const SexualityGyneObstetric: React.FC<Props> = ({
    esActivoSexualmente, setEsActivoSexualmente,
    edadInicioSexual, setEdadInicioSexual,
    usaMetodoAnticonceptivo, setUsaMetodoAnticonceptivo,
    metodoPlanificacion, setMetodoPlanificacion,
    tuvoEmbarazos, setTuvoEmbarazos,
    cantidadGestaciones, setCantidadGestaciones,
    cantidadPartos, setCantidadPartos,
    cantidadAbortos, setCantidadAbortos,
    huboComplicaciones, setHuboComplicaciones,
    especifiqueComplicaciones, setEspecifiqueComplicaciones
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sexualidad */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <i className="fa-solid fa-venus-mars text-xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Sexualidad</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700 text-sm">¿Sexualmente Activo/a?</span>
                        <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" checked={esActivoSexualmente} onChange={() => setEsActivoSexualmente(!esActivoSexualmente)} />
                    </div>

                    {esActivoSexualmente && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Edad de Inicio Sexual</label>
                                <input
                                    type="number"
                                    value={edadInicioSexual}
                                    onChange={(e) => setEdadInicioSexual(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Método Anticonceptivo / Planificación</label>
                                <div className="flex gap-2">
                                    <select
                                        value={usaMetodoAnticonceptivo}
                                        onChange={(e) => setUsaMetodoAnticonceptivo(Number(e.target.value))}
                                        className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-emerald-500/50 w-1/3"
                                    >
                                        <option value={1}>Sí usa</option>
                                        <option value={0}>No usa</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={metodoPlanificacion}
                                        onChange={(e) => setMetodoPlanificacion(e.target.value)}
                                        disabled={usaMetodoAnticonceptivo === 0}
                                        className={`w-2/3 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 ${usaMetodoAnticonceptivo === 0 ? 'bg-slate-100 opacity-50' : 'bg-slate-50'}`}
                                        placeholder={usaMetodoAnticonceptivo === 0 ? "N/A" : "Especifique el método..."}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Gineco-Obstétrico */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
                        <i className="fa-solid fa-baby text-xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Gineco-Obstétrico</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700 text-sm">¿Tuvo embarazos previos?</span>
                        <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" checked={tuvoEmbarazos} onChange={() => setTuvoEmbarazos(!tuvoEmbarazos)} />
                    </div>

                    <div className={`space-y-4 transition-all duration-300 ${tuvoEmbarazos ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Gestaciones</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={cantidadGestaciones}
                                    onChange={(e) => setCantidadGestaciones(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Partos (Vivos)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={cantidadPartos}
                                    onChange={(e) => setCantidadPartos(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Abortos</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={cantidadAbortos}
                                    onChange={(e) => setCantidadAbortos(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={huboComplicaciones}
                                    onChange={() => setHuboComplicaciones(!huboComplicaciones)}
                                    className="rounded text-rose-500 focus:ring-rose-500 w-4 h-4"
                                />
                                Hubo complicaciones en el parto
                            </label>
                            <input
                                type="text"
                                value={especifiqueComplicaciones}
                                onChange={(e) => setEspecifiqueComplicaciones(e.target.value)}
                                disabled={!huboComplicaciones}
                                className={`w-full border border-slate-200 text-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/50 ${!huboComplicaciones ? 'bg-slate-100 opacity-50' : 'bg-slate-50'}`}
                                placeholder={huboComplicaciones ? "Especifique complicaciones..." : "N/A"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
