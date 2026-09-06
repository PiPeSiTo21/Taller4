const formPaciente = document.getElementById("formPaciente");
const btnAgregarPaciente = document.getElementById("btnAgregarPaciente");

formPaciente.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validarFormularioPaciente()) {
        mostrarNotificacion("Por favor, complete correctamente todos los campos", "error");
        return;
    }

    const tipoDoc = document.getElementById("tipoDocumentoPaciente").value;
    const numDoc = document.getElementById("numeroDocumentoPaciente").value;
    const nombres = document.getElementById("nombresPaciente").value;
    const apellidos = document.getElementById("apellidosPaciente").value;
    const telefono = document.getElementById("telefonoPaciente").value;
    const fechaNac = document.getElementById("fechaNacimientoPaciente").value;

    const paciente = gestionarPacientes.registrarPaciente(
        nombres, 
        apellidos, 
        tipoDoc, 
        numDoc, 
        telefono, 
        fechaNac
    );

    // Actualizar el select del Modal
    const modalPacienteSelect = document.getElementById("modalPacienteSelect");
    if (modalPacienteSelect && paciente) {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nombres} ${paciente.apellidos} - Doc: ${numDoc}`;
        modalPacienteSelect.appendChild(option);
    }

    formPaciente.reset();
    if (btnAgregarPaciente) btnAgregarPaciente.disabled = true;

    // Limpiar mensajes y estilos de error
    document.querySelectorAll('#formPaciente .invalid-feedback').forEach(el => el.textContent = '');
    document.querySelectorAll('#formPaciente .form-control, #formPaciente .form-select').forEach(el => el.classList.remove('error-input', 'is-invalid'));

    mostrarNotificacion(`¡Registro confirmado! Usuario ${nombres} ${apellidos} registrado exitosamente con Documento No. ${numDoc}`);
});