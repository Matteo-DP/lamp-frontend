import React, { useState, useEffect } from 'react';

import TimeGraph from '../components/TimeGraph';

import { getState, getToggle } from "../services/LampService";
import { deltaTime, parseTime } from '../services/TimeService';

export default function Template() {

    const [state, setState] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        getState()
            .then((res) =>
                setState(res)
            )
            .finally(() =>
                setLoading(false)
            )
    }, [])

    const toggle = async () => {
        setLoading(true)
        await getToggle();
        getState()
            .then((res) =>
                setState(res)
            )
            .finally(() =>
                setLoading(false)
            )
    }

    if(loading) {
        return(
            "Loading..."
        )
    } else {

        const time = parseTime(state.log.timestamp);
        const delta = deltaTime(state.log.timestamp);

    return(
        <main className='p-8 bg-neutral-50'>

            <h1
                className='text-2xl'
            >
                Dashboard
            </h1>

            <div
                className='mt-4 max-w-3xl mx-auto'
            >

                <div
                    className='flex flex-row justify-between gap-8'
                >

                    <div className={`${ state.state ? "bg-green-400" : "bg-red-400"} rounded-3xl shadow-xl p-8 w-full h-48 flex flex-col justify-between ease-in-out duration-200`}>
                        <p
                            className='text-xl text-center'
                        >
                            { state.state ? "ON" : "OFF" }
                        </p>
                        <button
                            className='bg-blue-400 hover:bg-blue-500 text-white rounded-xl px-4 py-2'
                            onClick={() => toggle()}
                        >
                            Toggle
                        </button>
                    </div>

                    <div className='bg-neutral-100 rounded-3xl shadow-xl p-8 w-full h-48 flex flex-col justify-between'>
                        <p
                            className='text-neutral-600'
                        >
                            Last toggle:
                        </p>
                        <div>
                            <p
                                className='text-2xl inline-block'
                            >
                                { delta.delta }
                            </p>
                            <p 
                                className='inline-block ml-2'
                            >
                                { delta.str } ago
                            </p>
                        </div>
                    </div>
                    <div className='bg-neutral-100 rounded-3xl shadow-xl p-8 w-full h-48 flex flex-col justify-between'>
                        <p
                            className='text-neutral-600'
                        >
                            { time.date }
                        </p>
                        <p
                            className='text-xl'
                        >
                            { time.time }
                        </p>
                    </div>

                </div>

                <TimeGraph />

            </div>

        </main>
    )

    }

}