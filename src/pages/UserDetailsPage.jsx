import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/UserDetails.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // ✅ Import UUID

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const todayDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDetails: '',
    date: '',
    time: '',
    tickets: 1,
  });

  const [errors, setErrors] = useState({});
  const eventTypes = ['Bus', 'Train', 'Cinema', 'Airplane'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) errs.phone = 'Phone must be 10 digits';
    if (!formData.eventDetails.trim()) errs.eventDetails = 'Event details required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.time) errs.time = 'Time is required';
    if (formData.tickets < 1) errs.tickets = 'At least 1 ticket required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const ticketId = uuidv4(); // ✅ Generate unique ticket ID
    const ticketData = { ...formData, ticketId };

    try {
      const response = await axios.post('http://localhost:8080/api/tickets', ticketData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Booking successful:', response.data);
      sessionStorage.setItem('bookingData', JSON.stringify(response.data));
      navigate('/payment');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book ticket.');
    }
  };

  return (
    <div className="container form-container">
      <h2>Enter Booking Details</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email:
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Phone Number:
          <input name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>

        <label>
          Event Type:
          <select name="eventType" value={formData.eventType} onChange={handleChange}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Event Details:
          <input name="eventDetails" value={formData.eventDetails} onChange={handleChange} />
          {errors.eventDetails && <span className="error">{errors.eventDetails}</span>}
        </label>

        <label>
          Date:
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={todayDate}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </label>

        <label>
          Time:
          <input name="time" type="time" value={formData.time} onChange={handleChange} />
          {errors.time && <span className="error">{errors.time}</span>}
        </label>

        <label>
          Number of Tickets:
          <input
            name="tickets"
            type="number"
            min="1"
            value={formData.tickets}
            onChange={handleChange}
          />
          {errors.tickets && <span className="error">{errors.tickets}</span>}
        </label>

        <button type="submit" className="btn-primary">
          Buy the Ticket
        </button>
      </form>
    </div>
  );
}
