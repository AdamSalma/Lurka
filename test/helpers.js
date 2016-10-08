import {createRenderer} from 'react-addons-test-utils';

export const shallow = (component) => {
  const renderer = createRenderer();

  renderer.render(component);

  return {
    output: renderer.getRenderOutput(),
    renderer
  };
};
