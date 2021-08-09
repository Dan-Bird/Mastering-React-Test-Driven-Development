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

  const itSavesExistingFirstNameWhenSubmitted = existingFieldData => {
    it('saves existing fieldContent when submitted', async () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName={existingFieldData}
          onSubmit={({ firstName }) =>
            expect(firstName).toEqual(existingFieldData)
          }
        />
      );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props => expect(props[fieldName]).toEqual(value)}
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabelForGivenField('firstName', 'First Name');

    itAssignsIDMatchingLabelIDToField('firstName', 'firstName');

    itSavesExistingFirstNameWhenSubmitted('Ashley');

    itSubmitsNewValue('firstName', 'firstName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');

    itIncludesTheExistingValue('lastName');

    itRendersALabelForGivenField('lastName', 'Last Name');

    itAssignsIDMatchingLabelIDToField('lastName', 'lastName');

    // itSavesExistingFirstNameWhenSubmitted('Ashley');

    // itSubmitsNewValue('firstName', 'firstName');
  });
});
