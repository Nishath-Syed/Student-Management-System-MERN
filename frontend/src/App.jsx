import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SignupCard from './components/SignUpCard';
import AllUsers from './components/AllUsers';
import StudentPage from './components/StudentPage';
import StudentPerPage from './components/StudentPerPage';
import EditPage from './components/EditPage';
import ServicesPage from './components/ServicePage';


function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Routes>
      <Route path='/' element={user ? <HomePage /> : <Navigate to="/login" />} />
      <Route path='/login' element={!user ? <Login /> : <div>Logout first!</div>} />
      <Route path='/register' element={user?.firstName === 'Shuichi' && user?.lastName === 'Akai' ? <SignupCard /> : <div>Page not found !!</div>} />
      <Route path='/all' element={user?.firstName === 'Shuichi' && user?.lastName === 'Akai' ? <AllUsers /> : <div>Page not found !!</div>} />
      <Route path='/personal/:id' element={<StudentPage />} />
      <Route path='/grades/:id' element={<StudentPerPage />} />
      <Route path='/edit/:id' element={<EditPage />} />
      <Route path="/services" element={<ServicesPage/>} />
      
    </Routes>
  );
}

export default App;
