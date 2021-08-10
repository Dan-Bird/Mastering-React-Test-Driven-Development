import React from 'react';

export const AppointmentForm = ({ selectableServices = [] }) => (
  <form id="appointment">
    <select name="service">
      <option />
      {selectableServices.map(service => (
        <option key={service}>{service}</option>
      ))}
    </select>
  </form>
);
