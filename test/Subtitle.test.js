import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Subtitle from '../src/experimental/bulma/Subtitle';

describe('Component: Subtitle', () => {
	it('should render', () => {
		const wrapper = shallow(<Subtitle>Test</Subtitle>);

		expect(wrapper.length).to.equal(1);
	});


	it('should apply as default size', () => {
		const wrapper = shallow(<Subtitle>Test</Subtitle>);

		expect(wrapper.find('h1').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Subtitle size={2}>Test</Subtitle>);

		expect(wrapper.find('h2').length).to.equal(1);
	});
});