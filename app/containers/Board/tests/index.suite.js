// import integrationTests from '..';
import React from 'react';
import Board from '..';
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

export default createSuite("Board", () => {
  it("mounts", () => {
    shallow(<Board/>);
  });

  // integrationTests();

});
