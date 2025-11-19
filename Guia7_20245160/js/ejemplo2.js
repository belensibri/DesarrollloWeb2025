const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");


const validarNoVacio = function(valor, nombre) {
    if (valor === null || valor.toString().trim() === "") {
        return { valido: false, mensaje: `${nombre} no puede estar vacío.` };
    }
    return { valido: true };
};


const validarFechaNacimiento = function(fecha) {
    const fechaNac = new Date(fecha);
    const hoy = new Date();
    
    if (fechaNac > hoy) {
        return { valido: false, mensaje: "La fecha de nacimiento no puede ser mayor a la fecha actual." };
    }
    return { valido: true };
};


const validarEmail = function(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        return { valido: false, mensaje: "El formato del correo electrónico no es válido." };
    }
    return { valido: true };
};


const validarContraseñas = function(pass1, pass2) {
    if (pass1 !== pass2) {
        return { valido: false, mensaje: "Las contraseñas no coinciden." };
    }
    return { valido: true };
};


const validarCheckboxSeleccionado = function() {
    const checkboxes = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];
    
    const algunoSeleccionado = checkboxes.some(cb => cb.checked);
    if (!algunoSeleccionado) {
        return { valido: false, mensaje: "Debe seleccionar al menos un interés." };
    }
    return { valido: true };
};


const validarRadioSeleccionado = function(nombreRadio) {
    const radios = document.querySelectorAll(`input[name="${nombreRadio}"]`);
    const algunoSeleccionado = Array.from(radios).some(radio => radio.checked);
    
    if (!algunoSeleccionado) {
        return { valido: false, mensaje: "Debe seleccionar una carrera." };
    }
    return { valido: true };
};


const validarSelectSeleccionado = function(elementId) {
    const select = document.getElementById(elementId);
    const valor = select.value;
    
    if (valor === "Seleccione una opcion" || valor === "") {
        return { valido: false, mensaje: "Debe seleccionar un país de origen." };
    }
    return { valido: true };
};


const obtenerCheckboxSeleccionados = function() {
    const checkboxes = [
        { id: "idCkProgramacion", label: "Programación" },
        { id: "idCkBD", label: "Base de Datos" },
        { id: "idCkRedes", label: "Inteligencia Artificial" },
        { id: "idCkSeguridad", label: "Seguridad Informática" }
    ];
    
    return checkboxes.filter(cb => document.getElementById(cb.id).checked).map(cb => cb.label);
};


const obtenerRadioSeleccionado = function(nombreRadio) {
    const radios = document.querySelectorAll(`input[name="${nombreRadio}"]`);
    for (let radio of radios) {
        if (radio.checked) {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            return label ? label.textContent : radio.value;
        }
    }
    return "";
};


const obtenerTextoPais = function(elementId) {
    const select = document.getElementById(elementId);
    const opcion = select.options[select.selectedIndex];
    return opcion.text;
};


const crearTablaResultados = function(datos) {
   
    while (bodyModal.hasChildNodes()) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    
    
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-sm");
    
   
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    
    const thCampo = document.createElement("th");
    thCampo.setAttribute("scope", "col");
    const textoCampo = document.createTextNode("Campo");
    thCampo.appendChild(textoCampo);
    trHead.appendChild(thCampo);
    
    const thValor = document.createElement("th");
    thValor.setAttribute("scope", "col");
    const textoValor = document.createTextNode("Valor");
    thValor.appendChild(textoValor);
    trHead.appendChild(thValor);
    
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
   
    const tbody = document.createElement("tbody");
    
    
    const crearFila = function(campo, valor) {
        const tr = document.createElement("tr");
        
        const tdCampo = document.createElement("td");
        tdCampo.appendChild(document.createTextNode(campo));
        tr.appendChild(tdCampo);
        
        const tdValor = document.createElement("td");
        tdValor.appendChild(document.createTextNode(valor));
        tr.appendChild(tdValor);
        
        tbody.appendChild(tr);
    };
    
    crearFila("Nombres", datos.nombre);
    crearFila("Apellidos", datos.apellidos);
    crearFila("Fecha de Nacimiento", datos.fechaNac);
    crearFila("Correo Electrónico", datos.correo);
    crearFila("Intereses", datos.intereses.join(", "));
    crearFila("Carrera", datos.carrera);
    crearFila("País de Origen", datos.pais);
    
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
};


const validarFormulario = function() {
    const nombre = document.getElementById("idNombre").value;
    const apellidos = document.getElementById("idApellidos").value;
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value;
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    const pais = document.getElementById("idCmPais").value;
    
    
    const validaciones = [
        validarNoVacio(nombre, "Nombres"),
        validarNoVacio(apellidos, "Apellidos"),
        validarNoVacio(fechaNac, "Fecha de Nacimiento"),
        validarFechaNacimiento(fechaNac),
        validarNoVacio(correo, "Correo Electrónico"),
        validarEmail(correo),
        validarNoVacio(password, "Contraseña"),
        validarNoVacio(passwordRepetir, "Repetir Contraseña"),
        validarContraseñas(password, passwordRepetir),
        validarCheckboxSeleccionado(),
        validarRadioSeleccionado("idRdCarrera"),
        validarSelectSeleccionado("idCmPais")
    ];
    
   
    const errores = validaciones.filter(v => !v.valido);
    
    if (errores.length > 0) {
        
        let mensajeError = "Errores encontrados:";
        errores.forEach(error => {
            mensajeError += `• ${error.mensaje}`;
        });
        alert(mensajeError);
        return;
    }
    
    
    const datos = {
        nombre: nombre,
        apellidos: apellidos,
        fechaNac: fechaNac,
        correo: correo,
        intereses: obtenerCheckboxSeleccionados(),
        carrera: obtenerRadioSeleccionado("idRdCarrera"),
        pais: obtenerTextoPais("idCmPais")
    };
    
   
    const modalLabel = document.getElementById("modalLabel");
    const textoLabel = modalLabel.firstChild;
    if (textoLabel) {
        textoLabel.nodeValue = "Datos del Registro";
    } else {
        modalLabel.appendChild(document.createTextNode("Datos del Registro"));
    }
    
    
    crearTablaResultados(datos);
    modal.show();
};


button.onclick = () => {
    validarFormulario();
};
