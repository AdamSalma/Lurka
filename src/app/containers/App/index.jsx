import React from 'react';
import { Provider } from 'react-redux';

import './styles';
import store from '~/redux/store';

import Views from '~/views';
import Preloader from './Preloader';
import ThemeProvider from './ThemeProvider'
import Alerts from '../Alerts';
import Watcher from '../Watcher';

const { alertPosition } = window.appSettings

const App = () => (
    <main>
        <Views />
        <Preloader />
        <Watcher />
        <Alerts position={alertPosition} />
    </main>
);

const AppContainer = () => (
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);

export default AppContainer;
