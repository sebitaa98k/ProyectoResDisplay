let allPacientes = [];

const generateJuegoCard = ({ Rut, Nombre, Edad, Sexo, Sintomas }) => {
    return `
      <div class="col paciente-card" data-nombre="${Nombre.toLowerCase()}">
        <div class="card">
          <h5 class="card-title">Rut paciente: ${Rut}</h5>
          <h5 class="card-title">Nombre del Paciente: ${Nombre}</h5>
          <h4 class="card-title">Edad: ${Edad}</h4>
          <h4 class="card-title">Sexo: ${Sexo}</h4>
          <h4 class="card-title">Sintomas: ${Sintomas}</h4>
          <button class="btn btn-primary btn-volver">Volver</button>
        </div>
      </div>
    `;
};

const obtenerYRenderizarPacientes = async () => {
    try {
        const response = await fetch('https://run.mocky.io/v3/20ce6dd6-18ba-49b6-9a78-08480c011126');
        if (!response.ok) {
            throw new Error('La solicitud falló');
        }
        const pacientes = await response.json();
        allPacientes = pacientes; // Store the data in a global variable
        console.log('Data de la API:', pacientes); // Show API data in the console
        renderPaciente(pacientes[0]); // Render the first patient by default (or handle as you need)
    } catch (error) {
        console.error('Error:', error);
    }
};

const renderPaciente = (paciente) => {
    const contenedor = document.getElementById("contenedorJuego");
    contenedor.innerHTML = ""; // Clear the container before rendering the card
    const cardHTML = generateJuegoCard(paciente); // Generate card HTML for the patient
    contenedor.innerHTML += cardHTML; // Add the card to the container

    // Add event listener to the "Volver" button
    const volverButton = document.querySelector('.btn-volver');
    if (volverButton) {
        volverButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirige a index.html
        });
    }
};

// Function to filter patients based on the search input
const filtrarPacientes = () => {
    const searchInput = document.getElementById("nombre").value.toLowerCase();
    const paciente = allPacientes.find(paciente => 
        paciente.Nombre.toLowerCase().includes(searchInput)
    );
    if (paciente) {
        renderPaciente(paciente); // Render the card of the matched patient
    } else {
        document.getElementById("contenedorJuego").innerHTML = "<p>No se encontró ningún paciente con ese nombre.</p>";
    }
};

// Add event listener to the search input
document.getElementById("nombre").addEventListener("input", filtrarPacientes);

// Fetch and store all patients when the page loads
obtenerYRenderizarPacientes();


