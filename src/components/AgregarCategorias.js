import React, {useState, useContext} from 'react';
import { db, storage } from '../firebase/firebaseConfig';
import {ref, uploadBytes} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AgregarCategorias = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const [nombreCategoria, setNombreCategoria] = useState('')
    const uploadImagen = () => {
        
    }
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h2>Agregar Categorías</h2>
                    <hr />
                </div>
            </div>

            <form className='row'>

                <div className='col-12'>
                    <label className='form-label d-block'>Nombre Categoría
                        <input 
                            className='form-control mt-2 d-inline'
                            type="text" 
                            placeholder='Frutas' 
                            value={nombreCategoria} 
                            onChange={(e) => setNombreCategoria(e.target.value)}
                        />
                    </label>
                </div>

                <div className='col-12'>
                    <label className='form-label d-block'>Subir Imagen
                        <input 
                            className='form-control mt-2'
                            type="file" 
                            onChange={(e) => setImageUpload(e.target.files[0])}
                        />
                    </label>
                </div>
                
                <div className='col-12 d-grid'>
                    <button
                        className='btn btn-primary'
                        onClick={(e) => {
                            e.preventDefault()
                            if(imageUpload == null) return;
                                const nombreImagen = nombreCategoria.toLowerCase().replace(" ", "")
                                const imageRef = ref(storage, `imagenes/${nombreImagen}`)

                                uploadBytes(imageRef, imageUpload).then(async () => {
                                    await addDoc(collection(db, "Categorias"), {
                                        nombre: nombreCategoria,
                                        imagen: nombreImagen
                                    })
                                    alert("Categoría Subida!!")
                                })
                            }}
                    >Subir Categoría</button>
                </div>

                
            </form>
        </>
    );
}

export default AgregarCategorias;