import React, { useState, useEffect } from "react";
import { getPlt } from "../services/LampService";
import config from "../../config.json";
import moment from "moment";

export default function TimeGraph() {

    const [date, setDate] = useState(moment());
    const [plt, setPlt] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        console.log("reload effect");
        setLoading(true);
        getPlt({
            day: date.date(),
            month: date.month() + 1
        })
            .then((res) => 
                setPlt(res)
            )
            .finally(() =>
                setLoading(false)
            )
    }, [refreshKey]);

    function Skeleton() {
        return(
            <div role="status" className="mx-auto mt-4 p-4 w-[640px] h-[480px] rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                <div className="flex h-full items-end mt-4 space-x-6">
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
        )
    }

    function Image() {
        if(plt.status != "ok") return "Empty plot"

        return(
            <>
                <img 
                    src={config.api.url + config.api.handle.img + "?" + new URLSearchParams({
                        day: plt.day,
                        month: plt.month
                    }) + "&" + String(Math.random() * 100)} // Append random string to prevent image caching
                    alt="graph"
                    className='mx-auto mt-4'
                />
                <p
                    className="mt-2 text-neutral-400"
                >
                    Generated in { plt.execution } s
                </p>
            </>
        )
    }

    const updateDate = (increment) => {
        if(increment == "+") {
            setDate(date.add(1, "days"));
        } else {
            setDate(date.subtract(1, "days"));
        }
        setRefreshKey(refreshKey + 1);
    }

    return(
        <div
        className='mt-8 rounded-3xl shadow-xl p-8'
        >
            <div
                className='mb-4'
            >
                <h1
                    className='text-xl mb-2'
                >
                    Time graph
                </h1>
                <div
                    className="flex flex-row justify-between"
                >
                    <button
                        onClick={() => updateDate("-")}
                    >
                        <i className="fa-solid fa-chevron-left fa-xl"></i>
                    </button>
                    <p
                        className='text-center text-2xl'
                    >
                        { date.date() } / { date.month() + 1 }
                    </p>
                    <button
                        onClick={() => updateDate("+")}
                    >
                        <i className={`fa-solid fa-chevron-right fa-xl ${date.date() == moment().date() && "invisible"}`}></i>
                    </button>
                </div>
            </div>

            { loading ? <Skeleton /> : <Image /> }

        </div>
    )
}