import React from 'react';
import PageSkeleton from 'partials/page/PageSkeleton';
import { Canvas } from '@react-three/fiber';

export default function VizPageSkeleton({children}: {children: React.ReactNode|React.ReactNode[]}) {
    return (
        <PageSkeleton>
            <div className="border-2 border-red-500 h-[400px] w-full container relative">
                <Canvas
                    // orthographic camera={{ zoom: 30, position: [0, 0, 100]}}
                    camera={{ position: [0, 0, 60], fov: 10 }}
                    >
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {children}
                </Canvas>
            </div>
        </PageSkeleton>
    );
}