import React from 'react';
import MatMul from 'partials/torch/MatMul';


function App() {
  return (
    <main className="h-screen w-screen container">
      <div>
        <h1> TorchViz </h1>
      </div>
      <div className="h-full w-full container">
        <MatMul/>
      </div>
    </main>
  );
}

export default App;
