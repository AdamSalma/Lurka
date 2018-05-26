import React from 'react';
import { Provider } from 'react-redux';
import store from '~/redux/store';

// Views are the different "Pages" of the application
import Views from '~/views';

// Services are components that dont render anything.
// E.g. CSS4 theme handler, preloader etc.
import Services from '~/services'

const App = ({store: testStore}) => (
    <Provider store={testStore || store}>
        <main>
            <Views />
            <Services />
        </main>
    </Provider>
);

export default App;
