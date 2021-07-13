import { render, screen } from '@testing-library/react';
import Truck from 'interfaces/Truck';
import { useState } from 'react';
import Form from './Form';

test('modelYear should only accept 4 integer caracters', () => {
  const [truck, setTruck] = useState({modelId: 1, modelYear: '2021', productionYear: '2021'} as Truck);

  render(<Form setTruck={setTruck} truck={truck} title={'Truck Registration'} isProductionyearValid={true} isModelyearValid={true}/>);
  const inputElement = screen.getByTitle('model-year-input');

  expect(inputElement.innerText.length.toString()).toMatch('4');
});

test('productionYear should only accept 4 integer caracters', () => {
  const [truck, setTruck] = useState({modelId: 1, modelYear: '2021', productionYear: '2021'} as Truck);

  render(<Form setTruck={setTruck} truck={truck} title={'Truck Registration'} isProductionyearValid={true} isModelyearValid={true}/>);
  const inputElement = screen.getByTitle('production-year-input');

  expect(inputElement.innerText.length.toString()).toMatch('4');
});
