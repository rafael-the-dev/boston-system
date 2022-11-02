import Chart from "react-apexcharts";

const LineChartContainer = ({ data, series, xAxis }) => {
    
    const options = {
        stroke: {
            curve: 'smooth',
        },
        xaxis: xAxis
    };

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