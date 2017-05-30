import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Content from '../src/experimental/bulma/Content';

describe('Component: Content', () => {
	it('should render', () => {
		const wrapper = shallow(<Content>Test</Content>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Content size={"medium"}>Test</Content>);

		expect(wrapper.find('div.is-medium').length).to.equal(1);
	});
});