import { AreaChart, XAxis, Tooltip, Legend, Area, Label } from 'recharts';
import React from 'react';

export default function InteractiveTimeGraph({ graphData, width, height, loading}) {

    if(!loading) {
        return(
            <AreaChart width={width} height={height} data={graphData.data}>
                <XAxis dataKey="day">
                    <Label value="Day of the month" offset={-6} position="insideBottomLeft" />
                </XAxis>
                <Tooltip formatter={(value, name, props) => Math.round(value * 10)/10}/>
                <Legend />
                <Area dataKey="hours" fill="#8884d8" />
            </AreaChart>
        )
    }
}