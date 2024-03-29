import './App.css';
import LoginScreen from './pages/loginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
