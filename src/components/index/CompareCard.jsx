import React, {useState, useEffect} from "react";
import InteractiveTimeGraph from "../graph/InteractiveMonthlyGraph";
import { getGraphData } from "../../services/LampService";

export default function CompareCard({graphData}) {
    //TODO: implement react-datepicker

    const [compareButtonHovering, setCompareButtonHovering] = useState(false);
    const [compareGraphData, setCompareGraphData] = useState(undefined);
    const [compareGraphLoading, setCompareGraphLoading] = useState(true);
    const [compareGraphRefreshKey, setCompareGraphRefreshKey] = useState(0);

    const [compareGraphTime, setCompareGraphTime] = useState({
        day: (new Date()).getDate() - 1, // Default to yesterday
        month: (new Date()).getMonth() + 1 // getMonth is 0 index based
    });

    // Fetch compare graph data
    useEffect(() => {
        setCompareGraphLoading(true);
        getGraphData({
            day: compareGraphTime.day,
            month: compareGraphTime.month
        })
            .then(res => setCompareGraphData(res))
            .finally(() => setCompareGraphLoading(false))
    }, [compareGraphRefreshKey]);

    // Generate comparative percentage
    const comparePercentage = () => {
        const delta = compareGraphData.total_minutes - graphData.total_minutes
        const percentage = delta < 0 ?
            (graphData.total_minutes - compareGraphData.total_minutes) / graphData.total_minutes * 100
            :
            (graphData.total_minutes - compareGraphData.total_minutes) / compareGraphData.total_minutes * 100

        return {
            color: delta < 0 ? "accentgreen" : "accentred",
            delta: delta,
            percentage: Math.abs(Math.round(percentage)),
            operator: delta < 0 ? "-" : "+"
        }
    };

    if(!compareGraphLoading) {
        return(
            <div className="bg-bglight p-4 h-max mb-4 rounded-md w-max">
                <p className="text-textdark text-md mb-4"
                    onMouseOver={() => setCompareButtonHovering(true)}
                    onMouseOut={() => setCompareButtonHovering(false)}
                >
                    Compare to
                    <button className="text-accentpurple ml-2 inline border px-2 py-1 border-[#8884d8] rounded-lg">
                        <i class={`fa-solid fa-chevron-down mr-1 ease-in duration-75 ${compareButtonHovering && "scale-125"}`}></i>
                        yesterday
                    </button>
                </p>
                <div className="bg-bglighter py-4 px-8 rounded-md w-full mb-4">
                    <p className="text-textdark mb-2">Total hours</p>
                    <p className={`text-${comparePercentage().color} font-medium text-4xl inline`}>
                        {Math.round((compareGraphData.total_minutes / 60) * 10) / 10}
                    </p>
                    <p className={`inline text-${comparePercentage().color} ml-2`}>
                        {comparePercentage().operator}{comparePercentage().percentage}%
                    </p>
                </div>
                <InteractiveTimeGraph
                    height={300}
                    width={450}
                    graphData={compareGraphData}
                />
            </div>
        )
    }
}