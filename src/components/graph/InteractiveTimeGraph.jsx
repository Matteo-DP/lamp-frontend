import { BarChart, XAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import React from 'react';

export default function InteractiveTimeGraph({ graphData, width, height, loading}) {

    if(!loading) {
        return(
            <BarChart width={width} height={height} data={graphData.data}>
                <XAxis dataKey="hour">
                    <Label value="Hour of the day" offset={-6} position="insideBottomLeft" />    
                </XAxis>
                <Tooltip formatter={(value, name, props) => Math.round(value * 10)/10} />
                <Legend />
                <Bar dataKey="minutes" fill="#8884d8" />
            </BarChart>
        )
    }
}