import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Box from '../src/experimental/bulma/Box';

describe('Component: Box', () => {
	it('should render', () => {
		const wrapper = shallow(<Box>Hello!</Box>);

		expect(wrapper.length).to.equal(1);
	});

	it('should render children', () => {
		const wrapper = shallow(<Box><p>Hello!</p></Box>)

		expect(wrapper.find('p').props().children).to.equal('Hello!');
	});
});