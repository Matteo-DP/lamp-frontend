import React from "react";

export default function Header() {
    return(
    <header
        className="py-6 px-8 bg-bgdark"
    >
        <li
            className="flex flex-row justify-between"
        >
            <ul className="text-textlight font-medium text-xl">
                Lamp Dashboard
            </ul>
            <ul>
                <a className="text-textlight font-medium text-lg" href="https://github.com/Matteo-DP" target={"_blank"}>
                    Github
                </a>
            </ul>
        </li>
    </header>
    )
}