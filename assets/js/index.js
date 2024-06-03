document.addEventListener('DOMContentLoaded',()=>{
    async function fetchPacientes(){
        const url = 'https://run.mocky.io/v3/20ce6dd6-18ba-49b6-9a78-08480c011126';
        try {
            const response = await fetch(url);
            if (!response.ok){
                throw new Error('La solicitud fallo');
            }
            return await response.json();
        }catch(error){
            console.error('Error:',error);
            return[];
        }
    }

    function createCard(data){
        const cardContainer = document.getElementById('card-container');

        const card = document.createElement('div');
        card.className = 'card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-1 mb-5';

        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${data.Rut}</h5>
            <h5 class="card-title">${data.Nombre}</h5>
            <h4 class="card-title">Stock: ${data.Edad}</h4>
            <h4 class="card-title">Stock: ${data.Sexo}</h4>
            <h4 class="card-title">Stock: ${data.Sintomas}</h4>
            <button class="btn btn primary btn-volver">Volver</button>
        </div>
        `;

        cardContainer.appendChild(card);
    }

    function renderPaciente(pacientes){
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        pacientes.forEach(createCard);    
    
    }

    function filtrarPacientes(pacientes, termino){
        return pacientes.filter(pacientes => 
            pacientes.modelo.toLowerCase().inludes(termino)
        );
    }

    document.getElementById('nombre').addEventListener('input', async () =>{
        const searchTerm = document.getElementById('nombre').value.trim().toLowerCase();
        const pacientes = await fetchPacientes();
        const filterdePacientes = filtrarPacientes(pacientes, searchTerm);
        renderPaciente(filterdePacientes);
    });  

    (async function init () {
        const pacientes = await fetchPacientes();
        renderPaciente(pacientes);
    })

})