import React from 'react';

export default ({ isVisible, onThreadClose }) => (
    <div
        className={"background " + isVisible ? "active" : ""}
        onClick={onThreadClose}>    
    </div>
)
