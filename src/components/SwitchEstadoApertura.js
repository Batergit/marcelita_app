// @ts-nocheck
import React, {useState, useEffect, useContext} from 'react';
import { contexto } from './contextos/contexto';
import { db } from '../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

const SwitchEstadoApertura = () => {
    const Context = useContext(contexto)
    const[apertura, setApertura] = useState(true)
    const[labelInterruptor, setLabelInterruptor] = useState("Tienda")

    useEffect(() => {
        if(Context.apertura.length) {
            setApertura(Context.apertura[0].estado)
            if(Context.apertura[0].estado === true) {
                setLabelInterruptor("Tienda Abierta")
            }
            else {
                setLabelInterruptor("Tienda Cerrada")
            }
        }
    }, [Context.apertura])
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h2>Estado Apertura de la tienda</h2>
                    <hr />
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <form className='form-check form-switch'>
                        <input 
                            className="form-check-input" 
                            checked={apertura}
                            type="checkbox" 
                            id="switch"
                            onChange={(e) => {
                                e.preventDefault()
                                if(apertura === true) {
                                    setLabelInterruptor("Tienda Abierta")
                                }
                                else {
                                    setLabelInterruptor("Tienda Cerrada")
                                }
                                setApertura(!apertura)
                                updateDoc(doc(db, "Apertura", "RAxeJi1X6SEbjXxsKU7x"), {
                                    estado: !apertura
                                })
                            }}
                        />
                        <label className="form-check-label" htmlFor="switch">{labelInterruptor}</label>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default SwitchEstadoApertura;