import React from 'react';
import Box from 'components/Box';

export class MatrixHighlight {
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

export class MatrixRowHighlight extends MatrixHighlight {
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

export class MatrixColHighlight extends MatrixHighlight {
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

export class MatrixIndexHighlight extends MatrixHighlight {
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
    position?: [number, number, number];
    boxScale?: number;
    gap?: number;
    color?: string;
    hoverColor?: string;
    highlightColor?: string;
    matrixHighlight?: MatrixHighlight;
}

interface SelectorBoxMatrixProps extends BoxMatrixProps {
    highlighters: {highlight: MatrixHighlight, setHighlight: (highlight: MatrixHighlight) => void}[];
}

export function SelectorBoxMatrix({
        cols = 4,
        rows = 3,
        position = [0, 0, 0],
        boxScale = 1,
        gap = 0.5,
        color = 'orange',
        hoverColor='hotpink',
        highlightColor = 'hotpink',
        matrixHighlight = new MatrixHighlight(),
        highlighters = [],

    }:
    SelectorBoxMatrixProps) {

    const boxes = [];

    const matWidth = cols * boxScale + (cols - 1) * gap;
    const matHeight = rows * boxScale + (rows - 1) * gap;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = position[0] + j * (gap + boxScale) - matWidth / 2 + boxScale / 2;
            const y = position[1] + i * (gap + boxScale) - matHeight / 2 + boxScale / 2;
            const z = position[2];
            const shouldHighlight = matrixHighlight.shouldHighlight(i, j);

            const selectCallback = () => {
                console.log("selectCallback")
                for (const highlighter of highlighters) {
                    highlighter.setHighlight(highlighter.highlight.getNewHighlight(i, j));
                }
            };

            if (shouldHighlight) {
                boxes.push(<Box position={[x, y, z]} scale={boxScale} color={highlightColor} hoverColor={hoverColor} onSelect={() => selectCallback()}/>);
            } else {
                boxes.push(<Box position={[x, y, z]} scale={boxScale} color={color} hoverColor={hoverColor} onSelect={() => selectCallback()}/>);
            }

        }
    }

    return (
        <group>
            {boxes}
        </group>
    );
}

export function BoxMatrix({
    cols = 4,
    rows = 3,
    position = [0, 0, 0],
    boxScale = 1,
    gap = 0.5,
    color = 'orange',
    hoverColor='hotpink',
    highlightColor = 'hotpink',
    matrixHighlight = new MatrixHighlight(),
}: BoxMatrixProps) {
    const matWidth = cols * boxScale + (cols - 1) * gap;
    const matHeight = rows * boxScale + (rows - 1) * gap;

    const boxes = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = position[0] + j * (gap + boxScale) - matWidth / 2 + boxScale / 2;
            const y = position[1] + i * (gap + boxScale) - matHeight / 2 + boxScale / 2;
            const z = position[2];
            const shouldHighlight = matrixHighlight.shouldHighlight(i, j);

            if (shouldHighlight) {
                boxes.push(<Box position={[x, y, z]} scale={boxScale} color={highlightColor} hoverColor={hoverColor} />);
            } else {
                boxes.push(<Box position={[x, y, z]} scale={boxScale} color={color} hoverColor={hoverColor}/>);
            }
        }
    }

    return (
        <group>
            {boxes}
        </group>
    );
}