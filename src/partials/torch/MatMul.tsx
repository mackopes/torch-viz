import React, { useState } from 'react';
import { Text } from '@react-three/drei'
import { TextureLoader } from 'three';
import SigmaTexture from 'images/Unknown.png';
import Box from 'components/Box';
import { BoxMatrix, MatrixColHighlight, MatrixHighlight, MatrixIndexHighlight, MatrixRowHighlight, SelectorBoxMatrix } from 'components/BoxMatrix';
import { leftMat, midMat, rightMat } from 'helpers/constants';

function Result() {
    const sigma = new TextureLoader().load(SigmaTexture);

    return (
        <>
            <Box position={[-7, -3, 0]} color={'green'} hoverColor={'green'} moving={false}/>
            <Text position={[-5, -3, 0]} color="black" > = </Text>
            <mesh
                position={[-3, -3, 0]}>
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <meshBasicMaterial attach="material" map={sigma} toneMapped={false} />
            </mesh>
            <Text position={[-3, -4, 0]} color="black" fontSize={0.5} > i </Text>

            <Box position={[0, -3, 0]} color={'red'} hoverColor={'red'} moving={false}/>
            <Text position={[0.6, -3.5, 0]} color="black" fontSize={0.5} > i </Text>
            <Text position={[2, -3, 0]} color="black" > x </Text>
            <Box position={[4, -3, 0]} color={'blue'} hoverColor={'blue'} moving={false}/>
            <Text position={[4.6, -3.5, 0]} color="black" fontSize={0.5} > i </Text>

        </>
    )
}

export default function TMatMul() {
    const [matrixRowHighlight, setMatrixRowHighlight] = useState(new MatrixRowHighlight(-1));
    const [matrixColHighlight, setMatrixColHighlight] = useState(new MatrixColHighlight(-1));
    const [matrixIndexHighlight, setMatrixIndexHighlight] = useState(new MatrixIndexHighlight(-1, -1));

    const highlighters: {highlight: MatrixHighlight, setHighlight: (highlight: MatrixHighlight) => void}[] = [
        {highlight: matrixRowHighlight, setHighlight: setMatrixRowHighlight as (highlight: MatrixHighlight) => void},
        {highlight: matrixColHighlight, setHighlight: setMatrixColHighlight as (highlight: MatrixHighlight) => void},
        {highlight: matrixIndexHighlight, setHighlight: setMatrixIndexHighlight as (highlight: MatrixHighlight) => void},
    ];

    const firstRows = 3;
    const firstCols = 4;
    const secondRows = firstCols;
    const secondCols = 3;

    const resultRows = firstRows;
    const resultCols = secondCols;

    return (
        <>
            <BoxMatrix position={leftMat} rows={firstRows} cols={firstCols} color='grey' matrixHighlight={matrixRowHighlight} highlightColor='red' />
            <Text position={[-4, 1, 0]} color="black" > x </Text>

            <BoxMatrix position={midMat} rows={secondRows} cols={secondCols} color='grey' matrixHighlight={matrixColHighlight} highlightColor='blue' />
            <Text position={[3.5, 1, 0]} color="black" > = </Text>
            <SelectorBoxMatrix position={rightMat} rows={resultRows} cols={resultCols} color='grey' matrixHighlight={matrixIndexHighlight} highlighters={highlighters} highlightColor='green' />

            <Result />
        </>
    );
}