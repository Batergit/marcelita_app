import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ListadoCategorias from './ListadoCategorias';
import AgregarCategorias from './AgregarCategorias';
import AgregarProducto from './AgregarProducto';
import ListadoProductos from './ListadoProductos';
import Horario from './Horario';
import ItemMenuAdmin from './ItemMenuAdmin';
import { faCartShopping, faCalendar, faCertificate, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { collection, onSnapshot } from "firebase/firestore";
import {db, storage} from './../firebase/firebaseConfig';
import {listAll, ref} from 'firebase/storage';
import SwitchEstadoApertura from './SwitchEstadoApertura';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortalAdministrador = (props) => {
    const [categorias, cambiarCategorias] = useState([]);
    const [productos, cambiarProductos] = useState([]);
    const [opcion, setOpcion] = useState("Productos")
    const [imageList, setImageList] = useState(new Map())

    return (
        <div className='container mt-4 shadow bg-body rounded'>
            <div className='row'>
                <div className='col-12 d-flex justify-content-between'>
                    <h1>Portal de Administrador</h1>
                    <button 
                        className='btn btn-danger'
                        type='button'
                        onClick={(e) => {
                            e.preventDefault()
                            console.log(props)
                            props.setLog(false)
                        }}
                        
                    ><FontAwesomeIcon icon={faRightFromBracket} /></button>
                </div>
                <hr />
            </div>
            <div className='row'>
                <div className='col-md-4 col-12 mb-3'>
                    <ItemMenuAdmin
                        titulo="Productos"
                        fondo="#44c39d"
                        fontColor="#004200"
                        icono={faCartShopping}
                        onClick={() => {console.log(1)}}
                        setOpcion={setOpcion}
                    />
                </div>

                <div className='col-md-4 col-12 mb-3'>
                    <ItemMenuAdmin
                        titulo="Categorías"
                        fondo="#efb810"
                        fontColor="#420000"
                        icono={faCertificate}
                        setOpcion={setOpcion}
                    />
                </div>

                <div className='col-md-4 col-12 mb-3'>
                    <ItemMenuAdmin
                        titulo="Horario"
                        fondo="#266ce2"
                        fontColor="#000042"
                        icono={faCalendar}
                        setOpcion={setOpcion}
                    />
                </div>
            </div>

            {
            opcion === "Productos" ?
                <>
                    <ContenedorTareas>
                        <AgregarProducto/>
                    </ContenedorTareas>

                    <ContenedorTareas>
                        <ListadoProductos/>
                    </ContenedorTareas>
                </>
            :opcion === "Categorías" ?
                <>
                    <ContenedorTareas>
                        <AgregarCategorias/>
                    </ContenedorTareas>

                    <ContenedorTareas>
                        <ListadoCategorias/>
                    </ContenedorTareas>
                </>
            :
                <>
                    <ContenedorTareas>
                        <SwitchEstadoApertura />
                    </ContenedorTareas>

                    <ContenedorTareas>
                        <Horario />
                    </ContenedorTareas>
                </>
            }
                
        </div>
    );
}

const ContenedorTareas = styled.div`
    border: 1px solid #c3c3c3;
    margin: 20px 0 0 0;
    padding: 15px;
`

export default PortalAdministrador;