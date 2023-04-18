import React from "react";
import TMatMul from "partials/torch/MatMul";
import CanvasSkeleton from "partials/page/CanvasSkeleton";
import PageSkeleton from "partials/page/PageSkeleton";
import { Link } from "react-router-dom";

function TorchSignature({
    name,
    args,
    returns,
    docsLink,
    returnsLink,
    className=""
}: {
    name: string;
    args: string[];
    returns: string;
    docsLink: string;
    returnsLink: string;
    className?: string;
}) {
    const argsStr = args.join(", ");
    return(
        <span className={`font-roboto ${className} font-medium`}>
            <Link to={docsLink} className="text-torchBlue" target="_blank"> {name} </Link>
            ({argsStr}) →
            <Link to={returnsLink} className="text-torchBlue" target="_blank"> {returns} </Link>
        </span>
    )
}

export default function MatMul() {
    return (
        <PageSkeleton>
            <div className="flex flex-col w-full">
                {/* <h1 className="text-lg font-roboto mb-4"> torch.matmul(input, other) → Tensor  </h1> */}

                {/* <h1 className="text-lg font-roboto mb-4"> torch.matmul(input, other) → Tensor  </h1> */}

                <TorchSignature className="text-lg" name="torch.matmul" args={["input", "other"]} returns="Tensor" docsLink="https://pytorch.org/docs/stable/generated/torch.matmul.html#torch.matmul" returnsLink="https://pytorch.org/docs/stable/tensors.html#torch.Tensor"/>
                <CanvasSkeleton>
                    <TMatMul/>
                </CanvasSkeleton>
            </div>
        </PageSkeleton>
    );
  }