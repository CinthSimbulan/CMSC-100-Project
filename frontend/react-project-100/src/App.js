import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Botbar from './components/Botbar';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const userType = localStorage.getItem('usertype');
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {isUserSignedIn && <Route path='/account' element={<Account />} />}
          {isUserSignedIn && userType === 'Merchant' && <Route path='/admin' element={<Admin />} />}
        </Routes>
      </div>
      <Botbar />
    </div>

  );
}

export default App;
