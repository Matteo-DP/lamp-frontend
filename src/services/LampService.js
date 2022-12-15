import config from "../../config.json";

export async function getToggle() {
    try {
        const res = await fetch(config.api.url + config.api.handle.toggle);
        return res.json();
    } catch(err) {
        console.log("API Request failed: " + err);
    }
}

export async function getPlt({day, month}) {
    try {
        // Day and month graph generation
        const res = await fetch(config.api.url + config.api.handle.plt + "?" + new URLSearchParams({
            day: day,
            month: month
        }));
        return res.json();
    } catch(err) {
        console.log("API Request failed " + err);
    }
}

export async function getState() {
    try {
        const res = await fetch(config.api.url + config.api.handle.state);
        return res.json();
    } catch(err) {
        console.log("API Request failed: " + err)
    }
}

export async function getGraphData({day, month}) {
    const url = config.api.url + config.api.handle.graphdata + "?" + new URLSearchParams({
        day: day,
        month: month
    });
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}