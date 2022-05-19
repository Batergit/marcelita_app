import React, {useState, useContext} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseConfig';
import { listAll, ref } from 'firebase/storage';
import styled from 'styled-components';
import { contexto } from './contextos/contexto';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

const MenuCategoria = () => {
    const Context = useContext(contexto);
    const [marcaInput, setMarcaInput] = useState('')
    const [categorySelect, setCategorySelect] = useState('all')
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h3>Productos:</h3>
                    <hr />
                </div>
            </div>

            <div className='row d-flex justify-content-between mb-4'>
                <div className='col-3'>
                    <form className='d-block'>
                        <label className='form-label' htmlFor="inputMarca">Buscar por marca:</label>
                        <input 
                            className='form-control'
                            placeholder='Lays'
                            name='inputMarca'
                            id="inputMarca"
                            value={marcaInput}
                            onChange={(e) => {setMarcaInput(e.target.value)}}
                        />
                    </form>
                </div>
                <div className='col-3'>
                    <form className='d-block'>
                        <label
                            className='form-label'
                            htmlFor='selectCategory'
                        >Buscar por Categoría:</label>
                        <div className='row'>
                            <div className='col-12'>
                                <select 
                                    className="form-select"
                                    aria-label="Default select example"
                                    name='selectCategory'
                                    id='selectCategory'
                                    value={categorySelect}
                                    onChange={(e) => {
                                        setCategorySelect(e.target.value)
                                        console.log(e.target.value)
                                    }}
                                >
                                    <option value="all" >Todas</option>
                                    {Context.categorias.map((categoria) => {
                                        return <option key={categoria.id} value={categoria.nombre} >{categoria.nombre}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <hr />

            <div className='row'>
                {
                    marcaInput === "" ?
                        categorySelect === "all" ?
                            Context.productos.map((producto) => {
                                if(producto.categoria != "") {
                                    return <ContenedorProducto key={producto.id} className='col-lg-3 col-md-4 col-sm-6 col-12 text-center'>
                                        <Miniatura className='' src={Context.productoimageList[producto.imagen]} />
                                        {parseInt(producto.stock) === 0 ? <NoStock>Sin Stock</NoStock> : <ConStock>Con Stock</ConStock>}
                                        <h6>{producto.nombre}</h6>
                                    </ContenedorProducto>
                                }
                            })
                            :
                            Context.productos.map((producto) => {
                                if(producto.categoria == categorySelect && producto.categoria != "") {
                                    return <ContenedorProducto key={producto.id} className='col-lg-3 col-md-4 col-sm-6 col-12 text-center'>
                                        <Miniatura className='' src={Context.productoimageList[producto.imagen]} />
                                        {parseInt(producto.stock) === 0 ? <NoStock>Sin Stock</NoStock> : <ConStock>Con Stock</ConStock>}
                                        <h6>{producto.nombre}</h6>
                                    </ContenedorProducto>
                                }
                            })
                    :
                        categorySelect === "all" ?
                            Context.productos.map((producto) => {
                                if(producto.marca.includes(marcaInput) && producto.categoria != "") {
                                    return <ContenedorProducto key={producto.id} className='col-lg-3 col-md-4 col-sm-6 col-12 text-center'>
                                        <Miniatura className='' src={Context.productoimageList[producto.imagen]} />
                                        {parseInt(producto.stock) === 0 ? <NoStock>Sin Stock</NoStock> : <ConStock>Con Stock</ConStock>}
                                        <h6>{producto.nombre}</h6>
                                    </ContenedorProducto>
                                }
                            })
                        :
                        Context.productos.map((producto) => {
                            if(producto.marca.includes(marcaInput) && producto.categoria == categorySelect && producto.categoria != "") {
                                return <ContenedorProducto key={producto.id} className='col-lg-3 col-md-4 col-sm-6 col-12 text-center'>
                                    <Miniatura className='' src={Context.productoimageList[producto.imagen]} />
                                    {parseInt(producto.stock) === 0 ? <NoStock>Sin Stock</NoStock> : <ConStock>Con Stock</ConStock>}
                                    <h6>{producto.nombre}</h6>
                                </ContenedorProducto>
                            }
                        })
                }
            </div>
        </>
    );
}

const ContenedorProducto = styled.div`
    padding: 20px;
`

const Miniatura = styled.img`
    height: 150px;
    margin-bottom: 15px;
`

const NoStock = styled.p`
    margin: 0;
    padding: 0;
    background: #cc3333;
    color: white;
    font-weight: bold;
    width: 50%;
    margin: 0px auto;
`

const ConStock = styled.p`
    margin: 0;
    padding: 0;
    background: #33cc33;
    color: white;
    font-weight: bold;
    width: 50%;
    margin: 0px auto;
`
export default MenuCategoria;