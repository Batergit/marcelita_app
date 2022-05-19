import React from 'react';
import style from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItemMenuAdmin = (props) => {
    return (
        <ItemMenu 
            
            fondo={props.fondo}
            fontColor={props.fontColor} 
            onClick={() => props.setOpcion(props.titulo)}
            >
                <TituloItemMenu>{props.titulo}</TituloItemMenu>
                <IconoItemMenu>
                    <FontAwesomeIcon icon={props.icono} />
                </IconoItemMenu>
        </ItemMenu>
    );
}

const ItemMenu = style.div.attrs(props => ({
    type:"text",
    fondo: props.fondo,
    fontColor: props.fontColor
}))`
    height: 140px;
    border: 1px solid #545454;
    border-radius: 5px;
    display: flex;
    background-color: ${props => props.fondo};
    color: ${props => props.fontColor};
`
const TituloItemMenu = style.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
`
const IconoItemMenu = style.div`
    font-size: 40px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
`

export default ItemMenuAdmin;