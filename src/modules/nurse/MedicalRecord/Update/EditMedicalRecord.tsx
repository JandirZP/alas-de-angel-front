import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderEdit } from "./SectionsEdit/HeaderEdit";
import { BiologicalAndFamilyData } from "./SectionsEdit/BiologicalAndFamilyData";
import { EditDrugHistory } from "./SectionsEdit/EditDrugHistory";
import { SexualityEdit } from "./SectionsEdit/SexualityEdit";
import { GinecoObsEdit } from "./SectionsEdit/GinecoObsEdit";
import { AllergyEdit } from "./SectionsEdit/AllergyEdit";
import { PathologyEdit } from "./SectionsEdit/PathologyEdit";
import { SurgeriesEdit } from "./SectionsEdit/SurgeriesEdit";
import { AddMoreAllergies } from "./AddMore/AddMoreAllergies";
import { AddMorePathologies } from "./AddMore/AddMorePathologies";
import { AddMoreSurgeries } from "./AddMore/AddMoreSurgeries";
import { AddMoreDrugs } from "./AddMore/AddMoreDrugs";

// Importando nuestros nuevos y flamantes Custom Hooks
import { useMedicalRecordFetch } from "../../../../hooks/MedicalRecord/Update/useMedicalRecordFetch";
import { useBaseForm } from "../../../../hooks/MedicalRecord/Update/useBaseForm";
import { useFormList } from "../../../../hooks/MedicalRecord/Update/useFormList";
import { submitMedicalRecordManager } from "../../../../hooks/MedicalRecord/Update/medicalRecordSubmit";
import type { Alergias, AntecedentesPatologicos, AntecedentesQuirurgicos, HistorialDrogas } from "../../../../types/models";

