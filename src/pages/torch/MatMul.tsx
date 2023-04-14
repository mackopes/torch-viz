import React from "react";
import TMatMul from "partials/torch/MatMul";
import CanvasSkeleton from "partials/page/CanvasSkeleton";
import PageSkeleton from "partials/page/PageSkeleton";

export default function MatMul() {
    return (
        <PageSkeleton>
            <CanvasSkeleton>
                <TMatMul/>
            </CanvasSkeleton>
        </PageSkeleton>
    );
  }