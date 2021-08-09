import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerForm } from './CustomerForm';
// import { AppointmentsDayView } from './AppointmentsDayView';
// import { sampleAppointments } from './sampleData';
import(CustomerForm);

ReactDOM.render(<CustomerForm />, document.getElementById('root'));
