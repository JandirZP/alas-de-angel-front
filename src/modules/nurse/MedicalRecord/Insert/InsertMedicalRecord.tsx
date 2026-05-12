
import { useInsertMedicalRecord } from "./useInsertMedicalRecord";
import { BasicBiologicalData } from "./Sections/BasicBiologicalData";
import { InheritanceHistory } from "./Sections/InheritanceHistory";
import { HabitsAndLifestyle } from "./Sections/HabitsAndLifestyle";
import { SexualityGyneObstetric } from "./Sections/SexualityGyneObstetric";
import { DetailTables } from "./Sections/DetailTables";

export const InsertMedicalRecord = () => {
    const {
        searchQuery, setSearchQuery,
        searchStatus,
        patientData,
        handleSearch,
        handleResetSearch,
        isSaving,
        saveMessage,
        handleSave,
        grupoSanguineo, setGrupoSanguineo,
        factorRH, setFactorRH,
        tieneAntecedentesFamiliares, setTieneAntecedentesFamiliares,
        especifiqueAnteFamil, setEspecifiqueAnteFamil,
        estadoAlcohol, setEstadoAlcohol,
        frecuenciaAlcohol, setFrecuenciaAlcohol,
        estadoTabaco, setEstadoTabaco,
        frecuenciaTabaco, setFrecuenciaTabaco,
        consumeDrogas, setConsumeDrogas,
        esActivoSexualmente, setEsActivoSexualmente,
        edadInicioSexual, setEdadInicioSexual,
        usaMetodoAnticonceptivo, setUsaMetodoAnticonceptivo,
        metodoPlanificacion, setMetodoPlanificacion,
        tuvoEmbarazos, setTuvoEmbarazos,
        cantidadGestaciones, setCantidadGestaciones,
        cantidadPartos, setCantidadPartos,
        cantidadAbortos, setCantidadAbortos,
        huboComplicaciones, setHuboComplicaciones,
        especifiqueComplicaciones, setEspecifiqueComplicaciones,
        alergiasList, setAlergiasList,
        antecedentesPatologicosList, setAntecedentesPatologicosList,
        antecedentesQuirurgicosList, setAntecedentesQuirurgicosList,
        drogasList, setDrogasList
    } = useInsertMedicalRecord();

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">
            {/* ENCABEZADO */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 drop-shadow-md" src="/icono-hospital.svg" alt="Logo Hospital" />
                        <div>
                            <h1 className="font-bold text-2xl italic text-emerald-600 [text-shadow:1px_1px_2px_rgba(0,0,0,0.1)]">Alas de Angel</h1>
                            <p className="text-sm text-slate-500 font-medium">Registro de Historia Clínica</p>
                        </div>
                    </div>

                    {searchStatus === "found" && patientData && (
                        <div className="hidden sm:flex items-center gap-4 animate-fade-in">
                            <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
                                <i className="fa-regular fa-user text-emerald-600 bg-white p-1.5 rounded-full shadow-sm"></i>
                                <span className="text-sm font-bold text-emerald-900">
                                    Paciente: {patientData.nombres + " " + patientData.apellidoPaterno}
                                    <span className="text-emerald-600 font-medium ml-1">(ID: {patientData.idUsuario})</span>
                                </span>
                            </div>
                            <button
                                onClick={handleResetSearch}
                                className="text-sm text-slate-500 hover:text-rose-600 underline underline-offset-2 transition-colors"
                            >
                                Cambiar
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                {/* === PANTALLA DE BÚSQUEDA === */}
                {searchStatus !== "found" && (
                    <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center animate-fade-in-up">
                        <div className="bg-slate-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-100">
                            <i className="fa-solid fa-magnifying-glass text-3xl text-emerald-500"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Buscar Paciente</h2>
                        <p className="text-slate-500 mb-8 text-sm">Ingrese el número de documento del paciente para iniciar o actualizar su historia clínica.</p>

                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <i className="fa-regular fa-id-card text-slate-400"></i>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Ej: 12345678"
                                    disabled={searchStatus === "searching"}
                                    className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-lg disabled:opacity-60"
                                />
                            </div>

                            {searchStatus === "not_found" && (
                                <div className="bg-rose-50 text-rose-600 text-sm font-medium py-2 px-4 rounded-lg flex items-center gap-2 justify-center animate-shake">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                    Paciente no encontrado. Verifique el documento.
                                </div>
                            )}

                            {searchStatus === "foundButHCDone" && (
                                <div className="bg-rose-50 text-rose-600 text-sm font-medium py-2 px-4 rounded-lg flex items-center gap-2 justify-center animate-shake">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                    El paciente ya cuenta con historia clínica.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={searchStatus === "searching" || !searchQuery.trim()}
                                className="w-full bg-emerald-600 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-emerald-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {searchStatus === "searching" ? (
                                    <><i className="fa-solid fa-spinner animate-spin"></i> Buscando...</>
                                ) : (
                                    'Buscar Registro'
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* === FORMULARIO DE HISTORIA CLÍNICA === */}
                {searchStatus === "found" && (
                    <div className="space-y-8 animate-fade-in-up">
                        <BasicBiologicalData
                            grupoSanguineo={grupoSanguineo} setGrupoSanguineo={setGrupoSanguineo}
                            factorRH={factorRH} setFactorRH={setFactorRH}
                        />

                        <InheritanceHistory
                            tieneAntecedentesFamiliares={tieneAntecedentesFamiliares} setTieneAntecedentesFamiliares={setTieneAntecedentesFamiliares}
                            especifiqueAnteFamil={especifiqueAnteFamil} setEspecifiqueAnteFamil={setEspecifiqueAnteFamil}
                        />

                        <HabitsAndLifestyle
                            estadoAlcohol={estadoAlcohol} setEstadoAlcohol={setEstadoAlcohol}
                            frecuenciaAlcohol={frecuenciaAlcohol} setFrecuenciaAlcohol={setFrecuenciaAlcohol}
                            estadoTabaco={estadoTabaco} setEstadoTabaco={setEstadoTabaco}
                            frecuenciaTabaco={frecuenciaTabaco} setFrecuenciaTabaco={setFrecuenciaTabaco}
                            consumeDrogas={consumeDrogas} setConsumeDrogas={setConsumeDrogas}
                            drogasList={drogasList} setDrogasList={setDrogasList}
                        />

                        <SexualityGyneObstetric
                            esActivoSexualmente={esActivoSexualmente} setEsActivoSexualmente={setEsActivoSexualmente}
                            edadInicioSexual={edadInicioSexual} setEdadInicioSexual={setEdadInicioSexual}
                            usaMetodoAnticonceptivo={usaMetodoAnticonceptivo} setUsaMetodoAnticonceptivo={setUsaMetodoAnticonceptivo}
                            metodoPlanificacion={metodoPlanificacion} setMetodoPlanificacion={setMetodoPlanificacion}
                            tuvoEmbarazos={tuvoEmbarazos} setTuvoEmbarazos={setTuvoEmbarazos}
                            cantidadGestaciones={cantidadGestaciones} setCantidadGestaciones={setCantidadGestaciones}
                            cantidadPartos={cantidadPartos} setCantidadPartos={setCantidadPartos}
                            cantidadAbortos={cantidadAbortos} setCantidadAbortos={setCantidadAbortos}
                            huboComplicaciones={huboComplicaciones} setHuboComplicaciones={setHuboComplicaciones}
                            especifiqueComplicaciones={especifiqueComplicaciones} setEspecifiqueComplicaciones={setEspecifiqueComplicaciones}
                        />

                        <DetailTables
                            alergiasList={alergiasList} setAlergiasList={setAlergiasList}
                            antecedentesPatologicosList={antecedentesPatologicosList} setAntecedentesPatologicosList={setAntecedentesPatologicosList}
                            antecedentesQuirurgicosList={antecedentesQuirurgicosList} setAntecedentesQuirurgicosList={setAntecedentesQuirurgicosList}
                        />
                    </div>
                )}
            </main>

            {/* BARRA DE ACCIÓN PEGAJOSA */}
            {searchStatus === "found" && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 animate-fade-in-up">
                    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex-1">
                            {saveMessage && (
                                <div className={`px-4 py-2 rounded-lg flex items-center gap-3 font-medium animate-fade-in-down ${saveMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                                    <i className={`fa-solid ${saveMessage.type === 'success' ? 'fa-circle-check text-xl' : 'fa-triangle-exclamation text-xl'}`}></i>
                                    {saveMessage.text}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-4 shrink-0">
                            <button
                                onClick={handleResetSearch}
                                className="px-6 py-2.5 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-8 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <><i className="fa-solid fa-spinner animate-spin"></i> Guardando...</>
                                ) : (
                                    <><i className="fa-solid fa-floppy-disk"></i> Guardar Historia Clínica</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ESTILOS ANIMACIONES */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
                .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
                .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
            `}} />
        </div>
    );
};