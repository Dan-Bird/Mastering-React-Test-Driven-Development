import React from 'react';

const defaultSelectableServices = [
  'Cut',
  'Blow-dry',
  'Cut & color',
  'Beard trim',
  'Cut & beard trim',
  'Extensions',
];

export const AppointmentForm = ({
  selectableServices = defaultSelectableServices,
}) => (
  <form id="appointment">
    <select name="service">
      <option />
      {selectableServices.map(service => (
        <option key={service}>{service}</option>
      ))}
    </select>
  </form>
);
