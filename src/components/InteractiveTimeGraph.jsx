import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar } from 'recharts';
import React, {useEffect, useState} from 'react';
import { getGraphData } from '../services/LampService';

export default function InteractiveTimeGraph() {

    const [graphTime, setGraphTime] = useState({
        day: (new Date()).getDate(),
        month: (new Date()).getMonth() + 1 // getMonth is 0 index based
    })
    const [graphData, setGraphData] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getGraphData({
            day: graphTime.day,
            month: graphTime.month
        })
            .then(res => setGraphData(res))
            .finally(() => setLoading(false))
    }, [])

    if(!loading) {
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
                        // Add onclick event
                    >
                        <i className="fa-solid fa-chevron-left fa-xl"></i>
                    </button>
                    <p
                        className='text-center text-2xl'
                    >
                        { graphTime.day } / { graphTime.month }
                    </p>
                    <button
                        // Add onclick event
                    >
                        <i 
                        // ${date.date() == moment().date() && "invisible"} Make chevron invisible if date equals current date
                        className={`fa-solid fa-chevron-right fa-xl`}></i>
                    </button>
                </div>
            </div>

            <div className='mt-4' 
            // Properly center item !!
            >
                <BarChart width={730} height={350} data={graphData.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour"/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
            </div>

        </div>
        )
    }
}