
import moment from 'moment';
import 'moment-timezone';

// export const getMomentDate = (date = null) => {
//     return date ? moment(date) : moment();
// }

export const getMomentTimezone = (
    timezone = "America/Phoenix",
    date = null
) => {
    return date
        ? moment(date).tz(timezone)
        : moment.tz(timezone);
};

// export const formatMomentDate = (
//     date = null,
//     format = "YYYY-MM-DD"
// ) => {
//     return date
//         ? moment(date).format(format)
//         : moment().format(format);
// };
