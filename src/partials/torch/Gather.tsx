import React, { useState } from "react";
import { BoxMatrix, MatrixColHighlight, MatrixHighlight, MatrixIndexHighlight, MatrixRowHighlight, SelectorBoxMatrix } from "components/BoxMatrix";
import { Text } from '@react-three/drei';
import { leftMat, midMat, rightMat } from "helpers/constants";
import Box from "components/Box";

interface BoxTensorProps {
    dims: [number, number, number];
    position: [number, number, number];
    boxScale?: number;
    gap?: number|[number, number, number];
    color?: string;
    hoverColor?: string;
}

function BoxTensor({dims, position, boxScale=1, gap=0.5, color='grey', hoverColor='hotpink'}: BoxTensorProps) {
    if (typeof gap === 'number') {
        gap = [gap, gap, gap];
    }

    const boxes = [];

    const tensorHeight = dims[0] * boxScale + (dims[0] - 1) * gap[0];
    const tensorWidth = dims[1] * boxScale + (dims[1] - 1) * gap[1];
    const tensorDepth = dims[2] * boxScale + (dims[2] - 1) * gap[2];

    for (let i = 0; i < dims[0]; i++) {  // rows
        for (let j = 0; j < dims[1]; j++) {  // cols
            for (let k = 0; k < dims[2]; k++) {  // depth
                const x = position[0] + j * (gap[0] + boxScale) - tensorWidth / 2;
                const y = position[1] + i * (gap[1] + boxScale) - tensorHeight / 2;
                const z = position[2] + k * (gap[2] + boxScale) - tensorDepth / 2;

                boxes.push(
                    <Box position={[x, y, z]} scale={boxScale} color={color} hoverColor={hoverColor}/>
                );
            }
        }
    }


    return(
        <group>
            {boxes}
        </group>    )
}

function Result({dim, inputDim}: {dim: number, inputDim: number}) {
    return(
        <>
            <BoxTensor dims={[1, 1, inputDim]} position={[-8, -3, 0]} gap={[0.2, 0.2, 1]} color='red' />
            <Text position={[-7, -3.5, 0]} color="black" > [ </Text>
            <Text position={[-5, -3.5, 0]} color="black" > ] </Text>
            <Box position={[-5.9, -3.4, 0]} scale={0.7} color='blue' />
            <Text position={[-4, -3.5, 0]} color="black" > {'->'} </Text>
            <Box position={[-2.5, -3.5, 0]} scale={1} color='green' />
        </>
    )
}


export default function TGather({dim=0}: {dim: number}) {
    let inputHighlighType;

    const [inputColHighlight, setInputColHighlight] = useState(new MatrixColHighlight(-1));
    const [inputRowHighlight, setInputRowHighlight] = useState(new MatrixRowHighlight(-1));
    const [indexHighligh, setIndexHighlight] = useState(new MatrixIndexHighlight(-1, -1));

    const [resultHighlight, setResultHighlight] = useState(new MatrixIndexHighlight(-1, -1));

    const highlighters: {highlight: MatrixHighlight, setHighlight: (highlight: MatrixHighlight) => void}[] = [
        {highlight: inputColHighlight, setHighlight: setInputColHighlight as (highlight: MatrixHighlight) => void},
        {highlight: inputRowHighlight, setHighlight: setInputRowHighlight as (highlight: MatrixHighlight) => void},
        {highlight: indexHighligh, setHighlight: setIndexHighlight as (highlight: MatrixHighlight) => void},
        {highlight: resultHighlight, setHighlight: setResultHighlight as (highlight: MatrixHighlight) => void},
    ];

    // dim == 0
    const inputRows = 4;
    const inputCols = 3;


    let inputDim;
    let inputHighlight
    let indexRows;
    let indexCols;
    if (dim === 0) {
        inputDim = inputRows;
        inputHighlight = inputColHighlight;
        indexRows = 2;
        indexCols = 3;
    } else {
        inputDim = inputCols;
        inputHighlight = inputRowHighlight;
        indexRows = 4;
        indexCols = 2;
    }

    return (
        <>
            <BoxMatrix position={leftMat} rows={inputRows} cols={inputCols} color='grey' matrixHighlight={inputHighlight} highlightColor='red' />
            <Text position={[-4, 1, 0]} color="black" > x </Text>

            <BoxMatrix position={midMat} rows={indexRows} cols={indexCols} color='grey' matrixHighlight={indexHighligh} highlightColor='blue' />
            <Text position={[3.5, 1, 0]} color="black" > = </Text>
            <SelectorBoxMatrix position={rightMat} rows={indexRows} cols={indexCols} color='grey' matrixHighlight={resultHighlight} highlighters={highlighters} highlightColor='green' />
            <Result dim={dim} inputDim={inputDim} />
        </>
    );
}