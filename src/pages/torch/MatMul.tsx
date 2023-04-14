import React from "react";
import TMatMul from "partials/torch/MatMul";
import VizPageSkeleton from "partials/page/VizPageSkeleton";

export default function MatMul() {
    return (
        <VizPageSkeleton>
            <TMatMul/>
        </VizPageSkeleton>
    );
  }