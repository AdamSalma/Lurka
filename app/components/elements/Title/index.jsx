import React from 'react';
import './style'
import mapPropsToClasses from './classes';

const Title = (props) => {
    const { size, font, weight, align, ...restProps} = props

    restProps.className = mapPropsToClasses(props)

    switch (size) {
        case 1: return <h1 {...restProps}/>
        case 2: return <h2 {...restProps}/>
        case 3: return <h3 {...restProps}/>
        case 4: return <h4 {...restProps}/>
        case 5: return <h5 {...restProps}/>
        case 6: return <h6 {...restProps}/>
        default:
            throw new Error(`Title size ${size} doesn't exist`)
    }
};

Title.defaultProps = {
    font: "primary",
    weight: "normal",
    align: "center"
}

Title.displayName = 'Title';

export default Title;
