import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Hero from '../src/experimental/bulma/Hero';

describe('Component: Hero', () => {
	it('should render', () => {
		const wrapper = shallow(<Hero>Test</Hero>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply type', () => {
		const wrapper = shallow(<Hero type={"primary"}>Test</Hero>);

		expect(wrapper.find('section.is-primary').length).to.equal(1);
	});

	it('should apply size', () => {
		const wrapper = shallow(<Hero size={"medium"}>Test</Hero>);

		expect(wrapper.find('section.is-medium').length).to.equal(1);
	});

	it('should apply bold', () => {
		const wrapper = shallow(<Hero bold={true}>Test</Hero>);

		expect(wrapper.find('section.is-bold').length).to.equal(1);
	});

	it('should have `div.hero-head` containing a `p`', () => {
		const wrapper = shallow(<Hero head={<p>Head</p>}>Test</Hero>);

		expect(wrapper.find('div.hero-head').contains(<p>Head</p>)).to.equal(true);
	});

	it('should hade `div.hero-body` containing the children', () => {
		const wrapper = shallow(<Hero>Test</Hero>);

		expect(wrapper.find('div.hero-body').contains('Test')).to.equal(true);
	});	

	it('should have `div.hero-foot` containing a `p`', () => {
		const wrapper = shallow(<Hero foot={<p>Footer</p>}>Test</Hero>);

		expect(wrapper.find('div.hero-foot').contains(<p>Footer</p>)).to.equal(true);
	});
});