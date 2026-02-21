import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../components/TicketPage.css';

export default function TicketPage() {
  const navigate = useNavigate();
  const bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');

  if (!bookingData.name || !bookingData.ticketId) {
    navigate('/');
    return null;
  }

  const qrValue = JSON.stringify({ ticketId: bookingData.ticketId });

  return (
    <div className="ticket-page-container">
      <div className="ticket-card">
        <div className="ticket-header">
          <h2>Booking Confirmed!</h2>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Thank you for your purchase</p>
        </div>

        <div className="ticket-body">
          <div className="ticket-info-grid">
            <div className="info-item">
              <label>Passenger / User</label>
              <span>{bookingData.name}</span>
            </div>
            <div className="info-item">
              <label>Event Type</label>
              <span>{bookingData.eventType}</span>
            </div>
            <div className="info-item" style={{ gridColumn: 'span 2' }}>
              <label>Venue / Details</label>
              <span>{bookingData.eventDetails}</span>
            </div>
            <div className="info-item">
              <label>Date</label>
              <span>{bookingData.date}</span>
            </div>
            <div className="info-item">
              <label>Time</label>
              <span>{bookingData.time}</span>
            </div>
            <div className="info-item">
              <label>Tickets</label>
              <span>{bookingData.tickets}</span>
            </div>
          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-qr-section">
            <h3>Show this QR code at the entry</h3>
            <div className="qr-wrapper">
              <QRCodeSVG value={qrValue} size={150} level="H" />
            </div>
            <br />
            <div className="ticket-id-badge">
              ID: {bookingData.ticketId.substring(0, 13)}...
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="btn-home">
          Book Another Ticket
        </button>
      </div>
    </div>
  );
}
