// @ts-nocheck
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Form, FormCheck } from 'react-bootstrap';

const Horario = () => {
    const[apertura, setApertura] = useState(true)
    const[labelInterruptor, setLabelInterruptor] = useState("Abrir Tienda")

    useEffect(() => {
        onSnapshot(
            collection(db, 'Horario'),
            (snapshot) => {
                setApertura(snapshot.docs[0].data()["Apertura"])
            }
        )
    }, [])

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
                            type="checkbox"
                            value={apertura}
                            className="form-check-input"
                            id="flexSwitchCheckChecked"
                            onChange={(e) => {
                                e.preventDefault()
                                setApertura(!apertura)
                                updateDoc(doc(db, "Horario", "IxTQeeEAkbsIUXrP9m3W"), {
                                    Apertura: !apertura
                                })
                            }}
                        />
                        <label class="form-check-label" for="flexSwitchCheckChecked">{labelInterruptor}</label>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Horario;