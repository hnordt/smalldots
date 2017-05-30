import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Icon from '../src/experimental/bulma/Icon';

describe('Component: Icon', () => {
	it('should render', () => {
		const wrapper = shallow(<Icon name="car"/>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Icon name="car" size={"medium"}>Test</Icon>);

		expect(wrapper.find('span.is-medium').length).to.equal(1);
	});

	it('should apply icon', () => {
		const wrapper = shallow(<Icon name="car">Test</Icon>);

		expect(wrapper.find('i.fa-car').length).to.equal(1);
	});
});