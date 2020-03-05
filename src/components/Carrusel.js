import React from 'react';
import imagen1 from '../img/img1.jpg';
import imagen2 from '../img/img2.jpg';
import imagen3 from '../img/img3.jpg';
import imagen4 from '../img/img4.jpg';
import imagen5 from '../img/img5.jpg';


function Carrusel() {

  var IMAGENES = [imagen1, imagen2, imagen3, imagen4, imagen5];
  var time = setInterval(mostrarImagen, 3000);
  var cont = 0;

  var direccion = 1; // 1=avanza -1=retrocede
  
  console.log(imagen1, imagen2, imagen3, imagen4, imagen5)
  
  function avanzar() {
      if (cont < IMAGENES.length - 1) {

          document.getElementById('imagen').src = IMAGENES[cont + 1];
          cont++;
      } else {
          document.getElementById('imagen').src = IMAGENES[0];
          cont = 0;
      }
      direccion = 1;
      clearInterval(time);
      time = setInterval(mostrarImagen, 3000);
  }
  
  function retroceder() {
      if (cont > 0) {
          document.getElementById('imagen').src = IMAGENES[cont - 1];
          cont--;
      } else {
          document.getElementById('imagen').src = IMAGENES[IMAGENES.length - 1]
          cont = IMAGENES.length - 1;

      }
      direccion = -1;
      clearInterval(time);
      time = setInterval(mostrarImagen, 3000);
  }
  
  function mostrarImagen() {
      if (direccion == 1) {
          avanzar();
      } else {
          retroceder();
      }
  }
  return (
    <div className="carrusel columns is-mobile">
    <button id="atras" className="button is-link is-light is-rounded is-outlined is-large" onClick={retroceder}>{"<"}</button>
      <figure className="image is-16by9 w-100"><img src={imagen1} className=" has-ratio center"  id="imagen"></img></figure>
      <button id="adelante" className="button is-rounded is-link is-light is-outlined is-large" onClick={avanzar}>{">"}</button>
    </div>
  )
}

export default Carrusel;