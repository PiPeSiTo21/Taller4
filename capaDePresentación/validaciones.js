function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (!campo || campo.value.trim() === '') {
        if (errorElement) errorElement.textContent = mensaje;
        if (campo) campo.classList.add('error-input');
        return false;
    } else {
        if (errorElement) errorElement.textContent = '';
        if (campo) campo.classList.remove('error-input');
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (!campo) return false;
    const valor = campo.value.trim();
    if (valor.length < min || valor.length > max) {
        if (errorElement) errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    } else {
        if (errorElement) errorElement.textContent = '';
        campo.classList.remove('error-input');
        return true;
    }
}

function validarSelect(campo, errorElement, mensaje) {
    if (!campo || campo.value === '' || campo.value === null) {
        if (errorElement) errorElement.textContent = mensaje;
        if (campo) campo.classList.add('error-input');
        return false;
    } else {
        if (errorElement) errorElement.textContent = '';
        if (campo) campo.classList.remove('error-input');
        return true;
    }
}

function validarHoras(horaInicio, horaFin, errorElement, mensaje) {
    if (!horaInicio || !horaFin || !horaInicio.value || !horaFin.value) {
        if (errorElement) errorElement.textContent = 'Las horas son obligatorias';
        return false;
    }
    if (horaFin.value <= horaInicio.value) {
        if (errorElement) errorElement.textContent = mensaje;
        if (horaFin) horaFin.classList.add('error-input');
        return false;
    } else {
        if (errorElement) errorElement.textContent = '';
        if (horaFin) horaFin.classList.remove('error-input');
        return true;
    }
}

function validarNumero(campo, errorElement, min, max, mensaje) {
    if (!campo) return false;
    const valor = parseInt(campo.value, 10);
    if (isNaN(valor) || valor < min || valor > max) {
        if (errorElement) errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    } else {
        if (errorElement) errorElement.textContent = '';
        campo.classList.remove('error-input');
        return true;
    }
}

// ==========================================
// 2. Funciones de Control de Formularios
// ==========================================

function validarFormularioMedico() {
    const nombres = document.getElementById('nombresMedico');
    const apellidos = document.getElementById('apellidosMedico');
    const especialidad = document.getElementById('especialidadMedico');
    const horario = document.getElementById('horarioMedico');
    const experiencia = document.getElementById('añosExperiencia');
    const bibliografia = document.getElementById('bibliografiaMedico');
    const btn = document.getElementById('btnAgregarMedico');

    const errorNombres = document.getElementById('errorNombresMedico');
    const errorApellidos = document.getElementById('errorApellidosMedico');
    const errorEspecialidad = document.getElementById('errorEspecialidadMedico');
    const errorHorario = document.getElementById('errorHorarioMedico');
    const errorExperiencia = document.getElementById('errorAñosExperiencia');
    const errorBibliografia = document.getElementById('errorBibliografiaMedico');

    const vNombres = validarLongitud(nombres, errorNombres, 1, 50, 'Los nombres deben tener entre 1 y 50 caracteres');
    const vApellidos = validarLongitud(apellidos, errorApellidos, 1, 50, 'Los apellidos deben tener entre 1 y 50 caracteres');
    const vEspecialidad = validarSelect(especialidad, errorEspecialidad, 'La especialidad es obligatoria');
    const vHorario = validarCampoObligatorio(horario, errorHorario, 'El horario de atención es obligatorio');
    const vExperiencia = validarNumero(experiencia, errorExperiencia, 0, 60, 'Los años de experiencia deben ser entre 0 y 60');
    const vBibliografia = validarLongitud(bibliografia, errorBibliografia, 0, 500, 'La bibliografía no puede exceder 500 caracteres');

    const esValido = vNombres && vApellidos && vEspecialidad && vHorario && vExperiencia && vBibliografia;
    if (btn) btn.disabled = !esValido;
    return esValido;
}

function validarFormularioPaciente() {
    const tipoDoc = document.getElementById('tipoDocumentoPaciente');
    const numDoc = document.getElementById('numeroDocumentoPaciente');
    const nombres = document.getElementById('nombresPaciente');
    const apellidos = document.getElementById('apellidosPaciente');
    const telefono = document.getElementById('telefonoPaciente');
    const fechaNac = document.getElementById('fechaNacimientoPaciente');
    const btn = document.getElementById('btnAgregarPaciente');

    const errTipo = document.getElementById('errorTipoDocumentoPaciente');
    const errNum = document.getElementById('errorNumeroDocumentoPaciente');
    const errNombres = document.getElementById('errorNombresPaciente');
    const errApellidos = document.getElementById('errorApellidosPaciente');
    const errTel = document.getElementById('errorTelefonoPaciente');
    const errFechaNac = document.getElementById('errorFechaNacimientoPaciente');

    const vTipo = validarSelect(tipoDoc, errTipo, 'Seleccione tipo de documento');
    const vNum = validarLongitud(numDoc, errNum, 5, 15, 'El número de documento debe tener entre 5 y 15 dígitos');
    const vNombres = validarLongitud(nombres, errNombres, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
    const vApellidos = validarLongitud(apellidos, errApellidos, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
    const vTel = validarLongitud(telefono, errTel, 7, 12, 'El teléfono debe tener entre 7 y 12 dígitos');
    const vFechaNac = validarCampoObligatorio(fechaNac, errFechaNac, 'La fecha de nacimiento es obligatoria');

    const esValido = vTipo && vNum && vNombres && vApellidos && vTel && vFechaNac;
    if (btn) btn.disabled = !esValido;
    return esValido;
}

function validarFormularioCita() {
    const fecha = document.getElementById('fecha');
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');
    const medicoSelect = document.getElementById('medicoSelect');
    const pacienteSelect = document.getElementById('pacienteSelect');
    const btn = document.getElementById('btnAgregarCita');

    const errorFecha = document.getElementById('errorFecha');
    const errorHoras = document.getElementById('errorHoras');
    const errorMedico = document.getElementById('errorMedicoSelect');
    const errorPaciente = document.getElementById('errorPacienteSelect');

    const vFecha = validarCampoObligatorio(fecha, errorFecha, 'La fecha es obligatoria');
    const vHoras = validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
    const vMedico = validarSelect(medicoSelect, errorMedico, 'Debe seleccionar un médico');
    const vPaciente = validarSelect(pacienteSelect, errorPaciente, 'Debe seleccionar un paciente');

    const esValido = vFecha && vHoras && vMedico && vPaciente;
    if (btn) btn.disabled = !esValido;
    return esValido;
}

// ==========================================
// 3. Configuración de Eventos (Blur / Input / Change)
// ==========================================

function configurarValidacionPorFoco() {
    const camposPaciente = [
        'tipoDocumentoPaciente', 'numeroDocumentoPaciente', 'nombresPaciente', 
        'apellidosPaciente', 'telefonoPaciente', 'fechaNacimientoPaciente'
    ];
    camposPaciente.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            ['blur', 'input', 'change'].forEach(evt => {
                el.addEventListener(evt, validarFormularioPaciente);
            });
        }
    });
}

// Asegurar que la validación inicial se configure al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    configurarValidacionPorFoco();
});