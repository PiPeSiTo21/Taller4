// Función para agregar filas a la tabla de citas registradas
function agregarCitaATabla(fecha, horaInicio, horaFin, medicoTexto, pacienteTexto) {
    const tablaCitas = document.getElementById("tablaCitas");
    if (tablaCitas) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${fecha}</td>
            <td>${horaInicio}</td>
            <td>${horaFin}</td>
            <td>${medicoTexto}</td>
            <td>${pacienteTexto}</td>
        `;
        tablaCitas.appendChild(fila);
    }
}

// Configuración de interacción con el Modal para agendar citas desde la tarjeta del médico
document.addEventListener("DOMContentLoaded", () => {
    const modalElement = document.getElementById("modalAgendarCita");
    const formModalCita = document.getElementById("formModalCita");
    const modalMedicoNombre = document.getElementById("modalMedicoNombre");
    const modalMedicoId = document.getElementById("modalMedicoId");
    const modalPacienteSelect = document.getElementById("modalPacienteSelect");

    if (!modalElement) return;
    const bsModal = new bootstrap.Modal(modalElement);

    // Event Delegated click listener para capturar clics en botones "Agendar Cita" de las tarjetas
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-agendar-cita");
        if (btn) {
            e.preventDefault();
            const medicoNombre = btn.getAttribute("data-nombre-medico") || "Médico";
            const medicoId = btn.getAttribute("data-id-medico") || "1";

            if (modalMedicoNombre) modalMedicoNombre.value = medicoNombre;
            if (modalMedicoId) modalMedicoId.value = medicoId;

            // Cargar pacientes actualizados en el select del modal desde la capa de servicios
            if (modalPacienteSelect) {
                modalPacienteSelect.innerHTML = '<option value="">Seleccione un paciente</option>';
                if (typeof gestionarPacientes !== 'undefined') {
                    const pacientes = gestionarPacientes.listarPacientes();
                    pacientes.forEach(p => {
                        const option = document.createElement("option");
                        option.value = p.id;
                        option.textContent = `${p.nombres} ${p.apellidos}` + (p.numeroDocumento ? ` - Doc: ${p.numeroDocumento}` : '');
                        modalPacienteSelect.appendChild(option);
                    });
                }
            }

            bsModal.show();
        }
    });

    // Envío del formulario dentro del modal
    if (formModalCita) {
        formModalCita.addEventListener("submit", (e) => {
            e.preventDefault();

            const fecha = document.getElementById("modalFecha").value;
            const horaInicio = document.getElementById("modalHoraInicio").value;
            const horaFin = document.getElementById("modalHoraFin").value;
            const pacienteId = modalPacienteSelect ? modalPacienteSelect.value : "";
            const pacienteTexto = modalPacienteSelect && modalPacienteSelect.selectedIndex >= 0 
                ? modalPacienteSelect.options[modalPacienteSelect.selectedIndex].text 
                : "Paciente";
            const medicoNombre = modalMedicoNombre ? modalMedicoNombre.value : "Médico";

            if (!fecha || !horaInicio || !horaFin || !pacienteId) {
                mostrarNotificacion("Por favor llene todos los campos del modal", "error");
                return;
            }

            if (horaInicio >= horaFin) {
                mostrarNotificacion("La hora de inicio debe ser menor a la hora de fin", "error");
                return;
            }

            try {
                if (typeof gestionarCitas !== 'undefined' && gestionarCitas.registrarCita) {
                    gestionarCitas.registrarCita(fecha, horaInicio, horaFin, modalMedicoId ? modalMedicoId.value : 1, pacienteId);
                }
                agregarCitaATabla(fecha, horaInicio, horaFin, medicoNombre, pacienteTexto);
                bsModal.hide();
                formModalCita.reset();
                mostrarNotificacion("¡Cita médica agendada correctamente!");
            } catch (err) {
                mostrarNotificacion(err.message, "error");
            }
        });
    }
});