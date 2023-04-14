import React from 'react';
import PageSkeleton from 'partials/page/PageSkeleton';

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
        <PageSkeleton>
            <Body/>
        </PageSkeleton>
    );
}