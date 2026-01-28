import { useState } from 'react'
import axios from 'axios'
import WelcomePage from './WelcomePage'
import AboutPage from './About'
import Navbar from './Navbar'
import './App.css'

// Questions data
const IAT_QUESTIONS = {
    1: "Seberapa sering Kamu berkata pada diri sendiri, \"hanya beberapa menit lagi,\" saat sedang online?",
    2: "Seberapa sering Kamu mengabaikan pekerjaan rumah tangga untuk menghabiskan lebih banyak waktu online?",
    3: "Seberapa sering Kamu lebih memilih menghabiskan waktu di Internet dibandingkan dengan teman, keluarga, atau sosial lainnya?",
    4: "Seberapa sering Kamu menjalin hubungan baru (berteman) dengan sesama pengguna online?",
    5: "Seberapa sering orang lain dalam hidup Kamu mengeluh tentang jumlah waktu yang Kamu habiskan online?",
    6: "Seberapa sering nilai atau hasil studi Kamu menurun karena jumlah waktu yang Kamu habiskan online?",
    7: "Seberapa sering Kamu memeriksa email atau pesan sebelum melakukan hal lain yang perlu Kamu lakukan?",
    8: "Seberapa sering Kamu menggunakan internet sebagai cara untuk lari dari masalah atau untuk meredakan perasaan tidak nyaman (misalnya, perasaan tidak berdaya, bersalah, cemas, depresi)?",
    9: "Seberapa sering Kamu mencoba menyembunyikan berapa lama Kamu telah online?",
    10 : "Seberapa sering Kamu membahayakan atau mempertaruhkan hilangnya hubungan penting, pekerjaan, atau kesempatan pendidikan/karier karena internet?",
    11 : "Seberapa sering Kamu mencoba mengurangi jumlah waktu yang Kamu habiskan online namun gagal?",
    12 : "Seberapa sering Kamu kurang tidur karena sesi online hingga larut malam?",
    13: "Seberapa sering Kamu online lebih lama dari yang Kamu niatkan?",
    14: "Seberapa sering Kamu takut hidup tanpa internet akan terasa membosankan, hampa, dan tidak menyenangkan?",
    15: "Seberapa sering Kamu merasa sibuk memikirkan internet saat sedang offline, atau membayangkan kapan akan online lagi?",
    16: "Seberapa sering Kamu membentak, berteriak, atau bertindak jengkel jika seseorang mengganggu Kamu saat sedang online?",
    17 : "Seberapa sering Kamu menantikan waktu berikutnya untuk bisa online?",
    18 : "Seberapa sering kinerja atau produktivitas pekerjaan Kamu menurun karena internet?",
    19: "Seberapa sering Kamu lebih memilih untuk menghabiskan waktu online daripada pergi keluar dengan orang lain?",
    20: "Seberapa sering Kamu merasa depresi, murung, atau gugup saat sedang offline, yang kemudian hilang begitu Kamu kembali online?"
  }

// Result display component
function ResultCard({ result }) {
  if (!result) return null;
  
  const isAddicted = result.prediction === 1;
  const confidencePercentage = (Math.max(...result.probability) * 100).toFixed(0);
  
  return (
    <div style={{ 
      marginTop: "30px", 
      padding: "20px", 
      backgroundColor: isAddicted ? "#ff4d4d" : "#4caf50", 
      color: "white",
      borderRadius: "10px",
      textAlign: "center"
    }}> 
      <h2>Hasil Prediksi: {isAddicted}</h2>
      <p>Confidence Score: {confidencePercentage}%</p>
    </div>
  );
}

// Loading indicator component
function LoadingIndicator({ isLoading }) {
  if (!isLoading) return null;
  
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner"></div>
        <p className="loading-text">Bentar lagi gue prediksi...</p>
      </div>
    </div>
  );
}

