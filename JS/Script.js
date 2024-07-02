let tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes')) || [];
let tareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];

function guardarTareas() {
    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
    localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadas));
}

function agregarTarea() {
    const entradaTarea = document.getElementById('entradaTarea');
    const textoTarea = entradaTarea.value.trim();

    //nota: el === sirve pa comparar valores de manera mas precisa.
    
    if (textoTarea === '') return;

    if (tareasPendientes.includes(textoTarea)) {
        mostrarMensaje('Perdón, esta tarea ya existe y está en Pendientes.', 'rojo');
    } else {
        tareasPendientes.push(textoTarea);
        mostrarMensaje('Tarea agregada.', 'azul');
        actualizarPendientes();
        guardarTareas();
    }

    entradaTarea.value = '';
}

function completarTarea(indice) {
    const tarea = tareasPendientes.splice(indice, 1)[0];
    tareasCompletadas.push(tarea);
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
    const listaPendientes = document.getElementById('tareasPendientes');
    if (!listaPendientes) return;
    listaPendientes.innerHTML = '';
    tareasPendientes.forEach((tarea, indice) => {
        const tareaItem = document.createElement('li');
        tareaItem.textContent = tarea;

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
        tareaItem.textContent = tarea;
        tareaItem.classList.add('completada');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarTarea(indice);

        tareaItem.appendChild(botonEliminar);
        listaCompletadas.appendChild(tareaItem);
    });
}

function mostrarMensaje(mensaje, color) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.backgroundColor = color === 'azul' ? '#6c5dda' : '#f94880';
    mensajeDiv.style.padding = '10px';
    mensajeDiv.style.marginTop = '10px';
}

// Llamar a las funciones de actualizacion al cargar las paginas
document.addEventListener('DOMContentLoaded', () => {
    actualizarPendientes();
    actualizarCompletadas();
});
