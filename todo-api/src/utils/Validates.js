const moment = require("moment");

const validateDateStartEnd = (start, end) => {
    console.log(moment(start) < moment(end))
    return moment(start) < moment(end);
}

module.export = {
    validateDateStartEnd
}