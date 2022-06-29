import React, {useState, useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

const InputHora = ({horas, minutos, dia, opcion}) => {
    const [hora, cambiarHora] = useState("")

    useEffect(() => {
        if(horas < 10) {
            if(minutos < 10) {
                cambiarHora(`0${horas}:0${minutos}`)
            }
            else {
                cambiarHora(`0${horas}:${minutos}`)
            }
        }
        else {
            if(minutos < 10) {
                cambiarHora(`${horas}:0${minutos}`)
            }
            else {
                cambiarHora(`${horas}:${minutos}`)
            }
        }
    }, [])


    return (
        <>
            <input 
                type="time"
                value={hora}
                onChange={(e) => {
                    e.preventDefault()
                    cambiarHora(e.target.value)
                    const horaMinuto = e.target.value.split(":")

                    if(opcion === "Inicio") {
                        updateDoc(doc(db, "Horario", dia), {
                            horaPartida: parseInt(horaMinuto[0]),
                            minutoPartida: parseInt(horaMinuto[1])
                        })
                        
                    }
                    else {
                        updateDoc(doc(db, "Horario", dia), {
                            horaTermino: parseInt(horaMinuto[0]),
                            minutoTermino: parseInt(horaMinuto[1])
                        })
                    }
                }}
            />
        </>
    );
}
 
export default InputHora;