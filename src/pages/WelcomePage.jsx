import { useNavigate } from 'react-router-dom';
import '../components/Welcome.css';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/user-details');
  };

  return (
    <div className="welcome-container">
      <div className="floating-circle" style={{ width: '300px', height: '300px', top: '10%', left: '5%' }}></div>
      <div className="floating-circle" style={{ width: '400px', height: '400px', bottom: '10%', right: '5%', animationDelay: '-10s' }}></div>
      
      <div className="welcome-content">
        <h1>Welcome to the Ticket Booking Portal</h1>
        <p className="subtitle">
          Experience seamless ticket booking with the best prices and instant confirmation.
        </p>
        <p className="extra-info">
          Whether you're planning a concert, movie, or event, we've got you covered. Start your journey now and never miss out on your favorite experiences!
        </p>
        <button onClick={handleStart} className="btn-primary">
          Book Now
        </button>
      </div>
    </div>
  );
}
