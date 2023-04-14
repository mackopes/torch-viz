import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { TextureLoader } from 'three';
import SigmaTexture from 'images/Unknown.png';


interface BoxProps {
    position: [number, number, number];
    color?: string;
    hoverColor?: string;
    onSelect?: () => void;
    moving?: boolean;
}

function Box({position, color='orange', hoverColor='hotpink', onSelect=() => {}, moving=true}: BoxProps) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    const rotationDamping = 0.2;

    useFrame((state, delta) => {
        // current pointer position
        const pointer = state.pointer;
        // rotate the cube sligtly towards the pointer

        if (moving) {
            mesh.current.rotation.y = pointer.x * rotationDamping;
            mesh.current.rotation.x = -pointer.y * rotationDamping;
        }

    })
    return (
        <mesh position={position}
              ref={mesh}
              onClick={(event) => onSelect()}
              onPointerOver={(event) => setHover(true)}
              onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? hoverColor : color} />
        </mesh>
    )
}

class MatrixHighlight {
    shouldHighlight(i: number, j: number): boolean {
        return false;
    }

    getOnSelect(i: number, j: number): () => void {
        return () => {};
    }

    getNewHighlight(i: number, j: number): MatrixHighlight {
        return new MatrixHighlight();
    }
}

class MatrixRowHighlight extends MatrixHighlight {
    private row: number;

    constructor(row: number) {
        super();
        this.row = row;
    }

    shouldHighlight(i: number, j: number): boolean {
        return i === this.row;
    }

    getOnSelect(i: number, j: number): () => void {
        return () => {
            this.row = i;
        };
    }

    getNewHighlight(i: number, j: number): MatrixRowHighlight {
        return new MatrixRowHighlight(i);
    }
}

class MatrixColHighlight extends MatrixHighlight {
    private col: number;

    constructor(col: number) {
        super();
        this.col = col;
    }

    shouldHighlight(i: number, j: number): boolean {
        return j === this.col;
    }

    getOnSelect(i: number, j: number): () => void {
        return () => {
            this.col = j;
        };
    }

    getNewHighlight(i: number, j: number): MatrixColHighlight {
        return new MatrixColHighlight(j);
    }

}

class MatrixIndexHighlight extends MatrixHighlight {
    private i: number;
    private j: number;

    constructor(i: number, j: number) {
        super();
        this.i = i;
        this.j = j;
    }

    shouldHighlight(i: number, j: number): boolean {
        return i === this.i && j === this.j;
    }

    getOnSelect(i: number, j: number): () => void {
        return () => {
            this.i = i;
            this.j = j;
        };
    }

    getNewHighlight(i: number, j: number): MatrixIndexHighlight {
        return new MatrixIndexHighlight(i, j);
    }
}

interface BoxMatrixProps {
    cols?: number;
    rows?: number;
    initialPosition?: [number, number, number];
    offset?: number;
    color?: string;
    hoverColor?: string;
    highlightColor?: string;
    matrixHighlight?: MatrixHighlight;
}

interface SelectorBoxMatrixProps extends BoxMatrixProps {
    highlighters: {highlight: MatrixHighlight, setHighlight: (highlight: MatrixHighlight) => void}[];
}

function SelectorBoxMatrix({
        cols = 4,
        rows = 3,
        initialPosition = [-10, 0, 0],
        offset = 1.5,
        color = 'orange',
        hoverColor='hotpink',
        highlightColor = 'hotpink',
        matrixHighlight = new MatrixHighlight(),
        highlighters = [],

    }:
    SelectorBoxMatrixProps) {

    const boxes = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = initialPosition[0] + j * offset;
            const y = initialPosition[1] + i * offset;
            const z = initialPosition[2];
            const shouldHighlight = matrixHighlight.shouldHighlight(i, j);

            const selectCallback = () => {
                console.log("selectCallback")
                for (const highlighter of highlighters) {
                    highlighter.setHighlight(highlighter.highlight.getNewHighlight(i, j));
                }
            };

            if (shouldHighlight) {
                boxes.push(<Box position={[x, y, z]} color={highlightColor} hoverColor={hoverColor} onSelect={() => selectCallback()}/>);
            } else {
                boxes.push(<Box position={[x, y, z]} color={color} hoverColor={hoverColor} onSelect={() => selectCallback()}/>);
            }

        }
    }

    return (
        <group>
            {boxes}
        </group>
    );
}

function BoxMatrix({
    cols = 4,
    rows = 3,
    initialPosition = [-10, 0, 0],
    offset = 1.5,
    color = 'orange',
    hoverColor='hotpink',
    highlightColor = 'hotpink',
    matrixHighlight = new MatrixHighlight(),
}: BoxMatrixProps) {
    const boxes = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = initialPosition[0] + j * offset;
            const y = initialPosition[1] + i * offset;
            const z = initialPosition[2];
            const shouldHighlight = matrixHighlight.shouldHighlight(i, j);

            if (shouldHighlight) {
                boxes.push(<Box position={[x, y, z]} color={highlightColor} hoverColor={hoverColor} />);
            } else {
                boxes.push(<Box position={[x, y, z]} color={color} hoverColor={hoverColor}/>);
            }
        }
    }

    return (
        <group>
            {boxes}
        </group>
    );
}

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
        <div className="border-2 border-red-500 h-[400px] w-full container relative">
            <Canvas
                // orthographic camera={{ zoom: 30, position: [0, 0, 100]}}
                camera={{ position: [0, 0, 60], fov: 10 }}
                >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <BoxMatrix initialPosition={[-11, -1, 0]} rows={firstRows} cols={firstCols} color='grey' matrixHighlight={matrixRowHighlight} highlightColor='red' />
                <Text position={[-4, 1, 0]} color="black" > x </Text>

                <BoxMatrix initialPosition={[-2, -1, 0]} rows={secondRows} cols={secondCols} color='grey' matrixHighlight={matrixColHighlight} highlightColor='blue' />
                <Text position={[3.5, 1, 0]} color="black" > = </Text>
                <SelectorBoxMatrix initialPosition={[6, -1, 0]} rows={resultRows} cols={resultCols} color='grey' matrixHighlight={matrixIndexHighlight} highlighters={highlighters} highlightColor='green' />

                <Result />
            </Canvas>
        </div>
    );
}