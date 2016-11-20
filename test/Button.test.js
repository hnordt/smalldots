import React from 'react';
import { expect } from 'chai';
import { shallow} from 'enzyme';

import Button from '../src/experimental/bulma/Button';

describe('Component: Button', () => {
	it('should render', () => {
		const wrapper = shallow(<Button>Click me!</Button>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply type', () => {
		const wrapper = shallow(<Button type="dark">Click me!</Button>);

		expect(wrapper.find('button.is-dark').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Button size="large">Click me!</Button>);

		expect(wrapper.find('button.is-large').length).to.equal(1);
	});

	it('should apply outlined', () => {
		const wrapper = shallow(<Button outlined={true}>Click me!</Button>);

		expect(wrapper.find('button.is-outlined').length).to.equal(1);
	});

	it('should apply inverted', () => {
		const wrapper = shallow(<Button inverted={true}>Click me!</Button>);

		expect(wrapper.find('button.is-inverted').length).to.equal(1);
	});

	it('should apply state', () => {
		const wrapper = shallow(<Button state={'active'}>Click me!</Button>);

		expect(wrapper.find('button.is-active').length).to.equal(1);
	});
});