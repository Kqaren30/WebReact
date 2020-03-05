
import React from 'react';
import './App.css';
import './index.css'
import Formulario from './components/Formulario';
import Carrusel from './components/Carrusel';
import './serviceWorker'

function App(){
  return(
    <div>
    <Carrusel/>
    <Formulario/>
    </div>
  )
}

export default App;