// Form component
function PredictionForm({ formData, handleChange, handleSubmit, iatQuestions }) {
  return (
    <div className="form-container-styled">
      <div className="form-header">
        <h1>Form Data Mahasiswa 📝</h1>
        <p style={{color: '#aaa'}}>Isi data berikut dengan jujur untuk hasil akurat.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Demographics */}
        <div className="question-card">
           <label>Usia (Age):</label>
           <input type="number" name="Basic_Demos_Age" value={formData.Basic_Demos_Age} onChange={handleChange} required className="styled-input"/>
        </div>

        <div className="question-card">
           <label>Tinggi Badan (cm):</label>
           <input type="number" name="Physical_Height" value={formData.Physical_Height} onChange={handleChange} required className="styled-input"/>
        </div>

        <div className="question-card">
           <label>Berat Badan (kg):</label>
           <input type="number" name="Physical_Weight" value={formData.Physical_Weight} onChange={handleChange} required className="styled-input"/>
        </div>

        {/* IAT Questions 1-20 */}
        {Object.entries(iatQuestions).map(([key, question]) => (
          <div className="question-card" key={key}>
            <label>{question}</label>
            <select 
              name={`IAT_IAT_${key.padStart(2, '0')}`} 
              value={formData[`IAT_IAT_${key.padStart(2, '0')}`]} 
              onChange={handleChange} 
              required 
              className="styled-select"
            >
              <option value="" style={{color: "grey"}} disabled selected hidden>-- Pilih Jawaban --</option>
              <option value={0}>0 - Tidak Berlaku</option>
              <option value={1}>1 - Jarang</option>
              <option value={2}>2 - Kadang-kadang</option>
              <option value={3}>3 - Sering</option>
              <option value={4}>4 - Cukup Sering</option>
              <option value={5}>5 - Selalu</option>
            </select>
          </div>  
        ))}

        {/* Computer Internet Usage */}
        <div className="question-card">
           <label>Jam Internet Sehari (jam):</label>
           <select type="number" name="PreInt_EduHx_computerinternet_hoursday" value={formData.PreInt_EduHx_computerinternet_hoursday} onChange={handleChange} required className="styled-select">
              <option value="" style={{color: "grey"}} disabled selected hidden>-- Pilih Jawaban --</option>
              <option value={0}>0 - Kurang dari 1 jam</option>
              <option value={1}>1 - Sekitar 1 jam</option>
              <option value={2}>2 - Sekitar 2 jam</option>
              <option value={3}>3 - Lebih dari 3 jam</option>
            </select>
        </div>
        
        <button type="submit" className="submit-btn-large" style={{width: "100%"}}>Analisis Sekarang</button>
      </form>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    Basic_Demos_Age: "",
    Physical_Height: "",
    Physical_Weight: "",
    IAT_IAT_01: "",
    IAT_IAT_02: "",
    IAT_IAT_03: "",
    IAT_IAT_04: "",
    IAT_IAT_05: "",
    IAT_IAT_06: "",
    IAT_IAT_07: "",
    IAT_IAT_08: "",
    IAT_IAT_09: "",
    IAT_IAT_10: "",
    IAT_IAT_11: "",
    IAT_IAT_12: "",
    IAT_IAT_13: "",
    IAT_IAT_14: "",
    IAT_IAT_15: "",
    IAT_IAT_16: "",
    IAT_IAT_17: "",
    IAT_IAT_18: "",
    IAT_IAT_19: "",
    IAT_IAT_20: "",
    PreInt_EduHx_computerinternet_hoursday: ""
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page !== 'form') {
      setResult(null); // Reset result when navigating away from form
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value)
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        Basic_Demos_Age: formData.Basic_Demos_Age,
        Physical_Height: formData.Physical_Height,
        Physical_Weight: formData.Physical_Weight,
        IAT_IAT_01: formData.IAT_IAT_01,
        IAT_IAT_02: formData.IAT_IAT_02,
        IAT_IAT_03: formData.IAT_IAT_03,
        IAT_IAT_04: formData.IAT_IAT_04,
        IAT_IAT_05: formData.IAT_IAT_05,
        IAT_IAT_06: formData.IAT_IAT_06,
        IAT_IAT_07: formData.IAT_IAT_07,
        IAT_IAT_08: formData.IAT_IAT_08,
        IAT_IAT_09: formData.IAT_IAT_09,
        IAT_IAT_10: formData.IAT_IAT_10,
        IAT_IAT_11: formData.IAT_IAT_11,
        IAT_IAT_12: formData.IAT_IAT_12,
        IAT_IAT_13: formData.IAT_IAT_13,
        IAT_IAT_14: formData.IAT_IAT_14,
        IAT_IAT_15: formData.IAT_IAT_15,
        IAT_IAT_16: formData.IAT_IAT_16,
        IAT_IAT_17: formData.IAT_IAT_17,
        IAT_IAT_18: formData.IAT_IAT_18,
        IAT_IAT_19: formData.IAT_IAT_19,
        IAT_IAT_20: formData.IAT_IAT_20,
        PreInt_EduHx_computerinternet_hoursday: formData.PreInt_EduHx_computerinternet_hoursday
      };

      // loading delay 
      await new Promise(resolve => setTimeout(resolve, 1500));

      // fetch data from backend
      const response = await axios.post('http://127.0.0.1:8000/predict', payload);
      setResult(response.data);

      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
       // Simulate loading delay
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Gagal konek ke server. Silakan coba lagi nanti.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar 
        activePage={currentPage} 
        onNavigate={handleNavigation} 
      />
      
      {currentPage === 'home' && (
        <WelcomePage onStart={() => handleNavigation('form')} />
      )}
      
      {currentPage === 'about' && (
        <AboutPage onStart={() => handleNavigation('form')} />
      )}
      
      {currentPage === 'form' && (
        <div className="form-container-styled">
          
          <button type='button' className="back-btn" onClick={() => {
            handleNavigation('home')
          }}>
            ← Kembali ke Home

          </button>

          <div className="form-header">
            <h1>Form Data Mahasiswa 📝</h1>
            <p style={{color: '#aaa'}}>Isi data berikut dengan jujur untuk hasil akurat.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            
            {/* Basic Demographics */}
            <div className="question-card">
               <label>Usia (Age):</label>
               <input type="number" name="Basic_Demos_Age" value={formData.Basic_Demos_Age} onChange={handleChange} required className="styled-input"/>
            </div>

            <div className="question-card">
               <label>Tinggi Badan (cm):</label>
               <input type="number" name="Physical_Height" value={formData.Physical_Height} onChange={handleChange} required className="styled-input"/>
            </div>

            <div className="question-card">
               <label>Berat Badan (kg):</label>
               <input type="number" name="Physical_Weight" value={formData.Physical_Weight} onChange={handleChange} required className="styled-input"/>
            </div>

            {/* IAT Questions 1-20 */}
            {Object.entries(IAT_QUESTIONS).map(([key, question]) => (
              <div className="question-card" key={key}>
                <label>{question}</label>
                <select 
                  name={`IAT_IAT_${key.padStart(2, '0')}`} 
                  value={formData[`IAT_IAT_${key.padStart(2, '0')}`]} 
                  onChange={handleChange} 
                  required 
                  className="styled-select"
                >
                  <option value="" style={{color: "grey"}} disabled selected hidden>-- Pilih Jawaban --</option>
                  <option value={0}>0 - Tidak Berlaku</option>
                  <option value={1}>1 - Jarang</option>
                  <option value={2}>2 - Kadang-kadang</option>
                  <option value={3}>3 - Sering</option>
                  <option value={4}>4 - Cukup Sering</option>
                  <option value={5}>5 - Selalu</option>
                </select>
              </div>  
            ))}

            {/* Computer Internet Usage */}
            <div className="question-card">
               <label>Jam Internet Sehari (jam):</label>
               <select name="PreInt_EduHx_computerinternet_hoursday" value={formData.PreInt_EduHx_computerinternet_hoursday} onChange={handleChange} required className="styled-select">
                  <option value="" style={{color: "grey"}} disabled selected hidden>-- Pilih Jawaban --</option>
                  <option value={0}>0 - Kurang dari 1 jam</option>
                  <option value={1}>1 - Sekitar 1 jam</option>
                  <option value={2}>2 - Sekitar 2 jam</option>
                  <option value={3}>3 - Lebih dari 3 jam</option>
               </select>
            </div>
            
            <button type="submit" className="submit-btn-large" style={{width: "100%"}}>Analisis Sekarang</button>
          </form>

          {/* --- LOADING INDICATOR --- */}
          {isLoading && (
            <LoadingIndicator isLoading={isLoading} />
          )}

          {/* --- HASIL RESULT --- */}
          {result && (
            <ResultCard result={result} />
          )}

        </div>
      )}
    </>
  );
}

export default App;