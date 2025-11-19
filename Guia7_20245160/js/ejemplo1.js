const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"),{});


const idYaExiste = function(idAVerificar) {
    const elemento = document.getElementById(`id${idAVerificar}`);
    return elemento !== null;
};

const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;

    if (elemento != ""){

        modal.show();

    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function(){

    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++){
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {

    let addElemento=document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {

    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");
        
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for",`id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};


const validarFormulario = function() {
    const controles = newForm.querySelectorAll('input, select, textarea');
    
    if (controles.length === 0) {
        alert("El formulario está vacío. Agregue al menos un control.");
        return;
    }

    let errores = [];
    let camposValidos = 0;

    controles.forEach((control) => {
     
        if (control.tagName === 'INPUT' || control.tagName === 'SELECT' || control.tagName === 'TEXTAREA') {
            const tipoControl = control.type || control.tagName.toLowerCase();
            
            
            if (tipoControl === 'radio' || tipoControl === 'checkbox') {
               
                if (control.checked) {
                    camposValidos++;
                } else {
                    errores.push(`${control.id}: No está seleccionado`);
                }
            } else if (tipoControl === 'select' || control.tagName === 'SELECT') {
                
                if (control.value && control.value !== '') {
                    camposValidos++;
                } else {
                    errores.push(`${control.id}: No hay opción seleccionada`);
                }
            } else {
               
                if (control.value.trim() !== '') {
                    camposValidos++;
                } else {
                    errores.push(`${control.id}: Campo vacío`);
                }
            }
        }
    });

    if (errores.length > 0) {
        let mensajeError = `Hay ${errores.length} campo(s) sin completar:\\n\\n`;
        errores.forEach((error) => {
            mensajeError += `• ${error}\\n`;
        });
        alert(mensajeError);
    } else {
        alert(`¡Validación exitosa! Todos los ${camposValidos} campo(s) están completados correctamente.`);
    }
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonValidar.onclick = () => {
    validarFormulario();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != ""){
        
        if (idYaExiste(nombreElemento.value)) {
            alert(`Error: Ya existe un control con el ID "id${nombreElemento.value}". No se permiten controles con el mismo ID.`);
            return;
        }

        let elemento = cmbElemento.value;

        if(elemento == "select"){
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox"){
            newRadioCheckbox(elemento);
        }else{
            newInput(elemento);
        }
    }else{
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";

    tituloElemento.focus();
});