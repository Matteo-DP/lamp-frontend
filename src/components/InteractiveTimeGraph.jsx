import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar } from 'recharts';
import React from 'react';

export default function InteractiveTimeGraph({ graphData, width, height, loading }) {

    if(!loading) {
        return(
            <BarChart width={width} height={height} data={graphData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minutes" fill="#8884d8" />
            </BarChart>
        )
    }
}