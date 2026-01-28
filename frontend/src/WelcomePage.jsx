import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Wajib import CSS ini
import { Carousel } from 'react-responsive-carousel';
import './App.css'; // Kita akan update CSS nanti

const WelcomePage = ({ onStart }) => {
  return (
    <div className="welcome-container">
      {/* Bagian Carousel sebagai Background */}
      <div className="carousel-wrapper">
        <Carousel 
          autoPlay 
          infiniteLoop 
          showThumbs={false} 
          showStatus={false} 
          interval={4000}
          stopOnHover={false}
          animationHandler="fade" 
          swipeable={false}
        >
          <div className="slide-item">
            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop" alt="Internet" />
            <div className="legend-overlay"></div>
          </div>

          <div className="slide-item">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Social Media" />
            <div className="legend-overlay"></div>
          </div>

          <div className="slide-item">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Gaming" />
            <div className="legend-overlay"></div>
          </div>
        </Carousel>
      </div>

      {/* Konten Text di Depan Carousel */}
      <div className="hero-content">
        <h1 className="hero-title">Problematic Internet Use <br /> Prediction System</h1>
        <p className="hero-subtitle">
          Analisis pola penggunaan internet mahasiswa menggunakan Machine Learning.
          Deteksi dini potensi kecanduan internet secara akurat.
        </p>
        <button className="start-btn" onClick={onStart}>
          Mulai Prediksi 🚀
        </button>
      </div>

    </div>
  );
};

export default WelcomePage;