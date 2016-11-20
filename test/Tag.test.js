import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tag from '../src/experimental/bulma/Tag';

describe('Component: Tag', () => {
	it('should render', () => {
		const wrapper = shallow(<Tag>Test</Tag>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply type', () => {
		const wrapper = shallow(<Tag type={"primary"}>Test</Tag>);

		expect(wrapper.find('div.is-primary').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Tag size={"medium"}>Test</Tag>);

		expect(wrapper.find('div.is-medium').length).to.equal(1);
	});

	it('should render a `button.delete`', () => {
		const wrapper = shallow(<Tag onRemoveClick={() => {}}>Test</Tag>);

		expect(wrapper.find('button.delete').length).to.equal(1);
	});
});