import React, { useState } from "react";
import { BoxMatrix, MatrixColHighlight, MatrixHighlight, MatrixIndexHighlight, MatrixRowHighlight, SelectorBoxMatrix } from "components/BoxMatrix";
import { Text } from '@react-three/drei';
import { leftMat, midMat, rightMat } from "helpers/constants";

export default function TGather({dim=0}: {dim?: number}) {
    let inputHighlighType;

    if (dim === 0) {
        inputHighlighType = MatrixColHighlight;
    } else {
        inputHighlighType = MatrixRowHighlight;
    }

    const [inputHighlight, setInputHighlight] = useState(new inputHighlighType(-1));
    const [indexHighligh, setIndexHighlight] = useState(new MatrixIndexHighlight(-1, -1));

    const [resultHighlight, setResultHighlight] = useState(new MatrixIndexHighlight(-1, -1));

    const highlighters: {highlight: MatrixHighlight, setHighlight: (highlight: MatrixHighlight) => void}[] = [
        {highlight: inputHighlight, setHighlight: setInputHighlight as (highlight: MatrixHighlight) => void},
        {highlight: indexHighligh, setHighlight: setIndexHighlight as (highlight: MatrixHighlight) => void},
        {highlight: resultHighlight, setHighlight: setResultHighlight as (highlight: MatrixHighlight) => void},
    ];

    // dim == 0
    const inputRows = 4;
    const inputCols = 3;

    const indexRows = 2;
    const indexCols = 3;

    return (
        <>
            <BoxMatrix position={leftMat} rows={inputRows} cols={inputCols} color='grey' matrixHighlight={inputHighlight} highlightColor='red' />
            <Text position={[-4, 1, 0]} color="black" > x </Text>

            <BoxMatrix position={midMat} rows={indexRows} cols={indexCols} color='grey' matrixHighlight={indexHighligh} highlightColor='blue' />
            <Text position={[3.5, 1, 0]} color="black" > = </Text>
            <SelectorBoxMatrix position={rightMat} rows={indexRows} cols={indexCols} color='grey' matrixHighlight={resultHighlight} highlighters={highlighters} highlightColor='green' />
        </>
    );
}