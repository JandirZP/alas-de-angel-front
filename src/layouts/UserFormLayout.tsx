

interface UserFormLayoutProps {
    headerInputs: React.ReactNode;   // Para PersonalInfo1 (Nombres, Apellidos)
    personalInputs: React.ReactNode; // Para PersonalInfo2 (DNI, Sexo, etc)
    contactInputs: React.ReactNode;  // Para ContactInfo
    ubigeoInputs: React.ReactNode;   // Para UbigeoForm
    professionalInputs?: React.ReactNode;
    avatarSection?: React.ReactNode;
    onSave?: () => void;             // Opcional: para manejar el botón de guardar
}

const UserFormLayout = ({
    headerInputs,
    personalInputs,
    contactInputs,
    ubigeoInputs,
    professionalInputs,
    avatarSection,
    onSave
}: UserFormLayoutProps) => {


    return (
        <div className="bg-white p-8 m-6 w-fit mx-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <form onSubmit={(e) => { e.preventDefault(); onSave?.(); }}>
                <div className="flex text-lg text-blue-950 font-semibold">
                    <div className="w-3xl">
                        <div className="flex">
                            {avatarSection}
                            <div className="pl-8">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="text-2xl font-bold text-orange-600">
                                        Información Personal
                                    </div>

                                    {headerInputs}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-4 px-4">
                            {personalInputs}
                        </div>
                    </div>
                    <div className="w-3xl">
                        <div className="pb-2 text-2xl font-bold text-orange-600">
                            Información de Contacto
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {contactInputs}
                        </div>
                        <div className="py-4 text-2xl font-bold text-orange-600">Ubigeo</div>
                        <div className="grid grid-cols-3 gap-2">
                            {ubigeoInputs}
                        </div>
                    </div>
                </div>
                {professionalInputs}

                <div className="mt-6">
                    <button className="bg-blue-500 p-2 rounded-lg text-blue-950 text-lg font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  hover:text-white">Guardar cambios</button>
                </div>
            </form>


        </div>
    );
};

export default UserFormLayout;

