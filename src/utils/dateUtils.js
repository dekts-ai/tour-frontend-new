
import moment from 'moment';
import 'moment-timezone';

export const getMomentDate = (date = null) => {
    return date ? moment(date) : moment();
}

export const getMomentTimezone = (
    date = null,
    timezone = "America/Phoenix",
    preserveTimeInNewTimezone = false
) => {
    return date
        ? moment(date).tz(timezone, preserveTimeInNewTimezone)
        : moment().tz(timezone, preserveTimeInNewTimezone);
};

export const formatMomentDate = (
    date = null,
    format = "YYYY-MM-DD"
) => {
    return date
        ? moment(date).format(format)
        : moment().format(format);
};
