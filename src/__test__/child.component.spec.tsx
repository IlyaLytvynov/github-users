import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper } from 'enzyme';
import Child from '../components/child/child.component';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const testChildProps = {
  items: ['1', '2', '3'],
};

let child: ShallowWrapper<undefined, undefined>;

beforeEach(() =>
  child = shallow(<Child {...testChildProps}/>));
// checking that all is fine and component has been rendered
it('should render without error', () => expect(child.length).toBe(1));
it('should render paragraph for each item that has been passed through props', () => {
  const pNodes: ShallowWrapper<HTMLAttributes, undefined> =
    child.find('p');

  expect(pNodes.length).toBe(testChildProps.items.length);
});