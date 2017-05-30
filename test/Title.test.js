import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Title from '../src/experimental/bulma/Title';

describe('Component: Title', () => {
	it('should render', () => {
		const wrapper = shallow(<Title>Test</Title>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Title size={2}>Test</Title>);

		expect(wrapper.find('h2').length).to.equal(1);
	});

	it('should render `h1` as default size', () => {
		const wrapper = shallow(<Title>Test</Title>);

		expect(wrapper.find('h1').length).to.equal(1);
	});
});