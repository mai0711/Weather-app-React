import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage/HomePage';
import WeeklyWeather from './pages/WeeklyWeather/WeeklyWeather';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <NavBar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/weeklyweather' element={<WeeklyWeather />} />
        <Route path='/main' element={<Main />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
