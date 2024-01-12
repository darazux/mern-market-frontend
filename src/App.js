import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import ReadAll from './pages/item/readAll';
import ReadSingle from './pages/item/readSingle';
import Login from './pages/user/login';
import Register from './pages/user/register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/" element={<ReadAll />} />
        <Route path="/item/:id" element={<ReadSingle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
