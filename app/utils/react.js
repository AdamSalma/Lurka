import React from 'react'
import { isString } from './types'

/**
// Sub prop
 * Bind methods to a class. Use in class init: `constructor(){ }`
 * @param  {Object}  that    - Class scope reference; 'this'
 *
 * @param  {...Func} members - Methods
 * @return {undefined}
 */
export const bindMembersToClass = (that, ...members) => {
    members.forEach(item => {
        that[item] = that[item].bind(that)
    })
}

/**
 * Bind external functions to a class instance to be used as methods.
 * Use in class init: `constructor(){ }`
 *
 * @param  {Object}  that    - Class scope reference; 'this'
 * @param  {...Func} members - Functions
 * @return {undefined}
 */
export const bindFunctionsAsInstanceMethods = (that, ...funcs) => {
    funcs.forEach(func => {
        that[func.name] = func.bind(that);
    });
}

/**
 * Shorthand for using dangerouslySetInnerHTML as an element prop:
 *   <div {...setHTML(title)}> </div>
 *
 * @param  {String} html - Raw html to insert
 * @return {Object}
 */
export const setHTML = (html) => {
    return {
        dangerouslySetInnerHTML: {
            __html: html
        }
    }
}


export const cloneChildren = (children, props) =>
    React.Children.map(children,
        child => React.cloneElement(child, props)
    )


export const getDisplayName = (Component) => {
  return Component.displayName || Component.name || 'Component';
}



/**
 * `createPropToClassMapper`
 *
 * Creates a props -> className mapper that is used to convert custom craft-ui
 * props into a className string.
 *
 ** Example:
 *
 *    const mapProps = createPropToClassMapper('Button', {
 *      weight: {
 *        light: "Button--light"
 *      }
 *    })
 *
 * Then, inside your component you can use `mapProps`
 *
 *    const Button = (props) => {
 *      props.className = mapProps(props);
 *      return <button {...props}>
 *    }
 *
 * So if the content of `props` in the example above is:
 *
 *    {
 *      weight: "light",
 *      className: "ParentButtonClass"
 *    }
 *
 * Then the value of `className` in the spread props is now:
 *
 *    "Button ParentButtonClass Button--light"
 *
 * -----------------------------------------------------------------------------
 *
 * @param  {String} baseClassName - The base class name. Usually the name of
 *                                  your component if you follow BEM class
 *                                  structuring
 *
 * @param  {Object} propClassMap  - A nested object containing the props and
 *                                  propValues used to determine which className
 *                                  to use
 *
 * @return {Function}             - This uses the above in addition to a
 *                                  `props` argument to generate the classes
 */
export const createPropToClassMapper = (baseClassName, propClassMap) => (props) => {
    const classes = [baseClassName, props.className]

    Object.keys(props).forEach(prop => {
        if (propClassMap[prop]) {
            // Is a style prop. Use it to access the corresponding className
            classes.push(propClassMap[prop][props[prop]]);
        }
    })

    // Join up the array of classes into a string
    return classes.join(" ");
}
