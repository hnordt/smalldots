import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Column from '../src/experimental/bulma/Column';

describe('Component: Column', () => {
	it('should render', () => {
		const wrapper = shallow(<Column>Test</Column>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply narrow', () => {
		const wrapper = shallow(<Column narrow={true}>Test</Column>);

		expect(wrapper.find('div.is-narrow').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Column size={1}>Test</Column>);

		expect(wrapper.find('div.is-1').length).to.equal(1);
	});

	it('should apply offset', () => {
		const wrapper = shallow(<Column offset={1}>Test</Column>);

		expect(wrapper.find('div.is-offset-1').length).to.equal(1);
	});
});