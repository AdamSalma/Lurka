import React from 'react';
import './style'

const Title = ({ size=1, ...restProps }) => {
    restProps.className = mapTitleStyleClasses(restProps)

    switch (size) {
        case 1: return <h1 {...restProps}/>
        case 2: return <h2 {...restProps}/>
        case 3: return <h3 {...restProps}/>
        case 4: return <h4 {...restProps}/>
        case 5: return <h5 {...restProps}/>
        case 6: return <h6 {...restProps}/>
    }
};

Title.defaultProps = {
    font: "primary",
    weight: "normal",
    align: "center"
}

Title.displayName = 'Title';

export default Title;


const createPropMapper = (ComponentClassName) => (props) => {
    const classNames = [ComponentClassName, props.className];

    Object.keys(props).forEach( prop => {
        if (prop in styleClasses) {
            // e.g. if "weight" in props, get weight[prop value]
            classNames.push(styleClasses[prop][props[prop]])

            delete props[prop]
        }
    });

    return classNames.join(" ");
}

const mapTitleStyleClasses = createPropMapper("Title")

const styleClasses = {
    font: {
        primary: "font-primary",
        secondary: "font-secondary"
    },
    weight: {
        light: "weight-light",
        normal: "weight-normal",
        bold: "weight-bold"
    },
    align: {
        center: "align-center",
        left: "align-left",
        right: "align-right"
    }
}
