class PacienteRepository {
  constructor() {
    // Paciente inicial por defecto para pruebas
    this.pacientes = [
      new Paciente(1, "Carlos", "Pérez", "CC", "1061789456", "3001234567", "1995-05-10")
    ];
  }

  agregar(paciente) {
    this.pacientes.push(paciente);
  }

  obtenerTodos() {
    return this.pacientes;
  }

  buscarPorId(id) {
    // IMPORTANTE: Se usa '==' para que el string "1" coincida con el número 1
    return this.pacientes.find(p => p.id == id);
  }

  siguienteId() {
    return this.pacientes.length > 0 ? Math.max(...this.pacientes.map(p => p.id)) + 1 : 1;
  }
}

const pacienteRepo = new PacienteRepository();