import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { contexto } from './contextos/contexto';

const Login = (props) => {
    const [usuario, setUsuario] = useState("")
    const [pass, setPass] = useState("")
    const Context = useContext(contexto)
    

    return (
        <div id="contenedorLogin" className='container'>
            <div className='row'>
                <Contenido className='col-5 d-flex justify-content-center align-items-center'>
                    <Cuadro className='shadow bg-white p-4 cuadro'>
                        <h3 className='mt-4 text-center'>Iniciar Sesión</h3>
                        <hr />

                        <form>
                            <div className="mb-3">
                                <label htmlFor="rut" className="form-label">Ingrese Rut:</label>
                                <input
                                    type="text"
                                    value={usuario}
                                    className="form-control"
                                    id="rut"
                                    placeholder='12345678-9'
                                    onChange={(e) => {
                                        setUsuario(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pass1" className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={pass}
                                    className="form-control"
                                    id="pass1"
                                    placeholder='pepito123'
                                    onChange={(e) => {
                                        setPass(e.target.value)
                                    }}
                                />
                            </div>
                            <p id='msg1' className='text-danger d-none'>* Rut o contraseña incorrectos</p>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    let msg1 = document.getElementById("msg1");

                                    {Context.usuarios.map((user) => {
                                        if(user.RUT === usuario && user.Password === pass) {
                                            console.log(1)
                                            props.setLog(true)
                                        }
                                        else {
                                            msg1.classList.remove("d-none")
                                        }
                                    })}

                                }}
                            >Ingresar</button>
                        </form>

                    </Cuadro>
                </Contenido>
            </div>
        </div>
    );
}

const Cuadro = styled.div`
    width: 40%;
    border: 1px solid #eee;
    
`
    
    const Contenido = styled.div`
    height: 100vh;
    width: 100%;
    @media (min-width: 0px) {
        .cuadro {
            width: 100%;
            border: 1px solid #eee;
        }
    }
    @media (min-width: 600px) {
        .cuadro {
            width: 80%;
            border: 1px solid #eee;
        }
    }
    @media (min-width: 1000px) {
        .cuadro {
            width: 40%;
            border: 1px solid #eee;
        }
    }


    
`

export default Login;