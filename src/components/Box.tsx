import React from 'react';
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react';
import { cameraPos } from 'helpers/constants';
import { Vector3 } from 'three';

interface BoxProps {
    position: [number, number, number];
    scale?: number;
    color?: string;
    hoverColor?: string;
    onSelect?: () => void;
    moving?: boolean;
}

export default function Box({position, scale=1, color='orange', hoverColor='hotpink', onSelect=() => {}, moving=true}: BoxProps) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    const rotationDamping = 0.2;
    const boxLookAt = new Vector3(cameraPos[0], cameraPos[1], cameraPos[2]);

    useFrame((state, delta) => {
        // current pointer position
        const pointer = state.pointer;
        // rotate the cube sligtly towards the pointer

        if (moving) {
            mesh.current.lookAt(boxLookAt);

            mesh.current.rotation.y += pointer.x * rotationDamping;
            mesh.current.rotation.x += -pointer.y * rotationDamping;
        }
    })

    return (
        <mesh position={position}
              scale={scale}
              ref={mesh}
              onClick={(event) => onSelect()}
              onPointerOver={(event) => setHover(true)}
              onPointerOut={(event) => setHover(false)}
              >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? hoverColor : color} metalness={0.1} roughness={0.5} />
        </mesh>
    )
}