import React from 'react';
import styled from 'styled-components';
import ItemMenuAdmin from './ItemMenuAdmin';
import { faCartShopping, faCalendar, faCertificate } from '@fortawesome/free-solid-svg-icons';

const MenuAdmin = ({setOpcion}) => {
    return (
        <Menu>
            <div className='col-4'>
                <ItemMenuAdmin

                    titulo="Productos"
                    fondo="#44c39d"
                    fontColor="#004200"
                    icono={faCartShopping}
                    onClick={() => {console.log(1)}}
                    setOpcion={setOpcion}
                />
            </div>

            <ItemMenuAdmin
                titulo="Categorías"
                fondo="#efb810"
                fontColor="#420000"
                icono={faCertificate}
                setOpcion={setOpcion}
            />

            <ItemMenuAdmin
                titulo="Horario"
                fondo="#266ce2"
                fontColor="#000042"
                icono={faCalendar}
                setOpcion={setOpcion}
            />
        </Menu>
    );
}

const Menu = styled.div`
    display:flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

export default MenuAdmin;