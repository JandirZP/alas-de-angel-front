interface Props {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfo1 = ({ nombres, apellidoPaterno, apellidoMaterno, onChange }: Props) => {
  return (
    <>
      <div>
        <label>Nombres: </label>
        <input
          type="text"
          name="nombres"
          value={nombres || ""}
          onChange={onChange}
          className="w-78 rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 ml-2"
        />
      </div>
      <div>
        <label>Apellido Paterno: </label>
        <input
          type="text"
          name="apellidoPaterno"
          value={apellidoPaterno || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 ml-3"
        />
      </div>
      <div>
        <label>Apellido Materno: </label>
        <input
          type="text"
          name="apellidoMaterno"
          value={apellidoMaterno || ""}
          onChange={onChange}
          className="rounded-xl border border-emerald-900 bg-blue-100 focus:bg-blue-50 focus:outline-none focus:border-3 text-blue-800 px-2 py-1 ml-2"
        />
      </div>
    </>
  );
};
export default PersonalInfo1;
