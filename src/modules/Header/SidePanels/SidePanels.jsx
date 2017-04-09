import './SidePanels.styles'
import React, { PropTypes } from 'react';

const SidePanels = ({ className }) => {
    return (
        <div className="SidePanels"></div>
    );
};

SidePanels.displayName = 'SidePanels';

SidePanels.propTypes = {
    className: PropTypes.string,
};

export default SidePanels;
