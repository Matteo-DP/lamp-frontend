import config from "../config.json";
import devData from "../../api/data.json";

export async function getData() {
    try {
        const res = await fetch(config.api.url + config.api.handle.data);
        return res.json();
    } catch(err) {
        console.log("API Request failed: " + err);
    }
}

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