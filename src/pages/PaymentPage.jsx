import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';
import '../components/PaymentPage.css'; // Adjust the path as necessary
 // Import CSS

export default function PaymentPage() {
  const navigate = useNavigate();

  const bookingDataRaw = sessionStorage.getItem('bookingData');
  const bookingData = bookingDataRaw ? JSON.parse(bookingDataRaw) : {};

  // Ensure tickets is a number, default to 1 if missing or invalid
  const tickets = Number(bookingData.tickets) || 1;

  const amountPerTicket = 150;
  const totalAmount = tickets * amountPerTicket;

  const upiId = 'keerthanabds2018-2@okicici';
  const payeeName = 'Keerthana B D S';
  const transactionNote = 'Ticket Payment';

  // Encode UPI URI components
  const upiBaseUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount.toFixed(
    2,
  )}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const [copySuccess, setCopySuccess] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'confirmed', 'error'
  const [loading, setLoading] = useState(false);

  const upiApps = [
    { name: 'Google Pay', package: 'com.google.android.apps.nbu.paisa.user' },
    { name: 'PhonePe', package: 'com.phonepe.app' },
    { name: 'Paytm', package: 'net.one97.paytm' },
    { name: 'Amazon Pay', package: 'in.amazon.mShop.android.shopping' },
    { name: 'BHIM', package: 'in.org.npci.upiapp' },
    { name: 'Mi Pay', package: 'com.mipay.in.wallet' },
  ];

  const handleCopy = () => {
    const textToCopy = `UPI ID: ${upiId}\nAmount: ₹${totalAmount.toFixed(2)}\nNote: ${transactionNote}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  const handlePaymentConfirm = () => {
    setLoading(true);
    setPaymentStatus('pending');

    // Simulate payment verification delay
    setTimeout(() => {
      // Simulate successful payment verification
      const success = true;

      if (success) {
        setPaymentStatus('confirmed');
        setLoading(false);
        setTimeout(() => navigate('/ticket'), 1500);
      } else {
        setPaymentStatus('error');
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>

      <section className="booking-summary" aria-label="Booking summary">
        <h2>Booking Summary</h2>
        <p>
          <strong>Tickets:</strong> {tickets}
        </p>
        <p>
          <strong>Price per ticket:</strong> ₹{amountPerTicket.toFixed(2)}
        </p>
        <p className="total-amount">
          Total Amount to Pay: ₹{totalAmount.toFixed(2)}
        </p>
      </section>

      <section aria-label="UPI payment options" className="payment-options">
        <h2>Pay Using UPI Apps</h2>

        {!isMobile && (
          <div className="alert-warning" role="alert">
            <strong>Note:</strong> UPI deep links work only on mobile devices. Use QR code or manual payment below.
          </div>
        )}

        {upiApps.map(({ name, package: pkg }) => {
          const intentUri = `intent://${upiBaseUri.replace(/^upi:\/\//, '')}#Intent;scheme=upi;package=${pkg};end`;
          return (
            <a
              key={name}
              href={intentUri}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label={`Pay with ${name}`}
            >
              Pay with {name}
            </a>
          );
        })}

        <hr />

        <h3>Or Pay with Any UPI App</h3>
        <a
          href={upiBaseUri}
          className="btn btn-success"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pay via generic UPI link"
        >
          Pay via UPI Link
        </a>

        {!isMobile && (
          <div className="qr-code-container">
            <h4>Scan QR Code</h4>
            <QRCodeSVG value={upiBaseUri} size={200} />
          </div>
        )}

        <button onClick={handleCopy} className="btn btn-secondary" aria-label="Copy UPI ID and amount">
          Copy UPI ID & Amount
        </button>
        {copySuccess && (
          <div role="alert" className="copy-success">
            {copySuccess}
          </div>
        )}

        <div className="payment-instructions" aria-label="Payment instructions">
          <h3>Instructions</h3>
          <ul>
            <li>Click one of the UPI app buttons above to open your app with payment details pre-filled.</li>
            <li>If using manual payment, scan the QR code or copy the UPI ID and amount.</li>
            <li>After payment, click the "I Have Paid" button below to confirm.</li>
            <li>Your booking ticket will be displayed after confirmation.</li>
          </ul>
        </div>

        <button
          onClick={handlePaymentConfirm}
          disabled={loading || paymentStatus === 'confirmed'}
          aria-live="polite"
          aria-busy={loading}
          className={`btn ${paymentStatus === 'confirmed' ? 'btn-success' : 'btn-primary'}`}
        >
          {loading
            ? 'Verifying payment...'
            : paymentStatus === 'confirmed'
            ? 'Payment Confirmed! Redirecting...'
            : 'I Have Paid'}
        </button>

        {paymentStatus === 'error' && (
          <div role="alert" className="payment-error">
            Payment not verified. Please try again or contact support.
          </div>
        )}
      </section>
    </div>
  );
}
