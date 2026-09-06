class Paciente {
  constructor(id, nombres, apellidos, tipoDocumento = "", numeroDocumento = "", telefono = "", fechaNacimiento = "") {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
  }
}