import currency from "currency.js";
import lodash from "lodash";
import moment from "moment";

const sortByMonth = (list) => {
    return lodash.sortBy(list, item => {
        const months = {
            "January": 1,
            "February": 2,
            "October": 10,
            "November": 11 
        };

        months[Object.keys(item)[0]];
    });
};

const groupListByDay = ({ data }) => {
    const groupedByMonth = lodash.groupBy(data, item => moment(item.date).format("MMMM"));
        
    const result = lodash.map(Object.entries(groupedByMonth), monthTuple => {
        const [ month, listByMonth ] = monthTuple;

        const groupedListByDay = { ...lodash.groupBy(listByMonth, item => moment(item.date).format("DD")) };
        lodash.forEach(
            groupedListByDay, 
            (dayList, day) => {
                groupedListByDay[day] = lodash.reduce(dayList, (previousValue, currentItem) => {
                    return {
                        subTotal: currency(previousValue.subTotal).add(currentItem.amount).value, 
                        total: currency(previousValue.total).add(currentItem.total).value, 
                        totalVAT: currency(previousValue.totalVAT).add(currentItem.totalVAT).value
                    };
                }, 
            { subTotal: 0, total: 0, totalVAT: 0 })
        });
        
        return { [month]: groupedListByDay };
    });
    
    return sortByMonth(result);
};

const getSerieData = (categories, list) => {
    const data = [];

    categories.forEach(key => {
        console.log("value", parseInt(key), Object.keys(list))
        const stringifiedKey = `${ key < 10 ? 0 : ""}${key}`
        if(Object.keys(list).includes(stringifiedKey)) {
            data.push(list[stringifiedKey]?.total);
        } else {
            data.push(0);
        }
    });

    return data;
};

const getChartOptionsGroupedByDay = ({ data }) => {
    const groups = groupListByDay({ data });

    const xaxis = {
        categories: [ ...new Set(groups.map(group => {
            return Object.keys(Object.values(group)[0])
        }))].flatMap(item => item).map(item => parseInt(item)).sort()
    };

    return {
        series: groups.map(group => {
            const [ name, list ] = Object.entries(group)[0];
            console.log(list)
            return {
                data: getSerieData(xaxis.categories, list),
                name
            }
        }),
        xaxis
    };
};

export {
    getChartOptionsGroupedByDay,
    groupListByDay 
}