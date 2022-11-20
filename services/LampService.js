import config from "../config.json";
import devData from "../../api/data.json";

export async function getData() {
    try {
        const res = await fetch(config.api.url + config.api.handle.data)
        return res.json();
    } catch(err) {
        console.log("API Request failed: " + err)
        return devData;
    }
}

export async function getDevData() {
    return devData;
}

export async function getToggle() {
    try {
        const res = await fetch(config.api.url + config.api.handle.toggle);
        return res.json();
    } catch(err) {
        console.log("API Request failed: " + err)
    }
}

export async function getPlt() {
    return;
}

export async function getDevPlt() {
    return {
        "src": "plt.png",
        "day": 14,
        "month": 11
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

export async function getDevState() {
    return { "state": true, "timestamp": new Date().timestamp };
}