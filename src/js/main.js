import Buttons from "./buttons.js";



document.addEventListener('DOMContentLoaded', function () {
    // Verifica si el usuario está autenticado
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }

    // // Manipula el historial para evitar regresar al login
    // history.pushState(null, null, window.location.href); // Agrega una entrada al historial
    // window.addEventListener('popstate', function () {
    //     history.pushState(null, null, window.location.href); // Evita regresar al login
    // });


    // Ocultar la tabla al cargar la página
    ocultarTablaProductos(); // Llama a la función para ocultar la tabla

    // Capturar el evento de cambio en el rango y actualizar el valor del <output>
    document.getElementById('rngCantidad').addEventListener('input', function () {
        this.nextElementSibling.value = this.value;
    });

    let datosCeldas = []; // Array para almacenar los datos de las celdas


    // EVENTOS EN LOS BOTONES    

    document.getElementById('tbodyProductos').addEventListener('click', function (event) {
        // event contiene información sobre el evento que ocurrió
        // event.target.id accede al elemento (etiqueta) específico dentro de #tbodyProductos que fue clickeado.

        //alert('me diste clic'); // muestra un mensaje de alerta al hacer clic en la tabla



        // ACCIONES DE LOS BOTONES

        if (event.target.id === 'btnEditar') {
            const rowEdit = event.target.closest('tr');
            const cells = rowEdit.querySelectorAll('td'); // Selecciona todas las celdas de la fila

            datosCeldas = []; // Reinicia el array de datos de celdas
            cells.forEach((cell, index) => {
                if (index < cells.length - 1) { // Evita la última celda (acciones)
                    const valorActual = cell.textContent; // Obtiene el valor actual de la celda
                    datosCeldas.push(valorActual); // Agrega el valor actual al array

                    const input = document.createElement('input'); // Crea un campo de entrada
                    input.type = 'text';
                    input.value = valorActual; // Establece el valor actual como predeterminado
                    input.className = 'form-control'; // Clase opcional para estilos
                    cell.textContent = ''; // Limpia el contenido de la celda anterior para colocar el input
                    cell.appendChild(input); // Agrega el campo de entrada a la celda
                }
            });

            // aqui funciona con tarjet porque es el elemento que disparó el evento
            Buttons.changeButtonEvent(event, Buttons.botones.btnSave.id, Buttons.botones.btnSave.ruta, Buttons.botones.btnSave.title); // Cambia el botón de editar a guardar

            // no funciona con getElementById porque no es un nodo de documento, es una celda
            const deleteButton = rowEdit.querySelector('#btnEliminar'); // Selecciona el botón de eliminar
            Buttons.changeButtonNotEvent(deleteButton, Buttons.botones.btnCancel.id, Buttons.botones.btnCancel.ruta, Buttons.botones.btnCancel.title); // Cambia el botón de eliminar a cancelar

            return; // Salir de la función después de editar
        }

        if (event.target.id.startsWith('btnEliminar')) {
            const row = event.target.closest('tr'); // Encuentra la fila más cercana al botón
            row.remove(); // Elimina la fila de la tabla
            console.log('Producto eliminado.');

            // Ocultar la tabla si no hay más filas
            if (document.querySelectorAll('#tbodyProductos tr').length === 0) {
                ocultarTablaProductos();
            }
        }

        if (event.target.id === 'btnGuardar') {
            const rowSave = event.target.closest('tr');
            const cells = rowSave.querySelectorAll('input'); // Selecciona todas las celdas de la fila
            cells.forEach((cell, index) => {
                if (index < cells.length) { // Evita la última celda (acciones)
                    const valorNuevo = cell.value; // Obtiene el nuevo valor del campo de entrada
                    // parentNode es el elemento padre del input, que es la celda <td>
                    cell.parentNode.textContent = valorNuevo; // Establece el nuevo valor en la celda
                }
            });

            Buttons.changeButtonEvent(event, Buttons.botones.btnEdit.id, Buttons.botones.btnEdit.ruta, Buttons.botones.btnEdit.title); // Cambia el botón de guardar a editar

            // no funciona con getElementById porque no es un nodo de documento, es una celda
            const cancelButton = rowSave.querySelector('#btnCancelar'); // Selecciona el botón de eliminar
            Buttons.changeButtonNotEvent(cancelButton, Buttons.botones.btnDelete.id, Buttons.botones.btnDelete.ruta, Buttons.botones.btnDelete.title); // Cambia el botón de cancelar a eliminar
            return; // Salir de la función después de guardar
        }

        if (event.target.id === 'btnCancelar') {
            const rowCancel = event.target.closest('tr');
            const cells = rowCancel.querySelectorAll('input'); // Selecciona todas las celdas de la fila

            // Verifica que datosCeldas tenga los valores esperados
            if (datosCeldas.length !== cells.length) {
                console.error('El array datosCeldas no coincide con el número de celdas.');
                return; // Salir si hay un problema con los datos
            }

            cells.forEach((cell, index) => {
                if (index < cells.length) { // Evita la última celda (acciones)
                    const valorActual = datosCeldas[index]; // Obtiene el valor actual del campo de entrada
                    cell.parentNode.textContent = valorActual; // Establece el nuevo valor en la celda
                }
            });


            Buttons.changeButtonEvent(event, Buttons.botones.btnDelete.id, Buttons.botones.btnDelete.ruta, Buttons.botones.btnDelete.title); // Cambia el botón de cancelar a eliminar
            // no funciona con getElementById porque no es un nodo de documento, es una celda
            const saveButton = rowCancel.querySelector('#btnGuardar'); // Selecciona el botón de guardar
            Buttons.changeButtonNotEvent(saveButton, Buttons.botones.btnEdit.id, Buttons.botones.btnEdit.ruta, Buttons.botones.btnEdit.title); // Cambia el botón de guardar a editar
            return; // Salir de la función después de cancelar
        }

    });
});




