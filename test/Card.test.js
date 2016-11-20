import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Card from '../src/experimental/bulma/Card';

describe('Component: Card', () => {
	it('should render', () => {
		const wrapper = shallow(<Card>Hello World!</Card>)
		expect(wrapper.length).to.equal(1);
	});

	it('should render 1 `div.card-image` 1 `img` inside with src equal to `image.png`', () => {
		const wrapper = shallow(
			<Card image={<img src="image.png" alt="Image"/>}> Hello World! </Card>
		);

		expect(wrapper.find('div.card-image').find('img').prop('src')).to.equal('image.png');
	});

	it('should apply fullwidth', () => {
		const wrapper = shallow(<Card fullWidth={true}>Hello World!</Card>)

		expect(wrapper.find('div.is-fullwidth').length).to.equal(1);
	});

	it('should render 1 `header.card-header` with 1 `p.card-header-title` containing "Title" inside', () => {
		const wrapper = shallow(<Card title={'Title'}>Hello World!</Card>)
		
		expect(wrapper.find('header.card-header').find('p.card-header-title').props().children).to.equal('Title');
	});

	it('should render 1 `header.card-header` with 1 `p.card-header-icon` containing a `i.fa-car`', () => {
		const wrapper = shallow(<Card icon={'car'}>Hello World!</Card>)
		
		expect(wrapper.find('header.card-header').find('a.card-header-icon').find('i.fa-car').length).to.equal(1);
	});

	it('should render `div.card-content` containing the children', () => {
		const wrapper = shallow(<Card>Hello World!</Card>)
		
		expect(wrapper.find('.card-content').prop('children')).to.equal('Hello World!');
	});

	it('should render `footer.card-footer containing the options', () => {
		const wrapper = shallow(
			<Card
				options={[
					{label: "Option1", onClick: () => {}},
					{label: "Option2", onClick: () => {}}
				]}
			>
				Hello World!
			</Card>
		);

		expect(wrapper.find('footer.card-footer').find('a.card-footer-item').at(0).prop("children")).to.equal("Option1");
		expect(wrapper.find('footer.card-footer').find('a.card-footer-item').at(1).prop("children")).to.equal("Option2");
	});
});