import React from 'react';

export default ({ isSpinning }) => (
    <div className={"spinner " + isSpinning ? "active" : ""}></div>
)
