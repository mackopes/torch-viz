import React from "react";
import TMatMul from "partials/torch/MatMul";
import PageSkeleton from "partials/page/PageSkeleton";

export default function MatMul() {
    return (
        <PageSkeleton>
            <TMatMul/>
        </PageSkeleton>
    );
  }