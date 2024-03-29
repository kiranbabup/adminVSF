import './App.css';
import LoginScreen from './pages/loginScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    // </Router>
  );
}

export default App;
