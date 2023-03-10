import React, { Fragment, useState } from 'react'
import uuid from 'react-uuid';
import PropTypes  from 'prop-types'

const Formulario = ({crearCita}) => {
//Crear State de Citas
const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
});
const [error, actualizarError] = useState(false);

//crear function para cada input del formulario

const actualizarState = e =>{
    actualizarCita({
        ...cita,[e.target.name]: e.target.value
    })    
}

// Extraer Valores
const {mascota, propietario, fecha, hora, sintomas} = cita;

//cuando el usuario presiona el boton
    const submitCita = e =>{
        e.preventDefault();
        // Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;

        }
        // Eliminar el mensaje
        actualizarError(false);
        //Asignar un ID
        cita.id = uuid();


        // Crear la Cita
        crearCita(cita)

        //Reiniciar el Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }

    return (  
        <Fragment>
             <h2>Crear Cita</h2>
                { error
                ? <p className='alerta-error'>Todos los Campos son Obligatorios</p>
                :null
                }
                
                

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                    <input 
                        type="text"
                        name="mascota"
                        className="u-full-width"
                        placeholder="Nombre Mascota"
                        onChange={actualizarState}
                        value={mascota}
                    />
                    <label>Nombre de Dueño</label>
                    <input 
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombre del dueño de la Mascota"
                        onChange={actualizarState}
                        value={propietario}
                    />
                        <label>Fecha</label>
                    <input 
                        type="date"
                        name="fecha"
                        className="u-full-width"         
                        onChange={actualizarState}     
                        value={fecha}      
                    />
                        <label>Hora</label>
                    <input 
                        type="time"
                        name="hora"
                        className="u-full-width" 
                        onChange={actualizarState}
                        value={hora}                   
                    />
                        <label>Sintomas</label>
                   <textarea
                        className="u-full-width"
                        name="sintomas"
                        onChange={actualizarState}
                        value={sintomas}
                   ></textarea>
                   <button
                    type="submit"
                    className='u-full-width button-primary'
                   >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.protoTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario
