import React, { useEffect } from 'react';


function Formulario() {

  //document.querySelector('#btnSave').addEventListener('click',saveAdd);//escuchamos mi evento de guardar cuando se hace click
  useEffect(() => {
    drawTable();
  });

  function saveAdd() {//con esta funcion declaro mis variables y con mi funcio de addToSystem lo paso a JSON
    /*     var sID=document.querySelector('#txtID').value; */
    var lista = getList();
    if (lista.length <= 0) {
      var sID = 1

    } else {
      var sID = parseInt(lista[lista.length - 1].id) + 1
    }

    var sName = document.querySelector('#txtName').value;
    var sLastname = document.querySelector('#txtLastname').value;
    var sEmail = document.querySelector('#txtEmail').value;
    var sAge = document.querySelector('#txtAge').value;
    var sBirth = document.querySelector('#txtBirth').value;


    addToSystem(sID, sName, sLastname, sEmail, sAge, sBirth);//
    drawTable();
    document.getElementById('modal').className="modal";
    White();
  }

  function drawTable() {
    var lista = getList();
    var tbody = document.querySelector('#data_table tbody');

    tbody.innerHTML = '';
    for (var i = 0; i < lista.length; i++) {
      var row = tbody.insertRow(i);
      var idCell = row.insertCell(0);
      var nameCell = row.insertCell(1);
      var lastNameCell = row.insertCell(2);
      var emailCell = row.insertCell(3);
      var ageCell = row.insertCell(4);
      var birthCell = row.insertCell(5);
      var deleteCell = row.insertCell(6);

      idCell.innerHTML = lista[i].id;
      nameCell.innerHTML = lista[i].name;
      lastNameCell.innerHTML = lista[i].lastName;
      emailCell.innerHTML = lista[i].email;
      ageCell.innerHTML = lista[i].age;
      birthCell.innerHTML = lista[i].birth;

      var deleteButton = document.createElement('button');
      deleteButton.id = 'btnDelete-' + lista[i].id;
      deleteButton.innerHTML = 'x';
      deleteButton.className = 'button is-danger';
      deleteButton.onclick = function () {
        var list = JSON.parse(localStorage.getItem('localList'));
        for (var c = 0; c < list.length; c++) {
          if (list[c].id == this.id.split("-")[1]) {
            list.splice(c, 1);
            localStorage.setItem('localList', JSON.stringify(list));
            drawTable();
            break;
          }
        }
      }


      deleteCell.appendChild(deleteButton);
      tbody.appendChild(row);//agregamos al body la fila nueva
    }
  }


  var list = [] //mi array de objetos

  function addToSystem(pID, pName, pLastname, pEmail, pAge, pBirth) {

    var newAdd = {
      id: pID,
      name: pName,
      lastName: pLastname,
      email: pEmail,
      age: pAge,
      birth: pBirth

    }//en formato JSON ->propiedad:valor
    console.log(newAdd);//lo agregado a localstorage
    list.push(newAdd);//se van agregando a mi array de list
    localStorageList(list);//llamo mi funcion para guardarlo en LS

  }
  //funcion llamada por uiLogic para dibujar la tabla
  //2.-Consultamos si mi lista esta en el localstorage
  function getList() {
    var storedList = localStorage.getItem('localList');
    if (storedList === null) {//si no hay nada se resetea con corchetes vacios
      list = [];
    } else {//si hay informacion se parsea el texto retomando los datos del LS
      list = JSON.parse(storedList); //de texto vuelve al formato que tenia
    }
    return list;
  }

  //1.-funcion para guardarlos del localStorage cada que hacemos un ingreso,stringify=nos lo convierte en texto
  function localStorageList(plist) {
    localStorage.setItem('localList', JSON.stringify(plist));//
  }

  //funciones para activar mi ventana modal
  function Modal(){
    document.getElementById('modal').className="modal is-active";
  }

  function closeModal(){
    document.getElementById('modal').className="modal";
  }

  //validacion de formulario
  function validation(){
    var name = document.querySelector('#txtName').value;
   var lastname = document.querySelector('#txtLastname').value;
    var email = document.querySelector('#txtEmail').value;
    var age = document.querySelector('#txtAge').value;
    var birth = document.querySelector('#txtBirth').value;

    //validacion de email=La expresión regular final para validar el email 
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if(name.length==0){alert('Falta tu nombre');}
    else if(lastname.length==0){alert('Falta tu apellido');}
    else if(email.length==0){alert('Falta tu email');}
    else if(age.length==0){alert('Falta tu edad');}
    else if(birth.length==0){alert('Falta tu fecha nacimiento');}
    else if(!regex.test(email)){alert("La dirección de correo es incorrecta.");}
    else if(!isValidDate(birth)){alert("Ingresaste mal tu fecha de nacimiento");}
    else saveAdd();
//El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular
  }
//valida mi fecha
  function isValidDate(date){
    return !isNaN((new Date(date)).getTime());
}
  //resetea mi formulario
  function White(){
    document.getElementById("formulario").reset();
  }
  return (
    <div className="App">
      <div className="modal is-clipped" id="modal">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-content">
          <div className="box contenedor">

            <h2 className="title is-3">Registro</h2>
            <form id="formulario" className="is-three-quarter column">

              <label htmlFor="txtName" className="subtitle is-4">Nombre: </label>
              <input type="text" className="input is-rounded caja" id="txtName" placeholder="Ingresa tu nombre" />

              <label htmlFor="txtLastName" className="subtitle is-4">Apellidos: </label>
              <input type="text" className="input is-rounded caja" id="txtLastname" placeholder="Ingresa tu apellido" />

              <label htmlFor="txtEmail" className="subtitle is-4">Email: </label>
              <input type="email" className="input is-rounded caja" id="txtEmail" placeholder="Ingresa tu email"/>

              <label htmlFor="txtAge" className="subtitle is-4">Edad: </label>
              <input type="number" className="input is-rounded caja" id="txtAge" placeholder="Ingresa tu edad"/>

              <label htmlFor="txtBirth" className="subtitle is-4">Nacimiento: </label>
              <input type="date" className="input is-rounded caja" id="txtBirth" placeholder="Ingresa tu fecha de nacimiento" />

              <button type="button" className="button is-success guardar" id="btnSave" onClick={validation}>Guardar</button>
            </form>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
      </div>
      <center>
      <button className="button is-primary is-large modal-button botonModal" data-target="modal" aria-haspopup="true" onClick={Modal}>Formulario</button>
      </center>
      <center>
        <div className="box column is-two-thirds">
        <h2 className="title is-3">Ingresados</h2>
        <div className="table-container">
        <table align='center' className="table has-background-primary is-bordered is-striped" id="data_table" >
          <thead>
            <tr className="is-selected">
              <th >ID</th>
              <th >Nombre</th>
              <th >Apellido</th>
              <th >Email</th>
              <th >Edad</th>
              <th >Nacimiento</th>
              <th >Borrar</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        </div>
        </div>
      </center>
    </div>

  )
}

export default Formulario;