import React, { useState, useEffect } from 'react'; 
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ProductCountData } from '../../productTypes/productType'; // Adjusted import path
import { ProductCountByBrand } from '../../requestResponsehandler/analytics';
import Skeleton from 'react-loading-skeleton';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductCount: React.FC = () => {
  
  const [chartData, setChartData] = useState<any | null>(null); 
  const { data, isLoading, isError } = useQuery<ProductCountData[]>('ProductCount', ProductCountByBrand); 

  useEffect(() => {
    if (data) {
      // Group models by brand
      const brands = data?.map(item => item.brand);
      const allModels = [...new Set(data?.flatMap(item => item.models?.map(model => model.model)))];

      const datasets = brands?.map(brandItem => {
        return {
          label: brandItem,
          data: allModels?.map(model => {
            const brandData = data?.find(item => item.brand === brandItem);
            const modelData = brandData?.models?.find(m => m.model === model);
            return modelData ? modelData.stock : 0;
          }),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1,
        };
      });

      setChartData({
        labels: allModels, // The x-axis will be all unique models across brands
        datasets: datasets, // Each dataset is for a brand and contains stock for each model
      });
    }
  }, [data]);

  if (isLoading) return <div><Skeleton count={10} /></div>;
  if (isError) return <div>Error loading data...</div>;

  return (
    <div className='shadow-boxShadow shadow-card  w-full h-[400px]' >
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Stock by Brand and Model' },
            },
            scales: {
              x: {
                stacked: true, // Stack the bars along the x-axis
              },
              y: {
                stacked: true, // Stack the bars along the y-axis (stock count)
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ProductCount;
