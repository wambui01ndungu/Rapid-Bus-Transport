import React,{useState} from 'react';
import './Home.css'; 


const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image file names (inside public folder)
  const images = [
    "/bus1.jpg",
    "/bus2.jpg",
    "/bus3.jpg",
    "/bus4.jpg"
  ];

  // Handlers to change the image index
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };


  return (
    <div className="home">
      {/* Welcome Section */}
      <section id="welcome">
        <h1>Welcome to Safiri Link Bus Management System</h1>
        <p>Your one-stop solution for bus travel in and out of Nairobi. Easily book your seat, view schedules, and manage your travel plans. Experience smooth, reliable travel with our trusted bus fleet.</p>
        <button onClick={() => window.location.href = '/bookings'}>Book Your Seat</button>
      </section>

      {/* Bus Fleet Image Section */}
      <section id="bus-fleet">
        <h2>Our Fleet</h2>
        <div className="image-placeholder">
          <img src="https://plus.unsplash.com/premium_photo-1661963542752-9a8a1d72fb28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzJTIwZmxlZXR8ZW58MHx8MHx8fDA%3D" alt="Bus Fleet" />
        </div>
        <div>
          <button className="arrow left" onClick={handlePrev}>
            &#8592;
          </button>
          <button className="arrow right" onClick={handleNext}>
            &#8594;
          </button>
        </div>
        <p>We operate a large fleet of modern, comfortable buses to ensure your travel experience is safe, timely, and enjoyable.</p>
      </section>

      {/* Features Section */}
      <section id="features">
        <h2>Our Features</h2>
        <div className="feature-container">
          {/* Feature 1 */}
          <div className="feature">
            <div className="image-placeholder">
              <img src="https://images.unsplash.com/photo-1587573088697-b4fa10460683?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhc3klMjBib29raW5nfGVufDB8fDB8fHww" alt="Feature 1" />
            </div>
            <h3>Easy Booking</h3>
            <p>Book your seat in seconds. Our simple and intuitive platform allows you to select your route, date, and seat with ease.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature">
            <div className="image-placeholder">
              <img src="https://plus.unsplash.com/premium_photo-1677093906033-dc2beb53ace3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhY2tpbmd8ZW58MHx8MHx8fDA%3D" alt="Feature 2" />
            </div>
            <h3>Track Your Bus</h3>
            <p>Track your bus in real-time. Know the exact location of your bus, estimated arrival times, and any delays.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature">
            <div className="image-placeholder">
              <img src="https://plus.unsplash.com/premium_photo-1677419807617-5cca7c35f57a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzJTIwY29tZm9ydHxlbnwwfHwwfHx8MA%3D%3D" alt="Feature 3" />
            </div>
            <h3>Reliable and Comfortable</h3>
            <p>Our buses are equipped with comfortable seating, air conditioning, and safety features to ensure a pleasant journey.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us">
        <h2>Contact Us</h2>
        <p>If you have any questions, feedback, or need assistance with booking, feel free to reach out to us. We're here to help!</p>
        
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default Home;
