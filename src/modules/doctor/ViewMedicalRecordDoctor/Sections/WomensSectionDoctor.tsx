interface WomensSectionDoctorProps {
    mockWomensSection: any
}

export const WomensSectionDoctor = ({ mockWomensSection }: WomensSectionDoctorProps) => {
    return (
        <section className="bg-pink-50 p-5 rounded-2xl shadow-sm border border-pink-200 h-fit">
            <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2 border-b border-pink-200 pb-2 text-sm uppercase">
                <i className="fa-solid fa-baby text-pink-500"></i> Gineco-Obstétrico
            </h3>
            {mockWomensSection.gineco.embarazos ? (
                <div className="space-y-3">
                    <div className="flex justify-between text-center bg-white p-2 rounded-lg border border-pink-100 shadow-sm">
                        <div className="flex-1"><span className="block text-[10px] text-pink-500 uppercase font-bold">Gest</span><span className="font-black text-pink-700">{mockWomensSection.gineco.gestaciones}</span></div>
                        <div className="flex-1 border-x border-pink-50"><span className="block text-[10px] text-pink-500 uppercase font-bold">Partos</span><span className="font-black text-pink-700">{mockWomensSection.gineco.partos}</span></div>
                        <div className="flex-1"><span className="block text-[10px] text-pink-500 uppercase font-bold">Abortos</span><span className="font-black text-pink-700">{mockWomensSection.gineco.abortos}</span></div>
                    </div>
                    {mockWomensSection.gineco.huboComplicaciones && (
                        <div className="bg-red-50 p-2 rounded border border-red-100">
                            <span className="block text-[10px] font-bold text-red-700"><i className="fa-solid fa-triangle-exclamation"></i> Complicaciones Previas</span>
                            <p className="text-xs text-red-800 mt-1 leading-snug">{mockWomensSection.gineco.complicaciones}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-pink-600/70 text-sm italic text-center bg-white/50 py-2 rounded-lg border border-pink-100/50">Sin embarazos previos.</p>
            )}
        </section>
    );
};