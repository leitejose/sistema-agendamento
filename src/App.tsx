import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import RecoverAccount from './pages/RecoverAccount/recover-account';
import NewPassword from './pages/NewPassword/new-password';
import HomeScreen from './pages/HomeScreen/home-screen';
import UtentesScreen from  './pages/UtentesScreen/utentes-screen';
import CollaboratorsScreen from './pages/CollaboratorsScreen/collaborators-screen'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-account" element={<RecoverAccount />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/home-screen"  element={<HomeScreen/>} />
        <Route path="/utentes-screen"   element={<UtentesScreen/>} />
        <Route path='/collaborators-screen' element={<CollaboratorsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
