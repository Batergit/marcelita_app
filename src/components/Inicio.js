import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import banner from './../img/banner.jpg';
import MenuCategoria from './MenuCategoria';
import QuienesSomos from './QuienesSomos';
import HorarioUbicacion from './HorarioUbicacion';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Inicio = () => {
    const [itemMenu, CambiarItemMenu] = useState(1);
    const[apertura, setApertura] = useState(true)

    useEffect(() => {
        onSnapshot(
            collection(db, 'Apertura'),
            (snapshot) => {
                setApertura(snapshot.docs[0].data()["estado"])
            }
        )
    }, [])

    return (
        <ContenedorApp>
            <Header>
                <BarraNavegacion>
                    <button onClick={() => console.log("Menu")}>Menu</button>
                    <button onClick={() => CambiarItemMenu(1)}>Inicio</button>
                    <button onClick={() => CambiarItemMenu(2)}>Quienes Somos</button>
                    <button onClick={() => CambiarItemMenu(3)}>Horarios y Ubicación</button>
                </BarraNavegacion>

                <Portada>
                    <div>
                        {apertura === true ? 
                            <p>[La tienda está Abierta]</p>
                        :
                            <p>[La tienda está cerrada]</p>
                        }
                        <h1 >Bodega Marcelita</h1>
                        <p>
                            Comercializadora de Condimentos
                            <br />
                            rutos Secos y Golosinas
                        </p>
                    </div>
                </Portada>
            </Header>
            
            <div className="container shadow p-4">
                {itemMenu === 1 ?
                    <MenuCategoria />
                :itemMenu === 2 ?
                    <QuienesSomos />
                :
                    <HorarioUbicacion />
                }
            </div>  
            
        </ContenedorApp>
    );
}

const ContenedorApp = styled.div`
    background: white;
`

const Header = styled.header`
    margin-bottom: 25px;

    * {
        font-family: 'Roboto Slab', Roboto, serif;
        color: white;
    }
`

const BarraNavegacion = styled.nav`
    position: fixed;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-evenly;

    button {
        background: none;
        border: none;
        padding: 20px;
        font-size: 20px;
        width: 200px;
    }
`

const Portada = styled.div`
    background: url(${banner});
    background-position: top;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    text-align: center;

    div {
        background: rgb(152,106,33);
        background: linear-gradient(180deg, rgba(70, 50, 14, 0.6) 0%, rgba(0, 0, 0, 0.548) 100%);
        padding: 120px 0;
    }

    h1 {
        margin-top: 2%;
        margin-bottom: 20px;
        font-size: 60px;
    }

    p {
        font-size: 20px;
    }
`

export default Inicio;