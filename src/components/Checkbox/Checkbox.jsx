import './Checkbox.styles'
import React from 'react';

export default ({onChange, isChecked}) => {
    const uid = "p"+Date.now()
    return (
        <div className="Checkbox">
                <input type="checkbox" id={uid}
                       onChange={onChange} 
                       checked={isChecked} 
                />
            <label htmlFor={uid}/>
        </div>
    )
}
