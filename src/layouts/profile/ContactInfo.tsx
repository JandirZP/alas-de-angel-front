interface Props {
  correo: string;
  celular: string;
  contactoEmergencia: string;
  celularContacto: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInfo = ({ correo, celular, contactoEmergencia, celularContacto, onChange }: Props) => {
  return (
    <>
      <div>
        <label>Correo Electrónico: </label><br />
        <input
          type="email"
          name="correo"
          value={correo || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-gray-200 text-gray-600 px-2 py-1 w-full cursor-not-allowed"
          disabled
        />
      </div>
      <div>
        <label>Celular: </label><br />
        <input
          type="text"
          name="celular"
          value={celular || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 px-2 py-1 w-full"
        />
      </div>
      <div>
        <label>Contacto de Emergencia: </label><br />
        <input
          type="text"
          name="contactoEmergencia"
          value={contactoEmergencia || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 px-2 py-1 w-full"
        />
      </div>
      <div>
        <label>Celular del contacto: </label><br />
        <input
          type="text"
          name="celularContacto"
          value={celularContacto || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 px-2 py-1 w-full"
        />
      </div>
    </>
  );
};
export default ContactInfo;
