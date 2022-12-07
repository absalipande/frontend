import React from 'react';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
