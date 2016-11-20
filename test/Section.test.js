import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Section from '../src/experimental/bulma/Section';

describe('Component: Section', () => {
	it('should render', () => {
		const wrapper = shallow(<Section>Test</Section>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Section size={"medium"}>Test</Section>);

		expect(wrapper.find('section.is-medium').length).to.equal(1);
	});
});