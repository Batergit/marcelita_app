// @ts-ignore
import React, {useContext} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faRotate } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
// @ts-ignore
import { contexto } from './contextos/contexto';
import Input from './Input';

// @ts-ignore
const ListadoProductos = () => {
    const Context = useContext(contexto);
    
    console.log(Context)
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h2>Lista de Productos</h2>
                    <hr />
                </div>
            </div>
            <div className='row mt-4'>
                <form className='col-12 mb-4'>
                    {Context.productos.map((producto, 
// @ts-ignore
                    index) => {
                        console.log(producto)
                        
                        return <div  key={producto.id} className='row d-flex justify-content-center mb-4'>

                                <div className='col-4 col-md-2 col-lg-2 d-flex align-items-start mb-md-0 mb-4'>
                                    <Imagen src={Context.productoimageList[producto.imagen]} />
                                </div>

                                <div className='col-12 col-md-8 col-lg-9'>
                                    
                                    <div className='row'>
                                        
                                        <div className='col-12 col-md-6 col-lg-4'>
                                            <Input 
                                                id = {`nombre${producto.id}`}
                                                value = {producto.nombre}
                                            />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-2'>
                                            <Input 
                                                id = {`marca${producto.id}`}
                                                value = {producto.marca}
                                            />
                                            
                                        </div>
                                        <div className='col-12 col-md-2 col-lg-2'>
                                            <Input 
                                                id = {`size${producto.id}`}
                                                value = {producto.size}
                                            />
                                        </div>
                                        <div className='col-12 col-md-4 col-lg-2'>
                                            <select
                                                id = {`categoria${producto.id}`}
                                                className='form-select'
                                                aria-label="Default select example"
                                                onChange={(e) => {document.getElementById(`categoria${producto.id}`).setAttribute("value", e.target.value)}}
                                            >
                                                {Context.categorias.map((element) => {
                                                    if(element.nombre === producto.categoria) {
                                                        return <option key={element.id} value={element.nombre} selected>{element.nombre}</option>
                                                    }
                                                    else {
                                                        return <option key={element.id} value={element.nombre}>{element.nombre}</option>
                                                    }
                                                })}

                                                {producto.categoria === "" ? <option value="sincat" selected>Sin Categoría</option> : ""}
                                            </select>
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-2'>
                                            <select
                                                id = {`stock${producto.id}`}
                                                className='form-select'
                                                aria-label="Default select example"
                                                onChange={(e) => {
                                                    document.getElementById(`stock${producto.id}`).setAttribute("value", e.target.value)
                                                    console.log(document.getElementById(`stock${producto.id}`))
                                                }}
                                            >
                                            {
                                                producto.stock === 1 ?
                                                    <>
                                                        <option value={1} selected>Con Stock</option>
                                                        <option value={0}>Sin Stock</option>
                                                    </>
                                                :
                                                    <>
                                                        <option value={1}>Con Stock</option>
                                                        <option value={0} selected>Sin Stock</option>
                                                    </>
                                            }
                                            </select>

                                        </div>
                                        <div className='col-12 col-md-12 d-grid mt-3'>
                                            <Input 
                                                id = {`descripcion${producto.id}`}
                                                value = {producto.descripcion}
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-column col-md-2 col-lg-1'>
                                    <button
                                        className='btn btn-danger mb-1'
                                        onClick={async(e) => {
                                            e.preventDefault()
                                            try {
                                                deleteObject(ref(storage, `productos/${producto.imagen}`)).then(async() => {
                                                    await deleteDoc(doc(db, "Productos", producto.id))
                                                })
                                            } catch(error) {
                                                console.log(error)
                                            }
                                        }}
                                    ><FontAwesomeIcon icon={faTrashCan}/></button>
                                    <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        updateDoc(doc(db, "Productos", producto.id), {
                                            // @ts-ignore
                                            nombre: document.getElementById(`nombre${producto.id}`).value,
                                            // @ts-ignore
                                            marca: document.getElementById(`marca${producto.id}`).value,
                                            // @ts-ignore
                                            size: document.getElementById(`size${producto.id}`).value,
                                            // @ts-ignore
                                            categoria: document.getElementById(`categoria${producto.id}`).value,
                                            // @ts-ignore
                                            stock: parseInt(document.getElementById(`stock${producto.id}`).value),
                                            // @ts-ignore
                                            descripcion: document.getElementById(`descripcion${producto.id}`).value,
                                        })
                                        console.log("PRODUCTO MODIFICADO");
                                    }}
                                    className='btn btn-success'
                                    ><FontAwesomeIcon icon={faRotate} /></button>
                                </div>

                            </div>
                    })}
                </form>
            </div>
        </>
    );
}

const Imagen = styled.img`
    width: 100%;
`

export default ListadoProductos;