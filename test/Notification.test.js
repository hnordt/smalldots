import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Notification from '../src/experimental/bulma/Notification';

describe('Component: Notification', () => {
	it('should render', () => {
		const wrapper = shallow(<Notification>Test</Notification>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply type', () => {
		const wrapper = shallow(<Notification type={"primary"}>Test</Notification>);

		expect(wrapper.find('div.is-primary').length).to.equal(1);
	});

	it('should render a button', () => {
		const wrapper = shallow(<Notification type={"primary"} onCloseClick={() => {}}>Test</Notification>);

		expect(wrapper.find('button.delete').length).to.equal(1);
	});
});