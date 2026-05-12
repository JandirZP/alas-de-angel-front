import { countries } from "../../../../components/selectCountry/countries";


interface Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DocumentacionSection = ({ formData, handleChange }: Props) => {
    return (
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-passport text-blue-500"></i> Identidad y Origen
            </h3>

            <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Tipo de Documento <span className="text-rose-500">*</span></label>
                        <select name="tipoDocumentoId" value={formData.tipoDocumentoId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                            <option value="1">DNI</option>
                            <option value="2">Carnet de Extranjería</option>
                            <option value="3">Pasaporte</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Número de Documento <span className="text-rose-500">*</span></label>
                        <input type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required placeholder="Ej. 12345678" className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none font-mono" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">País de Origen <span className="text-rose-500">*</span></label>
                    <select name="paisOrigen" value={formData.paisOrigen} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
                        <option value="" disabled>Seleccione</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
};
