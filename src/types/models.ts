
// Card de especialidades
export type Card = {
  title: string;
  description: string;
  image: string;
}

//Interfaces para el LoginRequestDto del backend
export interface LoginRequestDto {
  correo: string;
  password: string;
}

//Interface para el LoginResponseDto del backend
export interface LoginResponseDto {
  token: string;
  nombreUsuario: string;
  roles: string[]; // <--- Agregamos esto
}

// Interfaces auxiliares (puedes expandirlas según tus entidades reales)
export interface TipoDocumento {
  idTipDoc: number;
  nombre: string;
  estado: boolean;
}

export interface Ubigeo {
  idUbigeo: number;
  departamento: string;
  provincia: string;
  distrito: string;
  nombCapitalLegal: string;
  codRegNat: number;
  regionNatural: string;
}

export interface NivelProfesional {
  // DTO fields (from NivelProfesionalDto)
  idNivelProfesionalDto?: number;
  nombreDto?: string;
  estadoDto?: boolean;

  // Entity fields (from NivelProfesionalEntity, sent inside UsuarioEntity)
  idNivelProfesional?: number;
  nombre?: string;
  estado?: boolean;
}

export interface Rol {
  idRol: number;
  nombre: string;
  estado: boolean;
}

export interface Especialidad {
  codigo: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

// Interface principal para UsuarioEntity
export interface Usuario {
  idUsuario: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fotoUrl: string;
  fechaNacimiento: string; // ISO date string (ej: "2026-01-24")
  tipoDocumentoEntity: TipoDocumento;
  numeroDocumento: string;
  sexo: boolean;
  celular: string;
  contactoEmergencia: string;
  celularContacto: string;
  direccion: string;
  ubigeoEntity: Ubigeo;
  paisOrigen: string;
  nombreUsuario: string;
  correo: string;
  password: string;
  nivelProfesionalEntity?: NivelProfesional;
  roles?: Rol[];
  especialidades?: Especialidad[];
}

// Asegúrate de que coincida con lo que devuelve tu backend
export interface Cita {
  idCita: number;
  fechaHora: string;
  motivo: string;
  estado: boolean;

  // Nuevos campos planos (Coinciden con tu CitaDTO de Java)
  idMedico: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidadMedico: string; // ¡Aquí llegará "Odontología" directo!
  sexoMedico?: boolean;

  idPaciente: number;
  nombrePaciente: string;
  apellidoPatPaciente: string;
  apellidoMatPaciente: string;
  numeroDocumento: string;
  tipoDocumento: string;
  sexoPaciente?: boolean;

  // Nuevo campo para saber si ya pasó por triaje
  atendidoEnTriaje?: boolean;
}


export interface TriajeDto {
  idTriaje?: number;
  nombreEnfermera: string;
  apellidoEnfermera: string;
  nombrePaciente: string;
  apellidoPaciente: string;
  sexoPaciente?: boolean;
  // RELACIONES
  idCita: number;
  idEnfermera: number;

  // DATOS MÉDICOS
  fechaHora: string;     // En Spring Boot (LocalDateTime) -> "YYYY-MM-DDTHH:mm:ss"
  peso: number;
  altura: number;
  presionArterial: string;
  temperatura: number;
  tieneFiebre: boolean;

  // DATOS GINECOLÓGICOS
  fechaUltimaRegla?: string; // En Spring Boot (LocalDate) -> "YYYY-MM-DD"
  estaEmbarazada?: boolean;
  semanasGestacion?: number;

  estado: boolean;
}

export interface EventosMedicos {
  idEventoMedico: number;
  tipoEvento: string;
  descripcion?: string;
  diagnostico?: string;
  medicamentos?: string;
  dieta?: string;
  recomendaciones?: string;
  fechaHora: string;
  idTriaje?: number;
  peso?: number;
  altura?: number;
  presionArterial?: string;
  temperatura?: number;
  tieneFiebre?: boolean;

  // DATOS GINECOLÓGICOS
  fechaUltimaRegla?: string;
  estaEmbarazada?: boolean;
  semanasGestacion?: number;

  nombreDoctor?: string;
  apellidoDoctor?: string;
}


export interface HistoriaClinica {
  idHC: number;
  idPaciente: number;
  nombresPaciente: string;
  apellidoPaternoPaciente: string;
  apellidoMaternoPaciente: string;
  numeroDocumento: string;
  tipoDocumento: string;
  sexoPaciente: boolean;
  fechaNacimiento: string;

  grupoSanquineo: string;
  factorRH: string;

  antecedentesFamiliares: boolean;
  especifiqueAnteFamil?: string;

  estadoAlcohol: number;
  frecuenciaAlcohol?: string;

  estadoTabaco: number;
  frecuenciaTabaco?: string;

  consumeDrogas: boolean;

  sexualmenteActivo: boolean;
  edadInicioSexual?: number;
  usaMetodoAnticonceptivo?: boolean;
  metodoPlanificacion?: string;

  tuvoEmbarazos?: boolean;
  cantidadGestaciones?: number;
  cantidadPartos?: number;
  cantidadAbortos?: number;
  huboComplicaciones?: boolean;
  especifiqueComplicaciones?: string;

  fechaCreacion: string;

  estadoHC: boolean;
  tieneHistoriaClinica: boolean;

  alergias?: Alergias[];
  antecedentesPatologicos?: AntecedentesPatologicos[];
  antecedentesQuirurgicos?: AntecedentesQuirurgicos[];
  drogas?: HistorialDrogas[];
  eventosMedicos?: EventosMedicos[];
}

export interface Alergias {
  id: number;
  historiaClinicaId: number;
  alergeno: string;
  reaccion: string | null;
  observaciones: string | null;
}

export interface AntecedentesPatologicos {
  id: number;
  historiaClinicaId: number;
  nombre: string;
  fechaDiagnostico: string | null;
  enTratamiento: boolean;
  observaciones: string | null;
}

export interface AntecedentesQuirurgicos {
  id: number;
  historiaClinicaId: number;
  nombre: string;
  fecha: string | null;
  huboComplicaciones: boolean;
  observaciones: string | null;
}

export interface HistorialDrogas {
  id: number;
  historiaClinicaId: number;
  nombreDroga: string;
  frecuencia: string;
  observaciones: string;
}


export interface Tratamiento {
  idEventoMedico: number;
  medicamentos: string;
  dieta: string;
  recomendaciones: string;
  fecha: string;
  nombreMedico: string;
  apellidoMedico: string;
}


export interface Ubigeo {
  idUbigeo: number;
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface Sedes {
  idSedes: number;
  nombre: string;
  direccion: string;
  referencia?: string;
  telefonoContacto: string;
  estado: boolean;

  idUbigeo?: number;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}