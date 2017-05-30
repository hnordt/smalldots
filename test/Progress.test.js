import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Progress from '../src/experimental/bulma/Progress';

describe('Component: Progress', () => {
	it('should render', () => {
		const wrapper = shallow(<Progress>Test</Progress>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply type', () => {
		const wrapper = shallow(<Progress type={"primary"}>Test</Progress>);

		expect(wrapper.find('progress.is-primary').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Progress size={"medium"}>Test</Progress>);

		expect(wrapper.find('progress.is-medium').length).to.equal(1);
	});
});