export function dateToString(date) {
    let string = date.getFullYear() + '-' + (date.getMonth() + 1) + '-';
    if (date.getDate() < 10)
        string += '0';
    string += date.getDate();
    return string;
}