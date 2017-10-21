import React from 'react';
import { Provider } from 'react-redux';

import store from '~/redux/store';
import Views from '~/views';
import Services from '~/services'

const App = () => (
    <Provider store={store}>
        <main>
            <Views />
            <Services />
        </main>
    </Provider>
);

export default App;
