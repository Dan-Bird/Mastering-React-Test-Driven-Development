import React from 'react';
import { createContainer } from '../domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('appointment').elements[name];
  const findOption = (dropDownNode, textContent) => {
    const options = Array.from(dropDownNode.childNodes);
    return options.find(option => option.textContent === textContent);
  };

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  describe('Service Field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });

    it('initially has a blank option chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });

    it('lists all salon services', () => {
      const selectableServices = ['cut', 'blow-dry'];

      render(<AppointmentForm selectableServices={selectableServices} />);

      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes
        .map(node => node.textContent)
        .slice(1);

      expect(renderedServices).toEqual(selectableServices);
    });

    it('pre-selects the existing value', () => {
      const services = ['cut', 'blow-dry'];

      render(
        <AppointmentForm selectableServices={services} service="blow-dry" />
      );

      const option = findOption(field('service'), 'blow-dry');

      expect(option.selected).toBeTruthy();
    });

    it('renders a label', () => {
      render(<AppointmentForm />);
      const label = form('appointment').querySelector(`label[for="service"]`);
      expect(label).not.toBeNull();
      expect(label.textContent).toEqual('Service');
    });
  });
});
