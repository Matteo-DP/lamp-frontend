import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {

    const { currentUser } = useAuth()

    return(
        <div className="h-[77px] bg-bgdark">
            <header
                className="py-6 px-8 bg-bgdark fixed w-full z-10"
            >
                <li
                    className="flex flex-row justify-between"
                >
                    <div>
                        <ul className="text-textlight font-medium inline text-xl mr-4">
                            Lamp Dashboard
                        </ul>
                        <a className="text-textlight font-medium inline text-lg" href="https://github.com/Matteo-DP" target={"_blank"}>
                            Github
                        </a>
                    </div>
                    <ul>
                        {currentUser &&
                            <>
                                <p className="text-textlight inline mr-4">{currentUser.email}</p>
                                <a href="/logout" className="inline mr-4 font-medium text-lg text-textlight">
                                    Logout
                                </a>
                            </>
                        }
                    </ul>
                </li>
            </header>
        </div>
    )
}