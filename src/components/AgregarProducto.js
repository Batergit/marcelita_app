// @ts-nocheck
import React, {useState, useContext} from 'react';
import { db, storage } from '../firebase/firebaseConfig';
import {ref, uploadBytes} from 'firebase/storage';
import { collection, addDoc, onSnapshot, snapshot } from 'firebase/firestore';
import { contexto } from './contextos/contexto';

const AgregarProducto = () => {
    const Context = useContext(contexto);
    const [imageUpload, setImageUpload] = useState(null)
    const [nombreProducto, setNombreProducto] = useState('')
    const [marcaProducto, setMarcaProducto] = useState('')
    const [sizeProducto, setSizeProducto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categoriaProducto, setCategoriaProducto] = useState('')

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h2>Agregar Producto</h2>
                    <hr />
                </div>
            </div>

            <form className='row'>
                <div className='col-md-3 d-grid col-12'>
                    <label className='form-label'>Nombre Producto
                        <input 
                            className='form-control mt-2 d-inline'
                            type="text" 
                            placeholder='Papas Fritas' 
                            value={nombreProducto} 
                            onChange={(e) => setNombreProducto(e.target.value)}
                        />
                    </label>
                </div>

                <div className='col-md-3 d-grid col-12'>
                    <label className='form-label'>Marca Producto
                        <input 
                            className='form-control mt-2 d-inline'
                            type="text" 
                            placeholder='Evercrisp' 
                            value={marcaProducto} 
                            onChange={(e) => setMarcaProducto(e.target.value)}
                        />
                    </label>
                </div>

                <div className='col-md-3 d-grid col-12'>
                    <label className='form-label'>Tamaño Producto
                        <input 
                            className='form-control mt-2 d-inline'
                            type="text" 
                            placeholder='350 gr' 
                            value={sizeProducto} 
                            onChange={(e) => setSizeProducto(e.target.value)}
                        />
                    </label>
                </div>

                <div className='col-md-3 d-grid col-12'>
                    <label className='form-label d-block'>Categoría
                        <select
                            className='form-select mt-2'
                            id="selectCategoria"
                            aria-label="Default select example"
                            onChange={(e) => setCategoriaProducto(e.target.value)}
                        >
                            {Context.categorias.map((element) => {
                                return <option key={element.id} value={element.nombre}>{element.nombre}</option>
                            })}
                        </select>
                    </label>
                </div>

                <div className='col-md-6 d-grid col-12'>
                    <label className='form-label d-block'>Descripción
                        <textarea 
                            className='form-control mt-2'
                            type="text" 
                            placeholder='Descripción' 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                        ></textarea>
                    </label>
                </div>
                
                <div className='col-md-6 d-grid col-12'>
                    <label className='form-label d-block'>Subir Imagen
                        <input 
                            className='form-control mt-2'
                            type="file" 
                            onChange={(e) => setImageUpload(e.target.files[0])}
                        />
                    </label>
                </div>
                    
                <div className="d-grid col-12 mx-auto mt-2">
                    <button
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault()
                            
                            if(imageUpload == null) return;
                            const nombreImagen = nombreProducto.replaceAll(' ', '').toLowerCase()
                            const imageRef = ref(storage, `productos/${nombreImagen}`)

                            uploadBytes(imageRef, imageUpload).then(async() => {
                                await addDoc(collection(db, "Productos"), {
                                    nombre: nombreProducto,
                                    imagen: nombreImagen,
                                    marca: marcaProducto,
                                    size: sizeProducto,
                                    descripcion: descripcion,
                                    categoria: document.getElementById("selectCategoria").value,
                                    stock: 1
                                })
                                alert("Producto Subido!!")
                            })

                        }}
                    >Subir Producto</button>
                </div>
            </form>
        </>
    );
}



export default AgregarProducto;