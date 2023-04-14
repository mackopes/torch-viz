import React from "react";
import TGather from "partials/torch/Gather";
import VizPageSkeleton from "partials/page/VizPageSkeleton";

export default function Gather() {
    return (
        <VizPageSkeleton>
            <TGather/>
        </VizPageSkeleton>
    );
  }