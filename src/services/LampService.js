import config from "../../config.json";

export async function getGraphData({day, month}) {
    const url = config.api.url + config.api.handle.graphdata + "?" + new URLSearchParams({
        day: day,
        month: month
    });
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}