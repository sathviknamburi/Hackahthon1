import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1593941707882-6e2a74c3a7bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Modern civic city" 
            className="hero-img"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Report Issues. 
              <span className="gradient-text">Get Them Resolved.</span>
              <br />
              Build a Cleaner, Greener City Together.
            </h1>
            
            <p className="hero-description">
              A smart platform that connects citizens and authorities to resolve civic problems like potholes, 
              garbage, drainage, and streetlights with real-time updates and full transparency.
            </p>

            <div className="hero-buttons">
              <Link to="/report" className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                <span>Report an Issue Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
              
              <Link to="/issues" className="btn btn-outline btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>View Reported Issues</span>
              </Link>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number success">120</div>
              <div className="stat-label">Total Reports</div>
            </div>
            <div className="stat-card">
              <div className="stat-number success">85</div>
              <div className="stat-label">Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number progress">25</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-number warning">10</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              About Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="section-description">
              Our Civic Issue Reporting & Resolution System is designed under the theme of 
              <span className="highlight"> Clean & Green Technology</span>. 
              It allows citizens to actively participate in making their city better by reporting problems online.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <h3 className="value-title">Clean & Green</h3>
              <p className="value-description">Promoting environmental sustainability through technology-driven civic solutions.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="value-title">Trust & Transparency</h3>
              <p className="value-description">Building accountability between citizens and authorities with full transparency.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="value-title">Community Driven</h3>
              <p className="value-description">Empowering citizens to actively participate in making their city better.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
              </div>
              <h3 className="value-title">Efficient Resolution</h3>
              <p className="value-description">Streamlined processes ensure issues are resolved quickly and effectively.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;