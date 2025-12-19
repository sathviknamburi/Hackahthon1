import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About Civic Report System</h1>
          <p>Empowering Citizens for a Better Tomorrow</p>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              The Civic Issue Reporting & Resolution System is a digital initiative by the Government of India 
              to bridge the gap between citizens and local authorities. Our mission is to create a transparent, 
              efficient, and accountable system where every citizen can actively participate in improving their 
              community by reporting civic issues and tracking their resolution in real-time.
            </p>
          </section>

          <section className="vision-section">
            <h2>Our Vision</h2>
            <p>
              To build a digitally empowered society where technology serves as a catalyst for good governance, 
              transparency, and citizen engagement. We envision cities where civic problems are resolved swiftly 
              through collaborative efforts between citizens and government authorities.
            </p>
          </section>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Government Initiative</h3>
              <p>Official platform backed by local municipal authorities and government bodies for authentic issue resolution.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Digital India</h3>
              <p>Part of the Digital India campaign, promoting e-governance and digital literacy among citizens.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Citizen Participation</h3>
              <p>Encouraging active citizen participation in governance and community development through technology.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Resolution</h3>
              <p>Streamlined processes ensure faster response times and efficient resolution of civic issues.</p>
            </div>
          </div>

          <section className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Report Issue</h4>
                <p>Citizens report civic issues through our user-friendly platform with photos and location details.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h4>Verification</h4>
                <p>Reported issues are verified by our team and assigned to relevant government departments.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h4>Action Taken</h4>
                <p>Assigned departments take necessary action and provide regular updates on progress.</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h4>Resolution</h4>
                <p>Issues are resolved and citizens are notified. Successful reporters receive recognition and rewards.</p>
              </div>
            </div>
          </section>

          <section className="impact-section">
            <h2>Our Impact</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Issues Resolved</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Active Citizens</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15</div>
                <div className="stat-label">Partner Departments</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </section>

          <section className="contact-info">
            <h2>Government Partnerships</h2>
            <div className="partners-grid">
              <div className="partner">
                <h4>Municipal Corporation</h4>
                <p>Primary partner for infrastructure and civic amenities</p>
              </div>
              <div className="partner">
                <h4>Police Department</h4>
                <p>Traffic management and public safety issues</p>
              </div>
              <div className="partner">
                <h4>Public Works Department</h4>
                <p>Road maintenance and construction projects</p>
              </div>
              <div className="partner">
                <h4>Electricity Board</h4>
                <p>Street lighting and power supply issues</p>
              </div>
            </div>
          </section>

          <section className="disclaimer">
            <h3>Important Notice</h3>
            <p>
              This platform is an official government initiative. All reported issues are handled by authorized 
              government departments. Citizens are encouraged to provide accurate information and use this platform 
              responsibly. For emergency situations, please contact local emergency services directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;