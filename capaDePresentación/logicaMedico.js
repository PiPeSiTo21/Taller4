const formMedico = document.getElementById("formMedico");
const medicoSelect = document.getElementById("medicoSelect");
const btnAgregarMedico = document.getElementById("btnAgregarMedico");
const contenedorTarjetasMedicos = document.getElementById("contenedorTarjetasMedicos");

// Lógica para la barra lateral de especialidades
document.addEventListener("DOMContentLoaded", () => {
    const itemsEspecialidad = document.querySelectorAll('#listaEspecialidades a');
    const descripcionBox = document.getElementById('descripcionEspecialidad');

    itemsEspecialidad.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            itemsEspecialidad.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            if (descripcionBox) {
                descripcionBox.textContent = item.getAttribute('data-desc');
            }
        });
    });
});

formMedico.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validarFormularioMedico()) {
        mostrarNotificacion("Por favor, complete correctamente todos los campos", "error");
        return;
    }

    const nombres = document.getElementById("nombresMedico").value;
    const apellidos = document.getElementById("apellidosMedico").value;
    const especialidad = document.getElementById("especialidadMedico").value;
    const horarioAtencion = document.getElementById("horarioMedico").value;
    const añosExperiencia = parseInt(document.getElementById("añosExperiencia").value, 10);
    const bibliografia = document.getElementById("bibliografiaMedico").value;

    const medico = gestionarMedicos.registrarMedico(
        nombres, 
        apellidos, 
        especialidad, 
        horarioAtencion, 
        añosExperiencia, 
        bibliografia
    );

    // Actualizar el <select> en el formulario de citas
    if (medicoSelect && medico) {
        const option = document.createElement("option");
        option.value = medico.id;
        option.textContent = `${medico.nombres} ${medico.apellidos} - ${medico.especialidad}`;
        medicoSelect.appendChild(option);
    }

    // Insertar la tarjeta del nuevo médico en la grilla Bootstrap
    if (contenedorTarjetasMedicos && medico) {
        const randomImgId = Math.floor(Math.random() * 50) + 10;
        const colDiv = document.createElement("div");
        colDiv.className = "col tarjeta-medico-item";
        colDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="https://picsum.photos/300/200?random=${randomImgId}" class="card-img-top" alt="Médico">
                <div class="card-body d-flex flex-column p-2">
                    <h6 class="card-title fw-bold mb-1">${medico.nombres} ${medico.apellidos}</h6>
                    <p class="card-text text-primary small mb-1">${medico.especialidad}</p>
                    <p class="card-text small text-muted flex-grow-1">Horario: ${medico.horarioAtencion}</p>
                    <button type="button" class="btn btn-primary btn-sm btn-agendar-cita mt-2" 
                            data-id-medico="${medico.id}" 
                            data-nombre-medico="${medico.nombres} ${medico.apellidos} - ${medico.especialidad}">
                        Agendar Cita
                    </button>
                </div>
            </div>
        `;
        contenedorTarjetasMedicos.appendChild(colDiv);
    }

    formMedico.reset();
    btnAgregarMedico.disabled = true;

    document.querySelectorAll('#formMedico .error').forEach(el => el.textContent = '');
    document.querySelectorAll('#formMedico .error-input').forEach(el => el.classList.remove('error-input'));

    mostrarNotificacion(`Médico ${nombres} ${apellidos} registrado con éxito`);
});