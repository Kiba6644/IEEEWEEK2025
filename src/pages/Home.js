import React, { useEffect, useRef, useState } from 'react';
import Navbaring from '../Components/Nav';
import './Home.css';
import Slider from '../Components/Slider.js';
import fetchEvents from '../Components/data.js';
import CountDown from '../Components/CountDown.js';
import AboutUs from '../Components/about_us.js';

function Home() {
  const vantaRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const vantaEffect = window.VANTA.NET({
      el: ".net",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xc7c8e5,
      backgroundColor: 0x10111d,
      points: 30.00,
      maxDistance: 14.00,
      spacing: 15.00,
      showDots: false
    });

    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents || []);
        // console.log(events)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <Navbaring />
      <div className="countdown-container">
        <CountDown />
      </div>
      <h2 className="events-title">Events</h2>
      <div className="center">
        <Slider data={events} activeSlide={5} />
      </div>
      
      <h2 className="flagship-title">Flagship Event</h2>
      <div className="flagship-container">
        <div className="flagship-event">
          <img src="/images/replacer.png" alt="Flagship Event Poster" className="poster" />
          <div className="description">
            <h3>Coming Soon</h3>
            <p>Stay tuned for more updates!</p>
            <a href="https://forms.gle//example" target='__blank'>
              <button className="know-more-button">Coming soon!</button>
            </a>
          </div>
        </div>
        <div className="flagship-event reverse">
          <img src="/images/replacer.png" alt="Flagship Event Poster" className="poster" />
          <div className="description">
            <h3>Coming Soon</h3>
            <p>Stay tuned for more updates!</p>
            <a href="https://forms.gle//example" target='__blank'>
              <button className="know-more-button">Coming soon!</button>
            </a>
          </div>
        </div>
        <AboutUs />
      </div>
    </div>
  );
}

export default Home;



// PS C:\Users\vigne\OneDrive\Desktop\IEEE_DAY_WEBSITE\IEEE-Week\backend> cd..
// PS C:\Users\vigne\OneDrive\Desktop\IEEE_DAY_WEBSITE\IEEE-Week> git add .
// PS C:\Users\vigne\OneDrive\Desktop\IEEE_DAY_WEBSITE\IEEE-Week> git commit -m "homepage done" 
// [master f5e2908] homepage done
//  56 files changed, 324 insertions(+), 224 deletions(-)
// PS C:\Users\vigne\OneDrive\Desktop\IEEE_DAY_WEBSITE\IEEE-Week> git push 