import React, { useState } from 'react';
import { Text } from '@react-three/drei'
import { TextureLoader } from 'three';
import SigmaTexture from 'images/Unknown.png';
import Box from 'components/Box';
import { BoxMatrix, MatrixColHighlight, MatrixHighlight, MatrixIndexHighlight, MatrixRowHighlight, SelectorBoxMatrix } from 'components/BoxMatrix';
import { gap2d, leftMat, midMat, rightMat } from 'helpers/constants';

function Result() {
    const sigma = new TextureLoader().load(SigmaTexture);

    const left = -5;
    const top = -5;

    return (
        <>
            <Text position={[left, top+2, 0]} fontSize={0.5} font="Roboto" color="black" > where </Text>
            <Box position={[left, top, 0]} color={'green'} hoverColor={'green'} />
            <Text position={[left+1.2, top, 0]} color="black" > = </Text>
            <mesh
                position={[left+2.4, top, 0]}>
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <meshBasicMaterial attach="material" map={sigma} toneMapped={false} />
            </mesh>
            <Text position={[left+2.4, top-1, 0]} color="black" fontSize={0.5} > i </Text>

            <Box position={[left + 4, top, 0]} color={'red'} hoverColor={'red'} />
            <Text position={[left + 4.6, top - 0.5, 0]} color="black" fontSize={0.5} > i </Text>
            <Text position={[left + 5.3, top, 0]} color="black" > x </Text>
            <Box position={[left + 6.8, top, 0]} color={'blue'} hoverColor={'blue'} />
            <Text position={[left + 7.4, top - 0.5, 0]} color="black" fontSize={0.5} > i </Text>

        </>
    )
}

export default function TMatMul() {
    const [matrixRowHighlight, setMatrixRowHighlight] = useState(new MatrixRowHighlight(1));
    const [matrixColHighlight, setMatrixColHighlight] = useState(new MatrixColHighlight(1));
    const [matrixIndexHighlight, setMatrixIndexHighlight] = useState(new MatrixIndexHighlight(1, 1));

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
            <Text position={[-11, 1, 0]} color="black" font='Roboto' fontSize={0.5} > torch.matmul </Text>
            <Text position={[-9.3, 1, 0]} color="black" font='Roboto' fontSize={3} > ( </Text>
            <BoxMatrix position={leftMat} gap={gap2d} rows={firstRows} cols={firstCols} color='grey' matrixHighlight={matrixRowHighlight} highlightColor='red' />
            <Text position={[-2.8, 1, 0]} color="black" fontSize={2} > , </Text>
            <BoxMatrix position={midMat} gap={gap2d} rows={secondRows} cols={secondCols} color='grey' matrixHighlight={matrixColHighlight} highlightColor='blue' />
            <Text position={[2.3, 1, 0]} color="black" font='Roboto' fontSize={3} > ) </Text>

            <Text position={[4, 1, 0]} fontSize={1.1} color="black" > {"->"} </Text>
            <SelectorBoxMatrix position={rightMat}gap={gap2d}  rows={resultRows} cols={resultCols} color='grey' matrixHighlight={matrixIndexHighlight} highlighters={highlighters} highlightColor='green' />


            {/* <Text position={[-8.4, 4, 0]} color="black" font='Roboto' fontSize={1}> input  </Text>
            <BoxMatrix position={[-7, 1, 0]} gap={gap2d} rows={firstRows} cols={firstCols} color='grey' matrixHighlight={matrixRowHighlight} highlightColor='red' />

            <Text position={[-0.8, 4, 0]} color="black" font='Roboto' fontSize={1}> other  </Text>
            <BoxMatrix position={midMat} gap={gap2d} rows={secondRows} cols={secondCols} color='grey' matrixHighlight={matrixColHighlight} highlightColor='blue' />

            <Text position={[4, 1, 0]} fontSize={1.1} color="black" > {"->"} </Text>
            <SelectorBoxMatrix position={rightMat}gap={gap2d}  rows={resultRows} cols={resultCols} color='grey' matrixHighlight={matrixIndexHighlight} highlighters={highlighters} highlightColor='green' /> */}

            <Result />
        </>
    );
}