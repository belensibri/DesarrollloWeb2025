//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnGuardar");
const buttonLimpiarFormulario = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAnadirPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModalAgregarPais");

//Arreglo global de pacientes
let arrayPaciente = [];

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/

const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";

  inputNombre.focus();
};

/*
Funcion para validar el ingreso del paciente
*/

const addPaciente = function () {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value;

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    //Agregando informacion al arreglo paciente
    arrayPaciente.push(
      new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
    );

    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Se ha registrado un nuevo paciente";
    //Llamando al componente de Bootstrap
    toast.show();

    //Limpiando formulario
    limpiarForm();
  } else {
    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Faltan campos por completar";
    //Llamando al componente de Bootstrap
    toast.show();
  }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
  let $fila = "";
  let contador = 1;

  arrayPaciente.forEach((element) => {
    $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${contador}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td>
                        <button id="idBtnEditar${contador}" type="button" class="btn btn-primary btn-sm" alt="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger btn-sm" alt="Eliminar">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
    </tr>`;
    contador++;
  });
  return $fila;
}

const imprimirPacientes = () => {
  let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <tr>
        <th scope="col" class="text-center" style="width:5%">#</th>
        <th scope="col" class="text-center" style="width:12%">Nombre</th>
        <th scope="col" class="text-center" style="width:12%">Apellido</th>
        <th scope="col" class="text-center" style="width:12%">Fecha de Nacimiento</th>
        <th scope="col" class="text-center" style="width:8%">Sexo</th>
        <th scope="col" class="text-center" style="width:12%">Pais</th>
        <th scope="col" class="text-center" style="width:20%">Dirección</th>
        <th scope="col" class="text-center" style="width:9%">Acciones</th>
      </tr>`;

  $table += imprimirFilas();
  $table += `</table>
  </div>`;

  document.getElementById("idTablaPacientes").innerHTML = $table;

  // Agregar eventos a los botones de editar y eliminar
  for (let i = 1; i <= arrayPaciente.length; i++) {
    document.getElementById(`idBtnEditar${i}`).onclick = () => {
      editarPaciente(i - 1);
    };

    document.getElementById(`idBtnEliminar${i}`).onclick = () => {
      eliminarPaciente(i - 1);
    };
  }
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

const editarPaciente = (indice) => {
  let paciente = arrayPaciente[indice];

  inputNombre.value = paciente[0];
  inputApellido.value = paciente[1];
  inputFechaNacimiento.value = paciente[2];

  if (paciente[3] === "Hombre") {
    inputRdMasculino.checked = true;
  } else {
    inputRdFemenino.checked = true;
  }

  // Buscar el país por nombre en el select
  for (let i = 0; i < cmbPais.options.length; i++) {
    if (cmbPais.options[i].text === paciente[4]) {
      cmbPais.value = cmbPais.options[i].value;
      break;
    }
  }

  inputDireccion.value = paciente[5];

  // Eliminar el paciente del arreglo
  arrayPaciente.splice(indice, 1);

  // Mostrar notificación
  mensaje.innerHTML = "Editando paciente";
  toast.show();

  // Enfoque en el campo nombre
  inputNombre.focus();
};

const eliminarPaciente = (indice) => {
  arrayPaciente.splice(indice, 1);

  mensaje.innerHTML = "Paciente eliminado correctamente";
  toast.show();

  imprimirPacientes();
};

const addPais = () => {
  let paisNew = inputNombrePais.value;

  if (paisNew != "") {
    // Creando nuevo option con la API DOM
    let option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGlobalOption + 1;
    //Agregando el nuevo option en el select
    cmbPais.appendChild(option);

    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Pais agregado correctamente";
    //Llamando al componente de Bootstrap
    toast.show();
  } else {
    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Faltan campos por completar";
    //Llamando al componente de Bootstrap
    toast.show();
  }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarFormulario.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("show.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();

// ============================================
// SECCION DE VALIDACION CON EXPRESIONES REGULARES
// ============================================

// Selectores para el formulario de estudiante
const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombreCompleto = document.getElementById("idTxtNombreCompleto");
const inputDUI = document.getElementById("idTxtDUI");
const inputNIT = document.getElementById("idTxtNIT");
const inputFechaNacimientoEst = document.getElementById("idTxtFechaNacimientoEst");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const buttonValidar = document.getElementById("idBtnValidar");
const buttonLimpiarEst = document.getElementById("idBtnLimpiarEst");
const resultadoValidacion = document.getElementById("idResultadoValidacion");

// Elementos de error
const errorCarnet = document.getElementById("idErrorCarnet");
const errorNombre = document.getElementById("idErrorNombre");
const errorDUI = document.getElementById("idErrorDUI");
const errorNIT = document.getElementById("idErrorNIT");
const errorFecha = document.getElementById("idErrorFecha");
const errorCorreo = document.getElementById("idErrorCorreo");
const errorEdad = document.getElementById("idErrorEdad");

// Expresiones regulares
const regexCarnet = /^[A-Z]{2}\d{3}$/; // Dos letras y tres números: AB001
const regexNombre = /^[a-záéíóúñ\s]{3,}$/i; // Solo letras y espacios, mínimo 3 caracteres
const regexDUI = /^\d{8}-\d{1}$/; // 8 dígitos - 1 dígito: 12345678-9
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/; // 4-6-3-1 dígitos: 1234-567890-123-4
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Correo válido
const regexEdad = /^\d+$/; // Solo números

// Función para validar todos los campos
const validarFormularioEstudiante = () => {
  let esValido = true;

  // Limpiar mensajes de error
  errorCarnet.textContent = "";
  errorNombre.textContent = "";
  errorDUI.textContent = "";
  errorNIT.textContent = "";
  errorFecha.textContent = "";
  errorCorreo.textContent = "";
  errorEdad.textContent = "";

  // Validar Carnet
  if (inputCarnet.value === "") {
    errorCarnet.textContent = "El carnet es requerido";
    esValido = false;
  } else if (!regexCarnet.test(inputCarnet.value)) {
    errorCarnet.textContent = "Formato inválido. Ej: AB001";
    esValido = false;
  }

  // Validar Nombre Completo
  if (inputNombreCompleto.value === "") {
    errorNombre.textContent = "El nombre es requerido";
    esValido = false;
  } else if (!regexNombre.test(inputNombreCompleto.value)) {
    errorNombre.textContent = "Nombre inválido (sin números ni caracteres especiales)";
    esValido = false;
  }

  // Validar DUI
  if (inputDUI.value === "") {
    errorDUI.textContent = "El DUI es requerido";
    esValido = false;
  } else if (!regexDUI.test(inputDUI.value)) {
    errorDUI.textContent = "Formato inválido. Ej: 12345678-9";
    esValido = false;
  }

  // Validar NIT
  if (inputNIT.value === "") {
    errorNIT.textContent = "El NIT es requerido";
    esValido = false;
  } else if (!regexNIT.test(inputNIT.value)) {
    errorNIT.textContent = "Formato inválido. Ej: 1234-567890-123-4";
    esValido = false;
  }

  // Validar Fecha de Nacimiento
  if (inputFechaNacimientoEst.value === "") {
    errorFecha.textContent = "La fecha es requerida";
    esValido = false;
  }

  // Validar Correo
  if (inputCorreo.value === "") {
    errorCorreo.textContent = "El correo es requerido";
    esValido = false;
  } else if (!regexCorreo.test(inputCorreo.value)) {
    errorCorreo.textContent = "Correo inválido. Ej: usuario@ejemplo.com";
    esValido = false;
  }

  // Validar Edad
  if (inputEdad.value === "") {
    errorEdad.textContent = "La edad es requerida";
    esValido = false;
  } else if (!regexEdad.test(inputEdad.value) || inputEdad.value < 0 || inputEdad.value > 120) {
    errorEdad.textContent = "Edad inválida (solo números, 0-120)";
    esValido = false;
  }

  if (esValido) {
    mostrarResultadoValidacion();
  }
};

// Función para mostrar el resultado de la validación
const mostrarResultadoValidacion = () => {
  const resultado = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <h5 class="alert-heading"><i class="bi bi-check-circle"></i> ¡Validación Exitosa!</h5>
      <p><strong>Carnet:</strong> ${inputCarnet.value}</p>
      <p><strong>Nombre:</strong> ${inputNombreCompleto.value}</p>
      <p><strong>DUI:</strong> ${inputDUI.value}</p>
      <p><strong>NIT:</strong> ${inputNIT.value}</p>
      <p><strong>Fecha de Nacimiento:</strong> ${inputFechaNacimientoEst.value}</p>
      <p><strong>Correo:</strong> ${inputCorreo.value}</p>
      <p><strong>Edad:</strong> ${inputEdad.value} años</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  resultadoValidacion.innerHTML = resultado;
};

// Función para limpiar el formulario de estudiante
const limpiarFormEstudiante = () => {
  inputCarnet.value = "";
  inputNombreCompleto.value = "";
  inputDUI.value = "";
  inputNIT.value = "";
  inputFechaNacimientoEst.value = "";
  inputCorreo.value = "";
  inputEdad.value = "";
  resultadoValidacion.innerHTML = "";

  errorCarnet.textContent = "";
  errorNombre.textContent = "";
  errorDUI.textContent = "";
  errorNIT.textContent = "";
  errorFecha.textContent = "";
  errorCorreo.textContent = "";
  errorEdad.textContent = "";

  inputCarnet.focus();
};

// Event listeners para el formulario de estudiante
buttonValidar.onclick = () => {
  validarFormularioEstudiante();
};

buttonLimpiarEst.onclick = () => {
  limpiarFormEstudiante();
};


