import { countries } from "./countries";


interface CountrySelectProps {
    value?: string;
    onChange?: (value: string) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
    return (
        <div>
            <label className="block mb-1">País de origen:</label>

            <select
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="rounded-xl border border-emerald-900 bg-blue-100 
                   focus:bg-blue-50 focus:outline-none text-blue-800 
                   px-2 py-1"
            >
                <option value="">Selecciona un país</option>

                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect;
