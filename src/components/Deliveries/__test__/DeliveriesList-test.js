import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import DeliveriesList from '../DeliveriesList';

afterEach(cleanup);

it('DeliveriesList changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <DeliveriesList labelOn="On" labelOff="Off" />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});