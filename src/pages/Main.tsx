import React from 'react';
import Header from 'partials/page/Header';
import Menu from 'partials/page/Menu';

function Body() {
    return (
        <main>
            <div>
                <h1> TorchViz </h1>
            </div>
            <span> hello </span>
        </main>
    )
}

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen w-full h-screen">
            <Header/>
            <div className="flex flex-row w-full h-full">
                <Menu/>
                <Body/>
            </div>
        </div>
    );
}