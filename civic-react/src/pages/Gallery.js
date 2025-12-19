import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const successStories = [
    {
      id: 1,
      title: "Pothole Repair on Main Street",
      location: "Banjara Hills, Hyderabad",
      beforeImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      afterImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500",
      description: "A major pothole that was causing traffic issues and vehicle damage has been completely repaired. The road surface is now smooth and safe for all vehicles.",
      reportedBy: "Rajesh Kumar",
      resolvedIn: "5 days",
      prize: "₹2,000 Cash Reward",
      date: "March 15, 2024"
    },
    {
      id: 2,
      title: "Garbage Collection Point Cleanup",
      location: "Jubilee Hills, Hyderabad",
      beforeImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500",
      afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      description: "Overflowing garbage bins and scattered waste have been cleaned up. New bins installed with proper waste segregation system.",
      reportedBy: "Priya Sharma",
      resolvedIn: "3 days",
      prize: "₹1,500 Cash Reward + Certificate",
      date: "March 10, 2024"
    },
    {
      id: 3,
      title: "Street Light Installation",
      location: "Gachibowli, Hyderabad",
      beforeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500",
      afterImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500",
      description: "Dark street area that was unsafe for pedestrians now has proper LED street lighting installed, improving safety and visibility.",
      reportedBy: "Amit Patel",
      resolvedIn: "7 days",
      prize: "₹3,000 Cash Reward + Recognition",
      date: "March 8, 2024"
    }
  ];

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1>Success Stories Gallery</h1>
          <p>See how citizen reports have transformed our city - Before & After transformations</p>
        </div>

        <div className="stories-grid">
          {successStories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <h2>{story.title}</h2>
                <div className="location">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {story.location}
                </div>
              </div>

              <div className="before-after">
                <div className="image-section">
                  <h3>Before</h3>
                  <img 
                    src={story.beforeImage} 
                    alt="Before" 
                    className="comparison-image"
                  />
                </div>
                <div className="arrow">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12,5 19,12 12,19"></polyline>
                  </svg>
                </div>
                <div className="image-section">
                  <h3>After</h3>
                  <img 
                    src={story.afterImage} 
                    alt="After" 
                    className="comparison-image"
                  />
                </div>
              </div>

              <div className="story-details">
                <p className="description">{story.description}</p>
                
                <div className="story-info">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Reported by:</span>
                      <span className="value">{story.reportedBy}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Resolved in:</span>
                      <span className="value">{story.resolvedIn}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Date:</span>
                      <span className="value">{story.date}</span>
                    </div>
                    <div className="info-item prize">
                      <span className="label">Prize Awarded:</span>
                      <span className="value prize-value">{story.prize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="prize-info">
          <h2>Reward System</h2>
          <div className="prize-grid">
            <div className="prize-card">
              <div className="prize-icon">🏆</div>
              <h3>Gold Reporter</h3>
              <p>₹3,000 + Certificate</p>
              <span>Critical issues resolved</span>
            </div>
            <div className="prize-card">
              <div className="prize-icon">🥈</div>
              <h3>Silver Reporter</h3>
              <p>₹2,000 + Recognition</p>
              <span>High priority issues</span>
            </div>
            <div className="prize-card">
              <div className="prize-icon">🥉</div>
              <h3>Bronze Reporter</h3>
              <p>₹1,000 + Badge</p>
              <span>Regular issue reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;