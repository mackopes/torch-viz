import React from "react";
import TGather from "partials/torch/Gather";
import CanvasSkeleton from "partials/page/CanvasSkeleton";
import PageSkeleton from "partials/page/PageSkeleton";

export default function Gather() {
    const [dim, setDim] = React.useState(0);
    return (
        <PageSkeleton>
            <div className="flex flex-col w-full">
                <h1> Gather </h1>
                <div className="flex flex-row">
                    <label htmlFor="dim">dim</label>
                    <select name="dim" id="dim" value={dim} onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val >= 0 && val <= 1) {
                            setDim(val);
                        } else {
                            setDim(0);
                        }
                    }} >
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>

                </div>
                <CanvasSkeleton>
                    <TGather dim={dim}/>
                </CanvasSkeleton>
            </div>
        </PageSkeleton>
    );
  }