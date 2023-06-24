export const toDateFormat = __d__ =>{
    const date = new Date(__d__);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${month} ${year}`;
}