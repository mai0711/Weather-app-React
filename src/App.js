import { Route, Routes } from 'react-router-dom';
import './App.css';
import Current from './pages/Current/Current';
import NavBar from './components/NavBar';
import WeeklyWeather from './pages/WeeklyWeather/WeeklyWeather';
import Footer from './components/Footer';
import Hourly from './pages/Hourly/Hourly';

function App() {
  return (
    <div>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/weeklyweather' element={<WeeklyWeather />} />
          <Route path='/' element={<Current />} />
          <Route path='/hourly' element={<Hourly />} />
        </Routes>
      </div>
    <Footer className='footer' />
    </div>
  );
}

export default App;
