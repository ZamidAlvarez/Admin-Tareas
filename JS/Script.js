let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
let tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];

function guardarTareas() {
    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
    localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadas));
}

function agregarTarea() {
    const entradaTarea = document.getElementById('entradaTarea');
    const textoTarea = entradaTarea.value.trim();

    //nota: el === sirve pa comparar valores de manera mas precisa.

    if (textoTarea === '') return;

    const tarea = {
        texto: textoTarea,
        fechaCreacion: new Date().toLocaleString()
    };

    //condicional para verificar si la tarea ya esta creada o no en pendientes con su respectivo mensaje
    if (tareasPendientes.some(t => t.texto === textoTarea)) {
        mostrarMensaje('Perdón, esta tarea ya existe y está en Pendientes.', 'rojo');
    } else {
        tareasPendientes.push(tarea);
        mostrarMensaje('Tarea agregada.', 'azul');
        actualizarPendientes();
        guardarTareas();
    }

    entradaTarea.value = '';
}

function completarTarea(indice) {
    const tarea = tareasPendientes.splice(indice, 1)[0]; // esto saca la tarea de tareas pendientes.
    tarea.fechaFinalizacion = new Date().toLocaleString(); //añade la fecha y hora de finalizacion a la tarea.
    tareasCompletadas.push(tarea); // mueve la tarea a la lista de tareas completadas
    mostrarMensaje(`Tarea "${tarea.texto}" finalizada.`, 'azul'); //mensaje de tarea tales finalizada
    actualizarPendientes();
    actualizarCompletadas();
    guardarTareas();
}

function eliminarTarea(indice) {
    tareasCompletadas.splice(indice, 1);
    actualizarCompletadas();
    guardarTareas();
}

function actualizarPendientes() {
    const listaPendientes = document.getElementById('tareasPendientes'); // obtener el elemento de la lista .
    if (!listaPendientes) return; // pregunta si el elemento esta o no esta
    listaPendientes.innerHTML = ''; // limpia la lista
    tareasPendientes.forEach((tarea, indice) => {
        const tareaItem = document.createElement('li'); // creacion de elemento de lista.
        tareaItem.textContent = `${tarea.texto} creada el ${tarea.fechaCreacion}`; // establecer el contenido como texto con ese formato.

        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = 'Finalizar Tarea';
        botonCompletar.onclick = () => completarTarea(indice);

        tareaItem.appendChild(botonCompletar);
        listaPendientes.appendChild(tareaItem);
    });
}

function actualizarCompletadas() {
    const listaCompletadas = document.getElementById('tareasCompletadas');
    if (!listaCompletadas) return;
    listaCompletadas.innerHTML = '';
    tareasCompletadas.forEach((tarea, indice) => {
        const tareaItem = document.createElement('li');
        tareaItem.textContent = `${tarea.texto} Tarea finalizada el ${tarea.fechaFinalizacion}`; // cadena de texto que convierte la fecha y hora a texto y la muestra junto a el nombre de la respectiva tarea.
        tareaItem.classList.add('completada');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarTarea(indice);

        tareaItem.appendChild(botonEliminar);
        listaCompletadas.appendChild(tareaItem);
    });
}

// diseño del mensaje
function mostrarMensaje(mensaje, color) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.backgroundColor = color === 'azul' ? '#6c5dda' : '#f94880';
    mensajeDiv.style.padding = '10px';
    mensajeDiv.style.marginTop = '10px';
}

// Llamar a las funciones de actualización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarPendientes();
    actualizarCompletadas();
});
