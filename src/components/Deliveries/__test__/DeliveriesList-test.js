import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import DeliveriesList from '../DeliveriesList';

afterEach(cleanup);

it('DeliveriesList changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <DeliveriesList />,
  );

});