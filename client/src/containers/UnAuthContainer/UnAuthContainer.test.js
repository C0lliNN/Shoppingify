import React from 'react';
import { render } from '../../tests/utilities';
import UnAuthContainer from './UnAuthContainer';
import 'jest-styled-components';

const title = 'Container';
const childrenText = 'Custom Title';

function exec() {
  return render(
    <UnAuthContainer title={title}>{childrenText}</UnAuthContainer>
  );
}

describe('<UnAuthContainer/>', () => {
  it('should render correctly', () => {
    const { container } = exec();
    expect(container).toMatchSnapshot();
  });
  it('should display the title', () => {
    const { getByText } = exec();

    expect(getByText(title)).not.toBeNull();
  });
  it('should display the children', () => {
    const { getByText } = exec();

    expect(getByText(childrenText)).not.toBeNull();
  });
});
