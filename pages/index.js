import React, { useEffect, useState } from 'react';

import { getDevData, getData, getToggle, getDevPlt, getPlt, getState } from '../services/LampService';

export default function Index() {

    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)

    const [plt, setPlt] = useState(undefined);
    const [pltLoading, setPltLoading] = useState(true)

    const [toggle, setToggle] = useState(undefined)
    const [toggleLoading, setToggleLoading] = useState(false)

    const [state, setState] = useState(undefined)
    const [stateLoading, setStateLoading] = useState(true)
    const [stateRefreshKey, setstateRefreshKey] = useState(0)

    const [refreshKey, setRefreshKey] = useState(0)


    useEffect(() => {
        getData()
            .then((res) =>
                setData(res)
            )
            .finally(() =>
                setLoading(false)
        )
        getState()
            .then((res) =>
                setState(res)
            )
            .finally(
                setStateLoading(false)
        )
        getDevPlt()
            .then((res) =>
                setPlt(res))
            .finally(() => 
                setPltLoading(false)
        )
    }, [refreshKey])

    const parseTime = (date) => {
        var parsedDate = {}
        const dateFormat =  new Date(date * 1000);
        parsedDate.date = dateFormat.getDate()+
            "/"+(dateFormat.getMonth() + 1)+
            "/"+dateFormat.getFullYear();

        parsedDate.time = dateFormat.getHours()+
            ":"+dateFormat.getMinutes();

        return parsedDate;
    }

    const toggleLights = async () => {
        setToggleLoading(true);
        const res = await getToggle();
        setToggle(res);
        setToggleLoading(false);
        refreshState()
    }

    const refreshState = async () => {
        const res = await getState();
        setState(res);
        refreshData()
    }

    const refreshData = async () => {
        const res = await getData();
        setData(res);
    }

    const deltaTime = (timestamp) => {
        const date1 = new Date(timestamp * 1000)
        const date2 = new Date()
        const diff = date2 - date1
        return Math.round(diff / 36e5 * 10) / 10
    }

    if(loading) {
        return(
            <h1>Connecting...</h1>
        )
    } else {
        const time = parseTime(data.data[data.data.length - 1].timestamp)
        return(
            <main
                className='w-full h-screen p-8'
            >

                <h3 className='text-3xl mb-8'>Lamp Dashboard</h3>

                <div className='flex flex-row gap-8 justify-start mb-8'>

                    <div className={`${state.state ? 'bg-green-400' : 'bg-red-400'} rounded-3xl p-8 shadow-lg border-2 h-48 w-48 flex flex-col justify-between gap-4`}>
                        <p className='text-center'>
                            {state.state ? " ON" : " OFF"}
                        </p>
                        <button
                            onClick={() => toggleLights()}
                            className="mt-4 bg-blue-500 text-neutral-200 px-4 py-2 rounded-lg hover:bg-blue-400"
                        >
                            Toggle
                        </button>
                    </div>

                    <div className='bg-neutral-200 rounded-3xl p-8 shadow-lg border-2 h-48 w-48'>
                        <p>Last toggle:</p>
                        <p className='mt-16 text-2xl'>{deltaTime(data.data[data.data.length - 1].timestamp)} 
                            <p className='text-sm inline ml-2'>hours ago</p>
                        </p>
                    </div>

                    <div className='bg-neutral-200 rounded-3xl p-8 shadow-lg border-2 h-48 w-48'>
                        <p>{time.date}</p>
                        <p className='mt-16 text-xl'>{time.time}</p>
                    </div>

                </div>

                <div
                    className='bg-neutral-200 rounded-3xl shadow-lg border-2 p-8 w-max'
                >
                    <h3 className='text-xl mb-2'>Time Graphing</h3>
                    {pltLoading ?
                        <p>Loading graphs...</p>
                        :
                        <div>
                            <p className='text-2xl text-center mb-4'>{plt.month}/{plt.day}</p>

                            <img src={plt.src} alt="time graph" />
                        </div>
                    }
                </div>

            </main>
        )
    }
}