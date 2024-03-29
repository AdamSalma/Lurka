import React from 'react';
import './styles';
import {CircleSpinner as Spinner} from '~/components'

const BoardSpinner = () =>
    <div className="BoardSpinner">
        <Spinner className="BoardSpinner__spinner"/>
    </div>

BoardSpinner.displayName = 'BoardSpinner';

export default BoardSpinner;
