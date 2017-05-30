import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Columns from '../src/experimental/bulma/Columns';

describe('Component: Columns', () => {
	it('should render', () => {
		const wrapper = shallow(<Columns>Test</Columns>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply multiline', () => {
		const wrapper = shallow(<Columns multiline={true}>Test</Columns>);

		expect(wrapper.find('div.is-multiline').length).to.equal(1);
	});

	it('should apply gapless', () => {
		const wrapper = shallow(<Columns gapless={true}>Test</Columns>);

		expect(wrapper.find('div.is-gapless').length).to.equal(1);
	});
});