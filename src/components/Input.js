import React, {useState} from 'react';

const Input = ({id, value}) => {
    const [valueInput, setValueInput] = useState(value);
    return (
        <>
            <input 
                className='form-control'
                id={id}
                value={valueInput}
                onChange={(e) => {setValueInput(e.target.value)}}
            />
        </>
    );
}
 
export default Input;