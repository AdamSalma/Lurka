import { renderIntoDocument, findRenderedComponentWithTag } from 'react-addons-test-utils';
import Background from '.';

describe('Background component', function(){
	before('render and locate element', function(){
		const renderedComponent = renderIntoDocument(
			<Background isVisible={false} />
		)

		const divComponent = findRenderedComponentWithTag(
			renderedComponent,
			'div'
		)

		this.divElement = divComponent.getDOMNode();
	});

	// it('<div> should not be visible', function(){
	// 	console.log(this.divElement.classList)
	// });

})