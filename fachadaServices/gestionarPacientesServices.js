class GestionarPacientes {
  constructor(repoPaciente) {
    this.repoPaciente = repoPaciente;
  }

  registrarPaciente(nombre, apellido, tipoDocumento = "", numeroDocumento = "", telefono = "", fechaNacimiento = "") {
    const id = this.repoPaciente.siguienteId();
    const paciente = new Paciente(id, nombre, apellido, tipoDocumento, numeroDocumento, telefono, fechaNacimiento);
    this.repoPaciente.agregar(paciente);
    return paciente;
  }

  listarPacientes() {
    return this.repoPaciente.obtenerTodos();
  }

  buscarPaciente(id) {
    return this.repoPaciente.buscarPorId(id);
  }
}

const gestionarPacientes = new GestionarPacientes(pacienteRepo);