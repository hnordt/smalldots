import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../src/experimental/bulma/Container';

describe('Component: Container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container>Test</Container>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply fluid', () => {
		const wrapper = shallow(<Container fluid={true}>Test</Container>);

		expect(wrapper.find('div.is-fluid').length).to.equal(1);
	});
});