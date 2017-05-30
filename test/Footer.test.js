import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Footer from '../src/experimental/bulma/Footer';

describe('Component: Footer', () => {
	it('should render', () => {
		const wrapper = shallow(<Footer>Test</Footer>);

		expect(wrapper.length).to.equal(1);
	});
});