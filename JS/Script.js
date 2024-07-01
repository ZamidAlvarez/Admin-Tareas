let tareasPendientes = [];
let tareasCompletadas = [];

function agregarTarea() {
    const entradaTarea = document.getElementById('entradaTarea');
    const textoTarea = entradaTarea.value.trim();

    if (textoTarea === '') return;

    // Verificar si la tarea ya existe en tareasPendientes
    if (tareasPendientes.includes(textoTarea)) {
        mostrarMensaje('Lo siento, esta tarea ya existe y esta en Pendientes.', 'rojo');
    } else {
        tareasPendientes.push(textoTarea);
        mostrarMensaje('Tarea agregada.', 'verde');
        actualizarPendientes();
    }

    entradaTarea.value = '';
}

function completarTarea(indice) {
    const tarea = tareasPendientes.splice(indice, 1)[0];
    tareasCompletadas.push(tarea);
    actualizarPendientes();
    actualizarCompletadas();
}

function eliminarTarea(indice) {
    tareasCompletadas.splice(indice, 1);
    actualizarCompletadas();
}

function actualizarPendientes() {
    const listaPendientes = document.getElementById('tareasPendientes');
    listaPendientes.innerHTML = '';
    tareasPendientes.forEach((tarea, indice) => {
        const tareaItem = document.createElement('li');
        tareaItem.textContent = tarea;

        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = 'Completar';
        botonCompletar.onclick = () => completarTarea(indice);

        tareaItem.appendChild(botonCompletar);
        listaPendientes.appendChild(tareaItem);
    });
}

function actualizarCompletadas() {
    const listaCompletadas = document.getElementById('tareasCompletadas');
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
    mensajeDiv.style.backgroundColor = color === 'verde' ? '#dcedc8' : '#ffcdd2'; // Verde claro o rojo claro
    mensajeDiv.style.padding = '10px';
    mensajeDiv.style.marginTop = '10px';
}
