import React, { Fragment, useEffect, useState } from 'react'
import Cita from './components/Cita';
import Formulario from './components/Formulario';




function App() {
//Citas en Local Storage
let citaIniciales =  JSON.parse(localStorage.getItem('Citas'))
  if (!citaIniciales) {
    citaIniciales= [];
  }
// arreglos de citas
const [citas, guardarCitas] = useState(citaIniciales);

// Use Effect para realizar ciertas operaciones cuando el state cambia
useEffect ( () =>{
  let citaIniciales =  JSON.parse(localStorage.getItem('Citas'))
  if (citaIniciales) {
    localStorage.setItem('Citas', JSON.stringify(citas));
  }else{
    localStorage.setItem('citas', JSON.stringify([]));
  }
}, [citas]); // para que se ejecute 1 vez hay que pasarle un array vacio si se le pasa por ejemplo citas va a 
        // activarse cada ves que el usestate de citas se use 

// funcion de gaurdarCitas

const crearCita = cita => {
  guardarCitas([
    ...citas,
    cita
  ])
}

//funcion que eliminar una cita por su id
const eliminarCita = id =>{
  const nuevasCitas = citas.filter(cita => cita.id !== id); 
  guardarCitas(nuevasCitas);
}
  // Mensaje condicional

  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administrador de Citas'
  return (
    <Fragment>
    <h1>Administrador de Pacientes</h1>
    <div className='container'>
      <div className='row'>
        <div className='one-half column'>
          <Formulario 
            crearCita={crearCita}
          />
        </div>
        <div className='one-half column'>
          <h1>{titulo}</h1>
          {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
        </div>
        
      </div>

    </div>
    
    </Fragment>
  );
}

export default App;
