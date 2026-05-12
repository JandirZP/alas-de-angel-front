import type { Ubigeo } from "../../../../types/models";


interface Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    departamentos: string[];
    provincias: string[];
    distritos: Ubigeo[];
    handleDepChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleProvChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDistritoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ContactoUbigeoSection = ({
    formData,
    handleChange,
    departamentos,
    provincias,
    distritos,
    handleDepChange,
    handleProvChange,
    handleDistritoChange
}: Props) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-address-book text-amber-500"></i> Contacto
            </h3>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Celular Personal <span className="text-rose-500">*</span></label>
                    <input type="tel" name="celular" value={formData.celular} onChange={handleChange} required placeholder="987 654 321" className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Dirección de Residencia <span className="text-rose-500">*</span></label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required placeholder="Av. Principal 123..." className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none" />
                </div>

                {/* UBIGEO */}
                <div className="grid grid-cols-1 gap-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Ubigeo <span className="text-rose-500">*</span></label>
                    <div className="grid grid-cols-1 gap-1.5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Departamento</label>
                            <select name="departamento" value={formData.ubigeoEntity.departamento} onChange={handleDepChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                                <option value="">Seleccione...</option>
                                {departamentos.map(dep => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Provincia</label>
                            <select name="provincia" value={formData.ubigeoEntity.provincia} onChange={handleProvChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                                <option value="">Seleccione...</option>
                                {provincias.map(prov => (
                                    <option key={prov} value={prov}>{prov}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Distrito</label>
                            <select name="distrito" value={formData.ubigeoEntity.idUbigeo} onChange={handleDistritoChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                                <option value="">Seleccione...</option>
                                {distritos.map(dis => (
                                    <option key={dis.idUbigeo} value={dis.idUbigeo}>{dis.distrito}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
                    <h4 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-truck-medical"></i> En caso de emergencia
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Contacto</label>
                            <input type="text" name="contactoEmergencia" value={formData.contactoEmergencia} onChange={handleChange} placeholder="Familiar o amigo..." className="w-full bg-white border border-amber-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500/50 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Celular de Emergencia</label>
                            <input type="tel" name="celularContacto" value={formData.celularContacto} onChange={handleChange} placeholder="Teléfono..." className="w-full bg-white border border-amber-200 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500/50 outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
