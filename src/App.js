import './App.css';
import LoginScreen from './pages/loginScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Page404 from './pages/Page404';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/home' element={<Home />} />
        <Route path='/404' element={<Page404/>}/>
      </Routes>
  );
}

export default App;
