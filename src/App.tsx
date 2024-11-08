import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import RecoverAccount from './pages/RecoverAccount/recover-account';
import NewPassword from './pages/NewPassword/new-password';
import HomeScreen from './pages/HomeScreen/home-screen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-account" element={<RecoverAccount />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/home-screen"  element={<HomeScreen/>} />
      </Routes>
    </Router>
  );
};

export default App;
