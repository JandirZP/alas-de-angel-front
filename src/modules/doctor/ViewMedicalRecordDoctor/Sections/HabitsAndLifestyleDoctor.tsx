interface Props {
    mockHabitsAndLifestyle: any;
}

export const HabitsAndLifestyleDoctor = ({ mockHabitsAndLifestyle }: Props) => {
    return (
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm uppercase">
                <i className="fa-solid fa-wine-glass text-amber-500"></i> Hábitos y Sexualidad
            </h3>
            <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Alcohol</span>
                    <span className="font-medium text-slate-700 text-right">{mockHabitsAndLifestyle.habitos.alcohol.estado} <br /><span className="text-[10px] text-slate-400 font-normal">{mockHabitsAndLifestyle.habitos.alcohol.frecuencia}</span></span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Tabaco</span>
                    <span className="font-medium text-slate-700 text-right">{mockHabitsAndLifestyle.habitos.tabaco.estado} <br /><span className="text-[10px] text-slate-400 font-normal">{mockHabitsAndLifestyle.habitos.tabaco.frecuencia}</span></span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Drogas Ilegales</span>
                    <div className="text-right max-w-[150px]">
                        {mockHabitsAndLifestyle.habitos.drogas.length > 0 ? (
                            mockHabitsAndLifestyle.habitos.drogas.map((d: any, i: any) => (
                                <div key={i} className="mb-1 last:mb-0">
                                    <span className="block font-medium text-rose-600 leading-tight">{d.nombreDroga}</span>
                                    <span className="block text-[10px] text-slate-400 font-normal">({d.frecuencia})</span>
                                    {d.observaciones && <span className="block text-[9px] text-rose-500/80 italic mt-0.5 leading-tight">{d.observaciones}</span>}
                                </div>
                            ))
                        ) : <span className="font-medium text-slate-700">No consume</span>}
                    </div>
                </li>
                <li className="flex justify-between pt-1">
                    <span className="text-slate-500">Edad de inicio</span>
                    <span className="font-medium text-slate-700 text-right">{mockHabitsAndLifestyle.sexualidad.edadInicio}</span>
                </li>

                <li className="flex justify-between pt-1">
                    <span className="text-slate-500">Anticoncepción</span>
                    <span className="font-medium text-slate-700 text-right">{mockHabitsAndLifestyle.sexualidad.metodo}</span>
                </li>

            </ul>
        </section>
    );
};