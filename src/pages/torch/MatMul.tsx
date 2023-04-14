import React from "react";
import TMatMul from "partials/torch/MatMul";
import PageSkeleton from "pages/PageSkeleton";

export default function MatMul() {
    return (
        <PageSkeleton>
            <TMatMul/>
        </PageSkeleton>
    );
  }