import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem({name, link}: {name: string, link: string}) {
    return (
        <Link to={link} className="text-gray-500 font-roboto"> {name} </Link>
    );
}

export default function Menu() {
    return (
        <div className="h-full container max-w-sm min-w-fit w-1/5 bg-gray-100">
            <h1 className="text-lg border-b-2"> Search button probably </h1>
            <div className="m-4">
                <ul className='list-none gap-1 flex flex-col' >
                    <li> <MenuItem name='matmul' link='/matmul'/> </li>
                    <li> <MenuItem name='gather' link='/gather'/> </li>
                </ul>
            </div>
        </div>
    );
}