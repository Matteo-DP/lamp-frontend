import React, {useState, useEffect} from "react";
import InteractiveTimeGraph from "../src/components/InteractiveTimeGraph";
import { getGraphData } from "../src/services/LampService";
import Script from "next/script";
import Header from "../src/components/Header";

export default function Index3() {

    const [graphData, setGraphData] = useState(undefined)
    const [compareGraphData, setCompareGraphData] = useState(undefined)

    const [graphLoading, setGraphLoading] = useState(true)
    const [graphRefreshKey, setGraphRefreshKey] = useState(0)
    const [compareGraphLoading, setCompareGraphLoading] = useState(true)
    const [compareGraphRefreshKey, setCompareGraphRefreshKey] = useState(0)

    const [graphTime, setGraphTime] = useState({
        day: (new Date()).getDate(),
        month: (new Date()).getMonth() + 1 // getMonth is 0 index based
    })
    const [compareGraphTime, setCompareGraphTime] = useState({
        day: (new Date()).getDate() - 1, // Default to yesterday
        month: (new Date()).getMonth() + 1 // getMonth is 0 index based
    })

    useEffect(() => {
        setGraphLoading(true);
        getGraphData({
            day: graphTime.day,
            month: graphTime.month
        })
            .then(res => setGraphData(res))
            .finally(() => setGraphLoading(false))
    }, [graphRefreshKey])

    useEffect(() => {
        setCompareGraphLoading(true);
        getGraphData({
            day: compareGraphTime.day,
            month: compareGraphTime.month
        })
            .then(res => setCompareGraphData(res))
            .finally(() => setCompareGraphLoading(false))
    }, [compareGraphRefreshKey])

    const comparePercentage = () => {
        const delta = compareGraphData.total_minutes - graphData.total_minutes
        const percentage = delta < 0 ?
            (graphData.total_minutes - compareGraphData.total_minutes) / graphData.total_minutes * 100
            :
            (graphData.total_minutes - compareGraphData.total_minutes) / compareGraphData.total_minutes * 100

        return {
            color: delta < 0 ? "green-400" : "accentred",
            delta: delta,
            percentage: Math.abs(Math.round(percentage)),
            operator: delta < 0 ? "-" : "+"
        }
    }

    if(!graphLoading && !compareGraphLoading) {

    return(
        <>
        <Script src="https://kit.fontawesome.com/2ad3ea3c29.js" crossorigin="anonymous" />

        <Header></Header>

        <main className="bg-bgdark min-h-screen">
            <div className="mx-auto w-max min-h-screen">

            <h1 className="text-textlight text-4xl mb-8">
                    Dashboard
                </h1>

                <div  className="flex flex-row flex-wrap gap-4">
                    <div>
                        <div className="flex flex-row justify-items-stretch gap-4 mb-4">
                            <div className="bg-bglight p-8 rounded-md w-full">
                                <p className="text-textdark mb-2">Total hours</p>
                                <p className="text-textlight font-medium text-4xl">
                                    {Math.round((graphData.total_minutes / 60) * 10) / 10}
                                </p>
                            </div>
                            <div className="bg-bglight p-8 rounded-md w-full">
                                <p className="text-textdark mb-2">Last toggle</p>
                                <p className="text-textlight font-medium text-4xl">Undefined</p>
                            </div>
                        </div>

                        <div className="bg-bglight pt-8 pb-2 px-10 w-max rounded-md">
                            <InteractiveTimeGraph
                                graphTime={graphTime}
                                height={400}
                                width={700}
                                graphData={graphData}
                                loading={graphLoading}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-bglight p-4 h-max mb-4 rounded-md">
                            <p className="text-textdark text-md mb-4">
                                Compare to
                                <p className="text-accentpurple ml-2 inline border px-2 py-1 border-[#8884d8] rounded-lg">
                                    <i class="fa-solid fa-chevron-down mr-1"></i>
                                    yesterday
                                </p>
                            </p>
                            <div className="bg-bglighter py-4 px-8 rounded-md w-full mb-4">
                                <p className="text-textdark mb-2">Total hours</p>
                                <p className="text-textlight font-medium text-4xl inline">
                                    {Math.round((compareGraphData.total_minutes / 60) * 10) / 10}
                                </p>
                                <p className={`inline text-${comparePercentage().color} ml-2`}>
                                    {comparePercentage().operator}{comparePercentage().percentage}%
                                </p>
                            </div>
                            <InteractiveTimeGraph
                                    graphTime={compareGraphTime}
                                    height={300}
                                    width={400}
                                    graphData={compareGraphData}
                                    loading={compareGraphLoading}
                            />
                        </div>
                        <div className="bg-bglight px-8 py-4 justify-self-stretch h-full rounded-md flex items-end">
                            <div>
                                <p className="inline mr-4 text-textdark">CPU temp</p>
                                <p className="inline text-textlight font-medium text-4xl">Undefined</p>
                                <p className="inline text-textdark ml-1 align-top">°C</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
        </>
    )

    }
}