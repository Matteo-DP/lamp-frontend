import config from "../../config.json";

export async function getGraphData({day, month}) {
    const url = config.api.url + config.api.handle.graphdata + "?" + new URLSearchParams({
        day: day,
        month: month
    });
    const res = await fetch(url);
    return await res.json();
}

export async function getMonthlyData({month}) {
    const url = config.api.url + config.api.handle.monthlydata + "?" + new URLSearchParams({
        month: month
    });
    const res = await fetch(url);
    return await res.json();
}