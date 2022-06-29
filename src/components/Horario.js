// @ts-nocheck
import React, {useState, useEffect, useContext} from 'react';
import { contexto } from './contextos/contexto';
import { db } from '../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import InputHora from './InputHora';

const Horario = () => {
    const Context = useContext(contexto)
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    var hora = "";
    return (
        <>
            <div className='row'>
                <div className='col-12 mt-3'>
                    <h2>Horario de la tienda</h2>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
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
                                            <td>
                                                <InputHora
                                                    horas={diaHorario.horaPartida}
                                                    minutos={diaHorario.minutoPartida}
                                                    dia={diaHorario.id}
                                                    opcion={"Inicio"}
                                                />
                                            </td>
                                            <td>
                                                <InputHora
                                                    horas={diaHorario.horaTermino}
                                                    minutos={diaHorario.minutoTermino}
                                                    dia={diaHorario.id}
                                                    opcion={"Termino"}
                                                />
                                            </td>
                                            
                                        </tr>
                                    }
                                })
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default Horario;