/* BOTÓN DEL FORMULARIO CON ENVENTO CLICK Y NO CON SUBMIT   
 
// si lo quisieras hacer con un botón de tipo button y no con el submit del formulario
// <button type="button" id="btnGuardar" class="btn btn-primary">Guardar</button>
 
document.getElementById('btnGuardar').addEventListener('click', function () {
    const form = document.getElementById('frmAltaProducto'); // Obtén el formulario
    const formData = new FormData(form); // Pasa el formulario a FormData
    console.log([...formData.entries()]);
});
 
*/


document.getElementById('frmAltaProducto').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario


    // Verificar si el formulario está válidado
    if (!this.checkValidity()) {
        this.classList.add('was-validated'); // Agrega estilos de validación de Bootstrap
        return; // Detiene la ejecución si el formulario no está válidado
    }

    // Obtener los datos del formulario. this hace referencia al formulario actual frmAltaProducto
    const formData = new FormData(this);
    console.log('Form Data:', [...formData.entries()]); // Muestra los datos del formulario en la consola

    // obtener el cuerpo de la tabla
    const tbody = document.getElementById('tbodyProductos');

    // Agregar celdas con los valores del formulario
    agregarFilaTabla(formData, tbody);

    // newRow.innerHTML = `
    //         <td>${formData.get('txtIDArticulo')}</td>
    //         <td>${formData.get('txtNombre')}</td>
    //         <td>${formData.get('rngCantidad')}</td>
    //         <td>${formData.get('txtDescripcion')}</td>
    //         <td>${formData.get('txtPrecio')}</td>
    //         <td>${formData.get('cboCategoria')}</td>
    //         <td>${formData.get('tipoVenta')}</td>
    //         <td>
    //             <button class="btn btn-warning btn-sm" onclick="editarProducto(this)">Editar</button>
    //             <button class="btn btn-danger btn-sm" onclick="eliminarProducto(this)">Eliminar</button>
    //             <button class="btn btn-warning btn-sm" onclick="ActualizarProducto(this)">Editar</button>
    //             <button class="btn btn-danger btn-sm" onclick="GuardarProducto(this)">Eliminar</button>
    //         </td>
    //     `;

    // Agregar la nueva fila al cuerpo de la tabla
    //tbody.appendChild(newRow);

    mostrarTablaProductos(); // Mostrar la tabla de productos
    resetearFormulario(this); // Llamar a la función para resetear el formulario

});


const agregarFilaTabla = (formData, tbody) => {
    const newRow = document.createElement('tr');
    createCell(newRow, formData.get('txtIDArticulo'));
    createCell(newRow, formData.get('txtNombre'));
    createCell(newRow, formData.get('rngCantidad'));
    createCell(newRow, formData.get('txtDescripcion'));
    createCell(newRow, formData.get('txtPrecio'));
    createCell(newRow, formData.get('cboCategoria'));
    createCell(newRow, formData.get('rdbTipoVenta'));

    // Crear la celda de acciones
    const actionsCell = document.createElement('td');
    const editButton = document.createElement('img');
    const deleteButton = document.createElement('img');
    // Crea el boton de guardar
    Buttons.crearBotonesAcciones(actionsCell, editButton, Buttons.botones.btnEdit.id, Buttons.botones.btnEdit.ruta, Buttons.botones.btnEdit.title);
    // Crea el boton de Eliminar
    Buttons.crearBotonesAcciones(actionsCell, deleteButton, Buttons.botones.btnDelete.id, Buttons.botones.btnDelete.ruta, Buttons.botones.btnDelete.title);

    // Agregar la celda de acciones a la fila
    newRow.appendChild(actionsCell);

    // Agregar la nueva fila al cuerpo de la tabla
    tbody.appendChild(newRow);
}


function createCell(row, value) {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
}


// Funciones =====================================

function resetearFormulario(form) {
    //this.reset();
    // Reinicia el valor del rango
    const rangoCantidad = document.getElementById('rngCantidad');
    rangoCantidad.value = 100; // Reinicia el valor del rango a 100
    // Actualiza el valor mostrado en el <output> nextElementSibling tomando el siguiente elemento hermano
    // que es el <output> en este caso.
    rangoCantidad.nextElementSibling.value = rangoCantidad.value; // Sincroniza el <output> con el rango
}


function mostrarTablaProductos() {
    const divListaProductos = document.getElementById('divListaProductos');
    divListaProductos.style.display = 'block'; // Muestra la tabla
}

function ocultarTablaProductos() {
    const divListaProductos = document.getElementById('divListaProductos');
    divListaProductos.style.display = 'none'; // Oculta la tabla
}



