class MedicoRepository {
  constructor() {
    // Inicializar con los 4 médicos por defecto de las tarjetas
    this.medicos = [
      new Medico(1, "Carlos", "Mendoza", "Terapia Neural", "L-V 8:00-12:00"),
      new Medico(2, "María", "López", "Quiropraxia", "L-V 14:00-18:00"),
      new Medico(3, "Juan", "Pérez", "Fisioterapia", "L-S 7:00-11:00"),
      new Medico(4, "Ana", "Gómez", "Nutrición y Dietética", "Mar-Jue 10:00-16:00")
    ];
  }

  agregar(medico) {
    this.medicos.push(medico);
  }

  obtenerTodos() {
    return this.medicos;
  }

  buscarPorId(id) {
    // IMPORTANTE: Se usa '==' para que coincida el número 1 con el string "1"
    return this.medicos.find(m => m.id == id);
  }

  siguienteId() {
    return this.medicos.length > 0 ? Math.max(...this.medicos.map(m => m.id)) + 1 : 1;
  }
}

const medicoRepo = new MedicoRepository();