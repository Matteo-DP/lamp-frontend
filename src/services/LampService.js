import config from "../../config.js";

export async function getGraphData({day, month}) {
    const url = config.api.url + config.api.handle.graphdata + "?" + new URLSearchParams({
        day: day,
        month: month
    });
    const res = await fetch(url, {
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_AUTHENTICATION
        }
    });
    return await res.json();
}

export async function getMonthlyData({month}) {
    const url = config.api.url + config.api.handle.monthlydata + "?" + new URLSearchParams({
        month: month
    });
    const res = await fetch(url, {
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_AUTHENTICATION
        }
    });
    return await res.json();
}

export async function getToggle() {
    const url = config.api.url + config.api.handle.toggle;
    const res = await fetch(url, {
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_AUTHENTICATION
        }
    });
    return await res.json();
}

export async function getStateData() {
    const url = config.api.url + config.api.handle.state;
    const res = await fetch(url, {
        headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_AUTHENTICATION
        }
    });
    return await res.json();
}