import React from 'react';
import { Provider } from 'react-redux';

import store from '~/redux/store';
import settings from 'config/app.config'

import Views from '~/views';
import Preloader from './Preloader';
import Alerts from '../Alerts';
import Watcher from '../Watcher';

const App = () => (
    <Provider store={store}>
        <main>
            <Views />
            <Preloader />
            <Watcher />
            <Alerts position={settings.alertPosition} />
        </main>
    </Provider>
);

export default App;
