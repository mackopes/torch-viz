import React from 'react';
import PageSkeleton from 'partials/page/PageSkeleton';
import { Canvas } from '@react-three/fiber';
import { cameraPos } from 'helpers/constants';

export default function CanvasSkeleton({children}: {children: React.ReactNode|React.ReactNode[]}) {
    return (
        <div className="border-2 border-red-500 h-[400px] w-full container relative">
            <Canvas
                // orthographic camera={{ zoom: 30, position: [0, 0, 100]}}
                camera={{ position: cameraPos, fov: 10 }}
                >
                <ambientLight />
                <pointLight position={[0, -5, 5]} castShadow />
                <pointLight position={[5, 5, -5]}  />

                {children}
            </Canvas>
        </div>
    );
}