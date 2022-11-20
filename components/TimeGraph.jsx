import React, { useState, useEffect } from "react";
import { getPlt } from "../services/LampService";
import config from "../config.json";

export default function TimeGraph() {

    const [date, setDate] = useState({ day:(new Date()).getDate(), month: (new Date().getMonth() + 1) });
    const [plt, setPlt] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlt({
            day: date.day,
            month: date.month
        })
            .then((res) => 
                setPlt(res)
            )
            .finally(() =>
                setLoading(true)
            )
    }, [])

    return(
        <div
        className='mt-8 rounded-3xl shadow-xl p-8 w-full'
        >
            <div
                className='mb-4'
            >
                <h1
                    className='text-xl'
                >
                    Time graph
                </h1>
                <p
                    className='text-center text-2xl'
                >
                    16/11
                </p>
            </div>

            {loading ? 

            <div role="status" className="p-4 max-w-[640px] max-h-[480px] rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                <div className="flex h items-baseline mt-4 space-x-6">
                    <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>

            :

            <img src={config.api.url + config.api.handle.img + "?" + String(Math.random() * 100)}
            alt="graph"
            className='mx-auto'
            />

            }

        </div>
    )
}