import { Route, Routes } from 'react-router-dom';
import './App.css';
import Current from './pages/Current/Current';
import NavBar from './components/NavBar';
import WeeklyWeather from './pages/WeeklyWeather/WeeklyWeather';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <NavBar />

      <Routes>
        <Route path='/weeklyweather' element={<WeeklyWeather />} />
        <Route path='/current' element={<Current />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
