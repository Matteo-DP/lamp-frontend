import moment from 'moment/moment';

export const parseTime = (date) => {
    const dateFormat =  moment(new Date(date * 1000));
    var parsedDate = {
        "date": "",
        "time": ""
    }
    parsedDate.date = dateFormat.format("dddd, MMMM Do YYYY");
    parsedDate.time = dateFormat.format("h:mm");
    return parsedDate;
}

export const deltaTime = (timestamp) => {
    const date1 = moment(new Date(timestamp * 1000));
    const date2 = moment(new Date());

    var time = {
        "delta": 0,
        "str": ""
    }

    var diff = date2.diff(date1, "seconds");
    var str = "seconds";
    if(diff > 60) {
        var diff = date2.diff(date1, "minutes");
        var str = "minutes";
    }
    if(diff > 60) {
        var diff = date2.diff(date1, "hours");
        var str = "hours";
    }
    if(diff > 24) {
        var diff = date2.diff(date1, "days");
        var str = "days";
    }

    time.delta = diff;
    time.str = str;

    return time;
}