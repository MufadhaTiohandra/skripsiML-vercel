import React from 'react';
import './App.css'; // Gunakan CSS global yang sama

const AboutPage = ({ onStart }) => {
  return (
    <div className="about-container">
      
      {/* 1. HERO SECTION */}
      <div className="about-hero">
        <div className="about-hero-text">
          <h1>Tentang Penelitian Ini 🎓</h1>
          <p>
            Menggabungkan Psikologi dan Kecerdasan Buatan untuk mendeteksi dini 
            perilaku <i>Problematic Internet Use</i> pada mahasiswa.
          </p>
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="about-content">
        
        {/* Kolom Kiri: Penjelasan */}
        <div className="about-text-section">
          <h2>Latar Belakang</h2>
          <p>
            Di era digital, internet menjadi kebutuhan primer. Namun, penggunaan yang berlebihan 
            dapat memicu masalah psikologis serius. Penelitian skripsi ini bertujuan untuk 
            membangun sistem deteksi otomatis menggunakan algoritma Machine Learning.
          </p>
          
          <h2 style={{marginTop: '30px'}}>Metodologi</h2>
          <p>
            Sistem ini memproses input demografis dan kuesioner IAT (Internet Addiction Test) 
            menggunakan model Machine Learning yang telah dilatih dengan ratusan data mahasiswa 
            UIN Jakarta. Akurasi model divalidasi menggunakan metrik ROC-AUC.
          </p>
        </div>

        {/* Kolom Kanan: Stats / Info Card */}
        <div className="about-stats-section">
          <div className="stat-card">
            <h3>📊 Akurasi</h3>
            <p>High Precision & Recall berdasarkan pengujian data latih.</p>
          </div>
          <div className="stat-card">
            <h3>🎯 Tujuan</h3>
            <p>Membantu mahasiswa sadar akan kesehatan digital mereka.</p>
          </div>
        </div>

      </div>

      {/* 3. CALL TO ACTION (CTA) */}
      <div className="about-cta">
        <h2>Siap mengetahui profil penggunaan internetmu?</h2>
        <p>Hanya butuh waktu kurang dari 2 menit.</p>
        <button className="start-btn" onClick={onStart}>
          Mulai Prediksi Sekarang 🚀
        </button>
      </div>

    </div>
  );
};

export default AboutPage;