import React, {useContext} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faRotate } from '@fortawesome/free-solid-svg-icons';
import {db, storage} from './../firebase/firebaseConfig';
import {ref, deleteObject} from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { contexto } from './contextos/contexto';
import Input from './Input';

const ListadoCategorias = () => {
    const Context = useContext(contexto);
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h2>Lista de Categorias</h2>
                    <hr className='mb-4' />
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    {Context.categorias.map((categoria, index) => {
                        return (
                            <div key={categoria.id} className='row mb-4 d-flex justify-content-center'>
                                <div className='col-5 col-lg-2 mt-4 d-flex justify-content-center'>
                                    <Imagen src={Context.categoriaimageList[categoria.imagen]} />
                                </div>

                                <div className='col-12 col-lg-8 d-flex align-items-center mt-4 mb-2'>
                                    <Input 
                                        id = {`nombre${categoria.id}`}
                                        value = {categoria.nombre}
                                    />
                                </div>

                                <div className='d-flex flex-column justify-content-center col-12 col-lg-2'>
                                    <button 
                                        className='btn btn-danger mb-1'
                                        onClick={async(e) => {
                                            e.preventDefault()
                                            try {
                                                Context.productos.map((producto) => {
                                                    // @ts-ignore
                                                    if(producto.categoria === document.getElementById(`nombre${categoria.id}`).value) {
                                                        updateDoc(doc(db, "Productos", producto.id), {
                                                            categoria: "",
                                                        })
                                                    }
                                                })

                                                await deleteDoc(doc(db, "Categorias", categoria.id))
                                                deleteObject(ref(storage, `imagenes/${categoria.imagen}`)).then(() => {
                                                // @ts-ignore
                                                }).catch((error) => {});

                                                console.log(categoria)
                                            } catch(error) {
                                                console.log(error)
                                            }
                                        }}
                                    ><FontAwesomeIcon icon={faTrashCan} /></button>
                                    
                                    <button 
                                        className='btn btn-success'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateDoc(doc(db, "Categorias", categoria.id), {
                                                // @ts-ignore
                                                nombre: document.getElementById(`nombre${categoria.id}`).value,
                                            })

                                            {Context.productos.map((producto) => {
                                                if(producto.categoria === categoria.nombre) {
                                                    updateDoc(doc(db, "Productos", producto.id), {
                                                        // @ts-ignore
                                                        categoria: document.getElementById(`nombre${categoria.id}`).value,
                                                    })
                                                }
                                            })}

                                            console.log("CATEGORÍA MODIFICADA");
                                        }}
                                    ><FontAwesomeIcon icon={faRotate} /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

const Imagen = styled.img`
    width: 80%;
`
 
export default ListadoCategorias;