import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-blue-200 sticky left-0 top-0 right-0 h-20 justify-start flex items-center">
            <nav className="border-2 border-red-200 flex flex-row items-center gap-8">
                <h1 className="font-bold text-lg"> <Link to='/'> TorchViz </Link> </h1>
                <span> Menu Item </span>
            </nav>
        </header>
    );
}