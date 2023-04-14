import React from 'react';
import Header from 'partials/page/Header';
import Menu from 'partials/page/Menu';


export default function PageSkeleton({children}: {children: React.ReactNode|React.ReactNode[]}) {
    return (
        <div className="flex flex-col min-h-screen w-full h-screen">
            <Header/>
            <div className="flex flex-row w-full h-full">
                <Menu/>
                {children}
            </div>
        </div>
    );
}