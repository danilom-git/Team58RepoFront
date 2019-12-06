export function dateToString(date) {
    let string = date.getFullYear() + '-';
    if (date.getMonth() + 1< 10)
        string += '0';
    string += (date.getMonth() + 1) + '-';
    if (date.getDate() < 10)
        string += '0';
    string += date.getDate();
    return string;
}

export function sortBy(list, key, order){
    let listSorted = list;
    listSorted.sort(compareBy(key, order));
    return listSorted;
}

function compareBy(key, order){
    let mul;
    if (order === 'asc')
        mul = 1;
    else
        mul = -1;

    return function (a, b) {
        if (a[key] < b[key]) return mul * -1;
        if (a[key] > b[key]) return mul * 1;
        return 0;
    };
}