import moment from "moment";

export const formatDates = (list) => {

    const formatDate = dateParam => moment(dateParam).format("DD/MM/YYYY");

    if(list.length === 0) return formatDate(Date.now());

    if(list.length > 1) {
        const firstDate = formatDate(list[0].date);
        const lastDate = formatDate(list[list.length - 1].date);

        if(firstDate === lastDate) {
            if(firstDate === formatDate(Date.now())) return `Today  -  ${firstDate}`;

            return firstDate;
        }

        return `${firstDate} - ${lastDate}`;
    } else {
        const date = formatDate(new Date(list[0]?.date));

        if(date === formatDate(Date.now())) return `Today  -  ${date}`;

        return date;
    }
};