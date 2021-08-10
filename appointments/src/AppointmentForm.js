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
  service,
}) => (
  <form id="appointment">
    <label htmlFor="service">Service</label>
    <select id="service" name="service" value={service} readOnly>
      <option />
      {selectableServices.map(service => (
        <option key={service}>{service}</option>
      ))}
    </select>
  </form>
);
