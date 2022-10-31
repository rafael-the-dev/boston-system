import Chart from "react-apexcharts";

const LineChartContainer = ({ data }) => {

    const options = {
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: Object.keys(data)
        }
    };

    const series = [
        {
            data: Object.values(data).map(item => item.total)
        }
    ]

    return (
        <Chart
            height="100%"
            options={options}
            series={series}
            width="100%"
        />
    );
};

export default LineChartContainer;