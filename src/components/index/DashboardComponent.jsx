import React, {useState, useEffect} from "react";
import InteractiveTimeGraph from "../graph/InteractiveTimeGraph";
import InteractiveMonthlyGraph from "../graph/InteractiveMonthlyGraph";
import { getGraphData, getMonthlyData, getStateData, getToggle } from "../../services/LampService";
import Script from "next/script";
import Header from "../global/Header";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrivateRoute from "../global/PrivateRoute"

export default function Index() {

    const [stateData, setStateData] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    const [toggleButtonHovering, setToggleButtonHovering] = useState(false);
    const [compareButtonHovering, setCompareButtonHovering] = useState(false);
    const [monthlyButtonHovering, setMonthlyButtonHovering] = useState(false);

    const [graphData, setGraphData] = useState(undefined);
    const [compareGraphData, setCompareGraphData] = useState(undefined);
    const [periodGraphData, setPeriodGraphData] = useState(undefined);

    const [graphLoading, setGraphLoading] = useState(true);
    const [compareGraphLoading, setCompareGraphLoading] = useState(true);
    const [periodGraphLoading, setPeriodGraphLoading] = useState(true);

    const [graphRefreshKey, setGraphRefreshKey] = useState(0);
    const [compareGraphRefreshKey, setCompareGraphRefreshKey] = useState(0);
    const [periodGraphRefreshKey, setPeriodGraphRefreshKey] = useState(0);

    const [graphTime, setGraphTime] = useState({
        day: (new Date()).getDate(),
        month: (new Date()).getMonth() + 1 // getMonth is 0 index based
    });

    const [compareGraphDate, setCompareGraphDate] = useState(new Date(Date.now() - 86400000)); // Default to yesterday
    const [periodGraphDate, setPeriodGraphDate] = useState(new Date()); // Default to this month

    // Fetch graph data
    useEffect(() => {
        setGraphLoading(true);
        getGraphData({
            day: graphTime.day,
            month: graphTime.month
        })
            .then(res => setGraphData(res))
            .finally(() => setGraphLoading(false))
    }, [graphRefreshKey]);

    // Fetch compare graph data
    useEffect(() => {
        setCompareGraphLoading(true);
        getGraphData({
            day: compareGraphDate.getDate(),
            month: compareGraphDate.getMonth() + 1 // getMonth is 0 index based
        })
            .then(res => setCompareGraphData(res))
            .finally(() => setCompareGraphLoading(false))
    }, [compareGraphRefreshKey]);

    // Fetch monthly graph data
    useEffect(() => {
        setPeriodGraphLoading(true);
        getMonthlyData({
            month: periodGraphDate.getMonth() + 1 // getMonth is 0 index based
        })
            .then(res => setPeriodGraphData(res))
            .finally(() => setPeriodGraphLoading(false))
    }, [periodGraphRefreshKey]);

    useEffect(() => {
        setStateLoading(true);
        getStateData()
            .then(res => setStateData(res))
            .finally(() => setStateLoading(false))
    }, []);

    const toggleLights = async () => {
        setStateLoading(true);
        const res = await getToggle();
        setStateData(res);
        setStateLoading(false);
    }

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
    }

    // TODO: Loading animations
    if(!graphLoading && !compareGraphLoading && !periodGraphLoading) {

    return(
        <>
            <Script src="https://kit.fontawesome.com/2ad3ea3c29.js" crossorigin="anonymous" />

            <Header />

            {/* Initialise color classes so tailwindcss generates them */}
            <div className="absolute hidden text-accentgreen"></div>
            <div className="absolute hidden text-accentred"></div>

            <main className="bg-bgdark pb-32 pt-8">
                <div className="mx-auto w-max">
                    <h1 className="text-textlight text-4xl mb-8">
                        Dashboard
                    </h1>

                    <div className="flex flex-row justify-items-stretch gap-4 mb-4">
                        <div className="flex flex-col gap-4 w-full">
                            <button className="h-full"
                                onMouseOver={() => setToggleButtonHovering(true)}
                                onMouseOut={() => setToggleButtonHovering(false)}
                                onClick={() => toggleLights()}
                            >
                                <div className="bg-bglight p-8 rounded-md w-full h-full flex items-center justify-center border-2 border-accentpurpledark">
                                    <p className={`text-3xl font-medium ease-in duration-75 ${toggleButtonHovering ? "text-accentpurplelight" : "text-textlight"} `}>
                                        {stateLoading ? 
                                            <div>Loading...</div>
                                        :
                                            stateData.state ? "ON" : "OFF"
                                        }
                                    </p>
                                </div>
                            </button>
                            <div className="bg-bglight p-8 rounded-md w-full">
                                <p className="text-textdark mb-2">Total usage time</p>
                                <p className="text-textlight font-medium text-4xl inline">
                                    {Math.round((graphData.total_minutes / 60) * 10) / 10}
                                </p>
                                <p className="inline text-accentpurple ml-2">hours</p>
                            </div>
                            <div className="bg-bglight p-8 rounded-md w-full">
                                <p className="text-textdark mb-2">Last toggle</p>
                                    {stateLoading ?
                                        <div className="text-textlight font-medium text-3xl">Loading...</div>
                                    :
                                        <>
                                            <p className="text-textlight font-medium text-3xl inline mr-4">
                                                {new Date(stateData.log.timestamp * 1000).toLocaleTimeString()}
                                            </p>
                                            <p className="inline text-accentpurple">
                                                {new Date(stateData.log.timestamp * 1000).toLocaleDateString()}
                                            </p>
                                        </>
                                    }
                            </div>
                        </div>
                        <div className="bg-bglight pt-8 pb-2 px-10 w-max rounded-md">
                            <InteractiveTimeGraph
                                height={400}
                                width={600}
                                graphData={graphData}
                            />
                        </div>
                    </div>

                    <h1 className="text-textlight text-4xl mb-8 mt-8">
                        Statistics
                    </h1>
                    
                    <div className="flex flex-row gap-4">
                        <div className="bg-bglight p-4 h-max mb-4 rounded-md w-max">
                            <p className="text-textdark text-md mb-4"
                                onMouseOver={() => setCompareButtonHovering(true)}
                                onMouseOut={() => setCompareButtonHovering(false)}
                            >
                                Compare to
                                <button className="ml-2 inline border px-2 py-1 border-[#8884d8] rounded-lg">
                                    <i class={`fa-solid text-accentpurple fa-chevron-down mr-2 ease-in duration-75 ${compareButtonHovering && "scale-125"}`}></i>
                                    <div className="inline-block">
                                        <Datepicker selected={compareGraphDate} 
                                            onChange={(date) => {
                                                setCompareGraphDate(date)
                                                setCompareGraphRefreshKey(compareGraphRefreshKey + 1)
                                            }}
                                        />
                                    </div>
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
                        <div className="bg-bglight p-4 rounded-md h-max">
                            <p className="text-textdark text-md mb-4"
                                onMouseOver={() => setMonthlyButtonHovering(true)}
                                onMouseLeave={() => setMonthlyButtonHovering(false)}
                            >
                                Compare to time period
                                <button className="ml-2 inline border px-2 py-1 border-accentpurple rounded-lg">
                                    <i class={`fa-solid text-accentpurple fa-chevron-down mr-1 ease-in duration-75 ${monthlyButtonHovering && "scale-125"}`}></i>
                                    <div className="inline-block">
                                        <Datepicker selected={periodGraphDate} 
                                            onChange={(date) => {
                                                setPeriodGraphDate(date)
                                                setPeriodGraphRefreshKey(periodGraphRefreshKey + 1)
                                            }}
                                            dateFormat="MM"
                                            showMonthYearPicker
                                        />
                                    </div>
                                </button>
                            </p>
                            <div className="flex flex-row justify-items-stretch gap-4">
                                <div className="bg-bglighter py-4 px-8 rounded-md mb-4 w-full">
                                    <p className="text-textdark mb-2">Average usage time</p>
                                    <p className="inline text-textlight text-4xl font-medium">
                                        {Math.round(periodGraphData.average_hours * 10) / 10}
                                    </p>
                                    <p className="inline ml-2 text-accentpurple">hours per day</p>
                                </div>
                                <div className="bg-bglighter py-4 px-8 rounded-md mb-4 w-full">
                                    <p className="text-textdark mb-2">Total usage time</p>
                                    <p className="inline text-textlight text-4xl font-medium">
                                        {Math.round(periodGraphData.total_hours * 10) / 10}
                                    </p>
                                    <p className="inline ml-2 text-accentpurple">hours</p>
                                </div>
                            </div>
                            <InteractiveMonthlyGraph
                                graphData={periodGraphData}
                                height={300}
                                width={550}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </>
        )
    }
}