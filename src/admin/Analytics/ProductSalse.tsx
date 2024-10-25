import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { productSalse } from '../../requestResponsehandler/analytics'; // Adjust path
import { SalesData } from '../../productTypes/productType';
import Skeleton from 'react-loading-skeleton';
// Register Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ProductSalesPieChart: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const { data, isLoading, isError } = useQuery<SalesData>('ProductSales', productSalse);

  useEffect(() => {
    if (data) {
      const labels = data?.map(item => `${item._id.brand} ${item._id.model}`);
      const dataValues = data?.map(item => item.totalBookings);

      const colors = [
        'rgba(255, 99, 132, 0.5)', // Red
        'rgba(54, 162, 235, 0.5)', // Blue
        'rgba(255, 206, 86, 0.5)', // Yellow
        'rgba(75, 192, 192, 0.5)', // Green
        'rgba(153, 102, 255, 0.5)', // Purple
        'rgba(255, 159, 64, 0.5)', // Orange
      ];

      const backgroundColors = colors.slice(0, data.length);
      const borderColors = colors.slice(0, data.length)?.map(color => color.replace('0.5', '1'));

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Bookings',
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  if (isLoading) return <div><Skeleton count={10} /></div>;
  if (isError) return <div>Error loading data...</div>;

  return (
    <div className='flex border rounded-md justify-center items-center shadow-boxShadow shadow-card w-[400px] h-[250px] mb-2 p-4'>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                },
              },
              title: {
                display: true,
                text: 'Product Sales Distribution by Brand and Model',
                padding: {
                  top: 10,
                  bottom: 10 // Adjust this value for more or less space
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value} bookings`; // Custom tooltip label
                  },
                },
              },
              // Removed datalabels plugin to avoid showing percentages
            },
          }}
          width={undefined}
          height={undefined}
        />
      )}
    </div>
  );
};

export default ProductSalesPieChart;