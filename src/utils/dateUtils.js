
import moment from 'moment';

export const getUTCDateFromTimeZone = (tz='US/Arizona') => {
    //https://github.com/charliekassel/vuejs-datepicker/issues/118
    const origin_date = moment(new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' }))).format("YYYY-MM-DD");
    const current_date = new Date(new Date().toLocaleString('en-US', { timeZone: 'US/Arizona' })); // the time on the browser
    const utc_date = Date.UTC((origin_date).substring(0, 4), (origin_date).substring(5, 7) - 1, (origin_date).substring(8, 10), current_date.getTimezoneOffset() / 60, 0, 0, 0);
    return new Date(utc_date);
}

export const defaultDateFormat = (date) => {
    const dateObj = (date instanceof Date) ? date : new Date(date);
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString("en-US", options);
}
