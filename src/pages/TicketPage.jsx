import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function TicketPage() {
  const navigate = useNavigate();
  const bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');

  if (!bookingData.name || !bookingData.ticketId) {
    navigate('/');
    return null;
  }

  const qrValue = JSON.stringify({ ticketId: bookingData.ticketId });

  return (
    <div className="container ticket-container">
      <h2>Booking Confirmed!</h2>
      <p><strong>Name:</strong> {bookingData.name}</p>
      <p><strong>Event:</strong> {bookingData.eventType}</p>
      <p><strong>Details:</strong> {bookingData.eventDetails}</p>
      <p><strong>Date:</strong> {bookingData.date}</p>
      <p><strong>Time:</strong> {bookingData.time}</p>
      <p><strong>Tickets:</strong> {bookingData.tickets}</p>
      <p><strong>Ticket ID:</strong> {bookingData.ticketId}</p>

      <div style={{ marginTop: '30px' }}>
        <h3>Your Ticket QR Code:</h3>
        <QRCodeSVG value={qrValue} size={200} />
      </div>
    </div>
  );
}
