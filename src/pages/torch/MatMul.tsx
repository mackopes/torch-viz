import React from "react";
import TMatMul from "partials/torch/MatMul";

export default function MatMul() {
    return (
      <main className="h-screen w-screen container">
        <div>
          <h1> TorchViz </h1>
        </div>
        <div className="h-full w-full container">
          <TMatMul/>
        </div>
      </main>
    );
  }