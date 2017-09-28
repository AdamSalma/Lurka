import React from 'react';
import { Provider } from 'react-redux';

import store from '~/redux/store';
import Views from '~/views';
import Preloader from './Preloader';
import Alerts from '../Alerts';
import Watcher from '../Watcher';

const {alertPosition} = window.Lurka;

const App = () => (
    <Provider store={store}>
        <main>
            <Views />
            <Preloader />
            <Watcher />
            <Alerts position={alertPosition} />
        </main>
    </Provider>
);

export default App;
