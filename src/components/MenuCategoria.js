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
    const [nombreInput, setNombreInput] = useState('')
    const [categorySelect, setCategorySelect] = useState('all')

    const [nombre, setNombre] = useState("")
    const [marca, setMarca] = useState("")
    const [size, setSize] = useState("")
    const [stock, setStock] = useState("")
    const [categoria, setCategoria] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [imagen, setImagen] = useState("")

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <h3>Productos:</h3>
                    <hr />
                </div>
            </div>

            <div className='row d-flex justify-content-between mb-4'>
                <div className='col-md-4 col-12 mb-md-0 mb-3'>
                    <form className='d-block'>
                        <label className='form-label' htmlFor="inputNombre">Buscar por Nombre:</label>
                        <input 
                            className='form-control'
                            placeholder='Papas sabor queso'
                            name='inputNombre'
                            id="inputNombre"
                            value={nombreInput}
                            onChange={(e) => {setNombreInput(e.target.value)}}
                        />
                    </form>
                </div>
                <div className='col-md-4 col-6'>
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
                <div className='col-md-4 col-6'>
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
                    Context.productos.map((producto) => {
                        var verificaNombre = false;
                        var verificaMarca = false;
                        var verificaCategoria = false;

                        if(producto.nombre.includes(nombreInput)) {verificaNombre = true}
                        if(producto.marca === marcaInput) {verificaMarca = true}
                        if(producto.categoria === categorySelect) {verificaCategoria = true}

                        if(nombreInput === "") {verificaNombre = true;}
                        if(marcaInput === "") {verificaMarca = true;}
                        if(categorySelect === "all") {verificaCategoria = true;}

                        if(verificaNombre === true && verificaMarca === true && verificaCategoria === true) {
                            return <ContenedorProducto 
                                    key={producto.id}
                                    className='col-lg-3 col-md-4 col-sm-6 col-12 text-center'
                                    onClick={() => {
                                        let modalC = document.querySelectorAll(".modal-container")[0]
                                        let modal = document.querySelectorAll(".pestana")[0]

                                        setNombre(producto.nombre)
                                        setMarca(producto.marca)
                                        setSize(producto.size)
                                        setStock(producto.stock)
                                        setCategoria(producto.categoria)
                                        setDescripcion(producto.descripcion)
                                        setImagen(producto.imagen)

                                        modalC.style.opacity = "1"
                                        modalC.style.visibility = "visible"
                                    }}
                                    
                            >
                                    <Miniatura className='' src={Context.productoimageList[producto.imagen]} />
                                    {parseInt(producto.stock) === 0 ? <NoStock>Sin Stock</NoStock> : <ConStock>Con Stock</ConStock>}
                                    <h6>{producto.nombre}</h6>
                                </ContenedorProducto>
                        }
                    })
                }
                
            </div>
            
            <ModalContainer className='modal-container'>
                <div className='pestana modal-close container px-4 py-3 '>
                    <div className='row'>
                        <div className='col-12'>
                            <p 
                                className='close'
                                onClick={() => {
                                    let modal = document.querySelectorAll(".pestana")[0]
                                    let modalC = document.querySelectorAll(".modal-container")[0]
                                    modalC.style.opacity = "0"
                                    modalC.style.visibility = "hidden"
                                }}
                            >X</p>
                        </div>
                    </div>
                    <div className='row modal-textos px-4 mb-4'>
                        <div className='col-md-12 text-center mb-4'>
                            <h2>{nombre}</h2>
                        </div>

                        <div className='col-md-6 col-12'>
                            <Imagen src={Context.productoimageList[imagen]} />
                        </div>

                        <div className='col-md-6 col-12 text-md-left '>
                            <Parrafo className='contenidoProducto'>
                                <b>Marca:</b> {marca} <br />
                                <b>Tamaño:</b> {size} <br />
                                <b>Stock:</b> {stock === 1 ? "SI" : "NO"} <br />
                                <b>Categoría:</b> {categoria} <br />
                                <b>Descripción:</b> <br />
                                {descripcion}
                            </Parrafo>
                        </div>
                    </div>
                </div>
            </ModalContainer>

        </>

    );
}

const Parrafo = styled.p`
    font-size: 17px;
`

const ModalContainer = styled.div`
    opacity: 0;
    visibility: hidden;
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 0px) {
        .pestana {
            width: 100%;
            background: #fff;
            overflow: hidden;
        }
        .contenidoProducto {
            text-align: left;
            line-height: 2;
        }
    }
    @media (min-width: 600px) {
        .pestana {
            width: 50%;
            background: #fff;
            overflow: hidden;
        }
        .contenidoProducto {
            text-align: left;
            line-height: 2;
        }
    }

    
    
    .close {
        text-align: right;
    }
`

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

const Imagen = styled.img`
    width: 90%;
`

export default MenuCategoria;