export const EditMedicalRecord = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // 1. Fetch de toda la data inicial
    const { loading, initialData, numericId } = useMedicalRecordFetch(id);

    // 2. Estado de UI y Mensajes
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showAddAllergyModal, setShowAddAllergyModal] = useState(false);
    const [showAddPathologyModal, setShowAddPathologyModal] = useState(false);
    const [showAddSurgeryModal, setShowAddSurgeryModal] = useState(false);
    const [showAddDrugModal, setShowAddDrugModal] = useState(false);

    // 3. Manejo de Formularios con Hooks Dedicados
    const { baseData, handleChange } = useBaseForm(initialData?.historia);
    const alergiasManager = useFormList<Alergias>(initialData?.alergias);
    const cirugiasManager = useFormList<AntecedentesQuirurgicos>(initialData?.quirurgicos);
    const patologiasManager = useFormList<AntecedentesPatologicos>(initialData?.patologias);
    const drogasManager = useFormList<HistorialDrogas>(initialData?.drogas);

    // 4. Orquestamos la estructura total requerida por los componentes Hijos visuales
    // Para que los componentes hijos no se rompan, les mandamos la estructura consolidada que esperaban.
    const fullFormData = {
        ...baseData,
        alergias: alergiasManager.items,
        quirurgicos: cirugiasManager.items,
        patologias: patologiasManager.items,
        drogas: drogasManager.items,
        consumeDrogas: drogasManager.items.length > 0
    };

    // 5. Clic en Guardar: ¡Llamar a nuestro Manager Central!
    const actualizarHistoria = async () => {
        if (!numericId || !initialData) return;
        setIsSaving(true);
        setSaveMessage(null);

        try {
            await submitMedicalRecordManager(
                numericId,
                baseData,
                initialData,
                {
                    alergias: alergiasManager.items,
                    patologias: patologiasManager.items,
                    quirurgicos: cirugiasManager.items,
                    drogas: drogasManager.items
                }
            );

            setSaveMessage({ type: 'success', text: 'Historia Clínica actualizada exitosamente. Redirigiendo...' });

            setTimeout(() => {
                navigate(`/DashboardNurse`, { state: { view: "medicalrecord" } });
            }, 2000);

        } catch (error) {
            console.error("Error al actualizar la historia clínica:", error);
            setSaveMessage({ type: 'error', text: 'Error al actualizar los datos. Por favor, verifique.' });
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* OVERLAY DE CARGA / ÉXITO A PANTALLA COMPLETA */}
            {isSaving && (
                <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300">
                    {saveMessage?.type === 'success' ? (
                        <div className="flex flex-col items-center">
                            <i className="fa-solid fa-circle-check text-emerald-500 text-7xl mb-4 animate-[bounce_1s_ease-in-out_infinite]"></i>
                            <h2 className="text-3xl font-bold text-slate-800">¡Éxito!</h2>
                            <p className="text-xl text-slate-600 mt-2">{saveMessage.text}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-emerald-100 border-b-emerald-600"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <i className="fa-solid fa-notes-medical text-emerald-600 text-2xl"></i>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Procesando...</h2>
                            <p className="text-lg text-slate-600 mt-2">Guardando historia clínica de forma segura.</p>
                            <p className="text-md font-semibold text-rose-500 mt-3 flex items-center gap-2"><i className="fa-solid fa-triangle-exclamation"></i> Por favor, no cierre la ventana ni cambie de página.</p>
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                    <p className="text-emerald-800 font-bold ml-6 text-2xl">Cargando...</p>
                </div>
            ) : (
                <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-800">

                    {/* ENCABEZADO FIJO */}
                    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
                        <HeaderEdit historia={fullFormData} />
                    </header>

                    <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 space-y-8">

                        {saveMessage && (
                            <div className={`p-4 rounded-xl border ${saveMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center gap-3 shadow-sm`}>
                                <i className={`fa-solid ${saveMessage.type === 'success' ? 'fa-check-circle text-emerald-500' : 'fa-triangle-exclamation text-red-500'} text-xl`}></i>
                                <p className="font-semibold">{saveMessage.text}</p>
                            </div>
                        )}

                        {/* --- 1. DATOS BIOLÓGICOS Y FAMILIARES --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <BiologicalAndFamilyData historia={fullFormData} handleChange={handleChange} />
                        </div>

                        {/* --- 2. HÁBITOS LEGALES E ILEGALES (DROGAS) --- */}
                        <EditDrugHistory
                            historia={fullFormData}
                            handleChange={handleChange}
                            handleDeleteDroga={drogasManager.remove}
                            handleDrogaChange={drogasManager.updateItem}
                            handleAddDroga={() => setShowAddDrugModal(true)}
                        />

                        {/* --- 3. SEXUALIDAD Y GINECO-OBSTÉTRICO --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <SexualityEdit historia={fullFormData} handleChange={handleChange} />
                            <GinecoObsEdit historia={fullFormData} handleChange={handleChange} />
                        </div>

                        {/* --- 4. REGISTROS DETALLADOS --- */}
                        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                                <i className="fa-solid fa-notes-medical text-emerald-500"></i> Edición de Registros Clínicos
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* ALERGIAS */}
                                <AllergyEdit
                                    historia={fullFormData}
                                    handleDeleteAlergia={alergiasManager.remove}
                                    handleAlergiaChange={(id, field, value) => alergiasManager.updateItem(id, field, value)}
                                    handleAddAlergia={() => setShowAddAllergyModal(true)}
                                />

                                {/* PATOLOGÍAS */}
                                <PathologyEdit
                                    historia={fullFormData}
                                    handleDeletePatologia={patologiasManager.remove}
                                    handlePatologiaChange={(id, field, value) => patologiasManager.updateItem(id, field, value)}
                                    handleAddPatologia={() => setShowAddPathologyModal(true)}
                                />

                                {/* QUIRÚRGICOS */}
                                <SurgeriesEdit
                                    historia={fullFormData}
                                    handleDeleteQuirurgico={cirugiasManager.remove}
                                    handleQuirurgicoChange={(id, field, value) => cirugiasManager.updateItem(id, field, value)}
                                    handleAddQuirurgico={() => setShowAddSurgeryModal(true)}
                                />

                            </div>
                        </section>

                    </main>

                    {/* Barra de acción pegajosa inferior */}
                    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                        <div className="max-w-6xl mx-auto flex justify-end gap-4">
                            <button onClick={() => navigate(-1)} disabled={isSaving} className="px-6 py-2.5 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50">
                                Cancelar Cambios
                            </button>
                            <button onClick={actualizarHistoria} disabled={isSaving} className="px-8 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSaving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Actualizando...</> : <><i className="fa-solid fa-floppy-disk mr-2"></i> Actualizar Historia</>}
                            </button>
                        </div>
                    </div>

                    <AddMoreAllergies
                        visible={showAddAllergyModal}
                        onClose={() => setShowAddAllergyModal(false)}
                        onAdd={(alergia) => {
                            alergiasManager.add(alergia);
                            setShowAddAllergyModal(false);
                        }}
                    />

                    <AddMorePathologies
                        visible={showAddPathologyModal}
                        onClose={() => setShowAddPathologyModal(false)}
                        onAdd={(patologia) => {
                            patologiasManager.add(patologia);
                            setShowAddPathologyModal(false);
                        }}
                    />

                    <AddMoreSurgeries
                        visible={showAddSurgeryModal}
                        onClose={() => setShowAddSurgeryModal(false)}
                        onAdd={(cirugia) => {
                            cirugiasManager.add(cirugia);
                            setShowAddSurgeryModal(false);
                        }}
                    />

                    <AddMoreDrugs
                        visible={showAddDrugModal}
                        onClose={() => setShowAddDrugModal(false)}
                        onAdd={(droga) => {
                            drogasManager.add(droga);
                            setShowAddDrugModal(false);
                        }}
                    />
                </div>
            )}
        </>
    );
};