import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Table from '../src/experimental/bulma/Table';

describe('Component: Table', () => {
	it('should render', () => {
		const wrapper = shallow(<Table>Test</Table>);

		expect(wrapper.length).to.equal(1);
	});

	it('should apply bordered', () => {
		const wrapper = shallow(
			<Table bordered={true}>
				<tbody>
					<tr>
						<td>Test</td>
					</tr>
				</tbody>
			</Table>
		);

		expect(wrapper.find('table.is-bordered').length).to.equal(1);
	});

	it('should apply striped', () => {
		const wrapper = shallow(
			<Table striped={true}>
				<tbody>
					<tr>
						<td>Test</td>
					</tr>
				</tbody>
			</Table>
		);

		expect(wrapper.find('table.is-striped').length).to.equal(1);
	});

	it('should apply narrow', () => {
		const wrapper = shallow(
			<Table narrow={true}>
				<tbody>
					<tr>
						<td>Test</td>
					</tr>
				</tbody>
			</Table>
		);

		expect(wrapper.find('table.is-narrow').length).to.equal(1);
	});
});