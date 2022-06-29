import React, {useContext, useEffect} from 'react';
import { contexto } from './contextos/contexto';
import InputHora from './InputHora';

const HorarioUbicacion = () => {
    const Context = useContext(contexto)
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    
    return (
        <div className='row'>
            <div className='col-12'>
                <h3>Horario de Apertura</h3>
                <hr />
                <table className='table table-striped table-hover'>
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Día</th>
                                <th scope="col">Hora Inicio</th>
                                <th scope="col">Hora Término</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {dias.map((dia) => {
                                return Context.horario.map((diaHorario) => {
                                    if(dia === diaHorario.id) {
                                        return <tr>
                                            <th scope='row'>
                                                <label>{dia}</label>
                                            </th>
                                            <td>{diaHorario.horaPartida}:{diaHorario.minutoPartida}</td>
                                            <td>{diaHorario.horaTermino}:{diaHorario.minutoTermino}</td>
                                        </tr>
                                    }
                                })
                            })}
                        </tbody>
                    </table>        
            </div>
        </div>
    );
}
 
export default HorarioUbicacion;