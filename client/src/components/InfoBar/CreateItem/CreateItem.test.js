import React from 'react';
import 'jest-styled-components';
import { render } from '../../../tests/utilities';
import Items from '../../../containers/Items/Items';
import CreateItem from './CreateItem';
import axios from 'axios';
import { fireEvent, waitForElement } from '@testing-library/react';
import { lorem } from 'faker';

const payload = {
  name: null,
  note: null,
  image: null,
  category: null,
};

function exec() {
  const { getByLabelText, getByText, container } = render(
    <React.Fragment>
      <Items />
      <CreateItem />
    </React.Fragment>
  );

  fireEvent.change(getByLabelText('Name'), { target: { value: payload.name } });
  fireEvent.change(getByLabelText('Note(optional)'), {
    target: { value: payload.note },
  });
  fireEvent.change(getByLabelText('Image(optional)'), {
    target: { value: payload.image },
  });
  fireEvent.change(getByLabelText('Category'), {
    target: { value: payload.category },
  });
  fireEvent.click(getByText('Save'));

  return { getByLabelText, getByText, container };
}

jest.mock('axios');

describe('<CreateItem/>', () => {
  beforeEach(() => {
    payload.name = 'Banana';
    payload.note = 'The Best Banana';
    payload.image = 'https://i.imgur.com/9o7jc9o.jpeg';
    payload.category = 'Fruit';

    axios.create.mockImplementationOnce(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              _id: '5f5543b2267b3e04c0a91682',
              name: 'Banana',
              note: 'The Best Banana',
              image: 'https://i.imgur.com/9o7jc9o.jpeg',
              category: { _id: '5f5543ab267b3e04c0a9167f', name: 'Fruit' },
              user: '5f528e6790213f0b78431156',
              __v: 0,
            },
          }),
        get: () =>
          Promise.resolve({
            data: [
              {
                _id: '5f5543b2267b3e04c0a91680',
                name: 'Apple',
                note: '',
                image: '',
                category: { _id: '5f5543ab267b3e04c0a9167f', name: 'Fruit' },
                user: '5f528e6790213f0b78431156',
                __v: 0,
              },
            ],
          }),
      };
    });
  });
  it('should render correctly', () => {
    const { container } = render(<CreateItem />);
    expect(container).toMatchSnapshot();
  });
  it('should show an error modal if name is empty', () => {
    payload.name = '';

    const { getByText } = exec();

    expect(getByText('The name is required')).not.toBeNull();
  });
  it('should show an error modal if the name.length is not between 2 and 40', () => {
    payload.name = 'R';

    const { getByText } = exec();

    expect(
      getByText('The name must contain between 2 and 40 chars')
    ).not.toBeNull();
  });
  it('should show an error modal if the note.length > 255', () => {
    payload.note = lorem.sentence(150);

    const { getByText } = exec();

    expect(getByText('The note must contain at most 255 chars')).not.toBeNull();
  });
  it('should show an error modal if image is not a valid url', () => {
    payload.image = '11111111';

    const { getByText } = exec();

    expect(getByText('The image must be a valid url')).not.toBeNull();
  });
  it('should shown an error modal if category is empty', () => {
    payload.category = '';

    const { getByText } = exec();

    expect(getByText('The category is required')).not.toBeNull();
  });
  it('should show an error modal if the category.length is not between 4 and 120', () => {
    payload.category = 'Ra';

    const { getByText } = exec();

    expect(
      getByText('The category must contain between 4 and 120 chars')
    ).not.toBeNull();
  });
  it('should add the item correctly if the payload is valid', async () => {
    const { getByText, container } = exec();

    await waitForElement(() => getByText(payload.name));
    expect(container).toMatchSnapshot();
  });
});
