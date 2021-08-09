import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName });

  const handleChangeFirstName = ({ target }) => {
    setCustomer(customer => ({
      ...customer,
      firstName: target.value,
    }));
  };

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={handleChangeFirstName}
      />

      <input
        type="text"
        name="lastName"
        id="lastName"
        value={lastName}
        onChange={handleChangeFirstName}
      />
    </form>
  );
};
