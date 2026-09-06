class GestionarCitas {
  constructor(citaRepo, medicoRepo, pacienteRepo) {
    this.citaRepo = citaRepo;
    this.medicoRepo = medicoRepo;
    this.pacienteRepo = pacienteRepo;
  }

  registrarCita(fecha, horaInicio, horaFin, idMedico, idPaciente) {
    if (horaInicio >= horaFin) {
      throw new Error("La hora de inicio debe ser menor a la hora de fin");
    }

    const medico = this.medicoRepo.buscarPorId(idMedico);
    if (!medico) {
      throw new Error("Médico no encontrado");
    }

    const paciente = this.pacienteRepo.buscarPorId(idPaciente);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }

    const id = this.citaRepo.siguienteId();
    const cita = new Cita(id, fecha, horaInicio, horaFin, medico, paciente);
    this.citaRepo.agregar(cita);
    return cita;
  }

  listarCitas() {
    return this.citaRepo.obtenerTodas();
  }
}

const gestionarCitas = new GestionarCitas(citaRepo, medicoRepo, pacienteRepo);