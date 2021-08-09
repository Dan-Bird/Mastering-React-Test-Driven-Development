import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form('customer').elements[name];

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toBe('text');
  };

  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  const itRendersAsATextBox = fieldName => {
    it('renders the field as a textbox', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };

  const itIncludesTheExistingValue = fieldName => {
    it('includes the existing value for the field', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  };

  const itRendersALabelForGivenField = (field, labelText) => {
    it('renders a label for the field', () => {
      render(<CustomerForm />);
      expect(labelFor(field)).not.toBeNull();
      expect(labelFor(field).textContent).toEqual(labelText);
    });
  };

  const itAssignsIDMatchingLabelIDToField = (fieldName, expectedId) => {
    it('assigns an ID that matches the label id to the field', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(expectedId);
    });
  };

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabelForGivenField('firstName', 'First Name');

    itAssignsIDMatchingLabelIDToField('firstName', 'firstName');

    // const itSavesExistingFirstNameWhenSubmitted = () => {

    // }

    it('saves existing first name when submitted', async () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual('Ashley')}
        />
      );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves new first name when submitted', async () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual('Jamie')}
        />
      );

      await ReactTestUtils.Simulate.change(field('firstName'), {
        target: { value: 'Jamie' },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  });
});
