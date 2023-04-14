import React from 'react';
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react';

interface BoxProps {
    position: [number, number, number];
    color?: string;
    hoverColor?: string;
    onSelect?: () => void;
    moving?: boolean;
}

export default function Box({position, color='orange', hoverColor='hotpink', onSelect=() => {}, moving=true}: BoxProps) {
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