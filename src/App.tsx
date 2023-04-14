import React from 'react';
import MatMul from 'pages/torch/MatMul';
import Main from 'pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/matmul" element={<MatMul/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
