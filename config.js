const config = {
    "api": {
        "url": process.env.API_URL || "http://192.168.0.205:5000/",
        "handle": {
            "data": "api/data",
            "toggle": "api/toggle",
            "state": "api/state",
            "plt": "api/plt",
            "img": "api/plt/img",
            "graphdata": "api/graphdata",
            "monthlydata": "api/monthly"
        }
    }
}

export default config;